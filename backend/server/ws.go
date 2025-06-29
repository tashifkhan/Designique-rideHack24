package server

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/tashifkhan/Designique-rideHack24/backend/db"
	"github.com/tashifkhan/Designique-rideHack24/backend/models"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Client represents a connected WebSocket client
type Client struct {
	ID   primitive.ObjectID
	Conn *websocket.Conn
	Send chan []byte
	Hub  *Hub
	mu   sync.Mutex
}

// Hub manages all connected clients
type Hub struct {
	clients    map[primitive.ObjectID]*Client
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	mu         sync.RWMutex
}

// NewHub creates a new hub instance
func NewHub() *Hub {
	return &Hub{
		clients:    make(map[primitive.ObjectID]*Client),
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

// Run starts the hub's main loop
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client.ID] = client
			h.mu.Unlock()

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client.ID]; ok {
				delete(h.clients, client.ID)
				close(client.Send)
			}
			h.mu.Unlock()

		case message := <-h.broadcast:
			h.mu.RLock()
			for _, client := range h.clients {
				select {
				case client.Send <- message:
				default:
					close(client.Send)
					delete(h.clients, client.ID)
				}
			}
			h.mu.RUnlock()
		}
	}
}

// Message types for WebSocket communication
type WSMessage struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

type NewMessagePayload struct {
	ConversationID string                `json:"conversationId"`
	SenderID       string                `json:"senderId"`
	Content        models.MessageContent `json:"content"`
}

type EditMessagePayload struct {
	MessageID string                `json:"messageId"`
	SenderID  string                `json:"senderId"`
	Content   models.MessageContent `json:"content"`
}

// WSHandler handles WebSocket connections
func WSHandler(hub *Hub) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println("ws upgrade:", err)
			return
		}

		// Extract user ID from query params or headers
		userIDStr := r.URL.Query().Get("userId")
		if userIDStr == "" {
			conn.Close()
			return
		}

		userID, err := primitive.ObjectIDFromHex(userIDStr)
		if err != nil {
			conn.Close()
			return
		}

		client := &Client{
			ID:   userID,
			Conn: conn,
			Send: make(chan []byte, 256),
			Hub:  hub,
		}

		client.Hub.register <- client

		// Start goroutines for reading and writing
		go client.writePump()
		go client.readPump()
	}
}

func (c *Client) readPump() {
	defer func() {
		c.Hub.unregister <- c
		c.Conn.Close()
	}()

	c.Conn.SetReadLimit(512)
	c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	c.Conn.SetPongHandler(func(string) error {
		c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		var wsMsg WSMessage
		if err := json.Unmarshal(message, &wsMsg); err != nil {
			log.Printf("error unmarshaling message: %v", err)
			continue
		}

		c.handleMessage(wsMsg)
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(54 * time.Second)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.Send:
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func (c *Client) handleMessage(wsMsg WSMessage) {
	switch wsMsg.Type {
	case "new_message":
		c.handleNewMessage(wsMsg.Payload)
	case "edit_message":
		c.handleEditMessage(wsMsg.Payload)
	default:
		log.Printf("unknown message type: %s", wsMsg.Type)
	}
}

func (c *Client) handleNewMessage(payload interface{}) {
	payloadBytes, _ := json.Marshal(payload)
	var msgPayload NewMessagePayload
	if err := json.Unmarshal(payloadBytes, &msgPayload); err != nil {
		log.Printf("error unmarshaling new message payload: %v", err)
		return
	}

	// Validate sender
	senderID, err := primitive.ObjectIDFromHex(msgPayload.SenderID)
	if err != nil || senderID != c.ID {
		log.Printf("invalid sender ID")
		return
	}

	// Save message to database
	msg := models.Message{
		SenderID:  senderID,
		Content:   msgPayload.Content,
		CreatedAt: time.Now().UTC(),
	}

	// Get or create conversation
	convID, err := primitive.ObjectIDFromHex(msgPayload.ConversationID)
	if err != nil {
		log.Printf("invalid conversation ID")
		return
	}
	msg.ConversationID = convID

	// Save message
	result, err := db.MessagesC.InsertOne(context.Background(), msg)
	if err != nil {
		log.Printf("error saving message: %v", err)
		return
	}

	msg.ID = result.InsertedID.(primitive.ObjectID)

	// Update conversation's last message
	now := time.Now().UTC()
	lastMessageText := msgPayload.Content.Text
	if msgPayload.Content.Type != "text" {
		lastMessageText = "📎 " + msgPayload.Content.Type
	}

	update := bson.M{
		"$set": bson.M{
			"last_message":    lastMessageText,
			"updated_at":      now,
			"last_message_at": now,
		},
	}
	db.ConversationsC.UpdateOne(context.Background(), bson.M{"_id": convID}, update)

	// Broadcast to all participants
	response := WSMessage{
		Type: "new_message",
		Payload: map[string]interface{}{
			"messageId":      msg.ID.Hex(),
			"conversationId": convID.Hex(),
			"senderId":       senderID.Hex(),
			"content":        msgPayload.Content,
			"createdAt":      msg.CreatedAt,
		},
	}

	responseBytes, _ := json.Marshal(response)
	c.Hub.broadcast <- responseBytes

	// Send push notification to other participant
	go sendPushNotification(convID, senderID, lastMessageText)
}

func (c *Client) handleEditMessage(payload interface{}) {
	payloadBytes, _ := json.Marshal(payload)
	var editPayload EditMessagePayload
	if err := json.Unmarshal(payloadBytes, &editPayload); err != nil {
		log.Printf("error unmarshaling edit message payload: %v", err)
		return
	}

	// Validate sender
	senderID, err := primitive.ObjectIDFromHex(editPayload.SenderID)
	if err != nil || senderID != c.ID {
		log.Printf("invalid sender ID for edit")
		return
	}

	// Edit message in database
	if err := editMessage(editPayload.MessageID, senderID, editPayload.Content); err != nil {
		log.Printf("error editing message: %v", err)
		return
	}

	// Broadcast edit to all participants
	response := WSMessage{
		Type: "message_edited",
		Payload: map[string]interface{}{
			"messageId": editPayload.MessageID,
			"senderId":  senderID.Hex(),
			"content":   editPayload.Content,
			"editedAt":  time.Now().UTC(),
		},
	}

	responseBytes, _ := json.Marshal(response)
	c.Hub.broadcast <- responseBytes
}

func editMessage(messageID string, senderID primitive.ObjectID, newContent models.MessageContent) error {
	msgID, err := primitive.ObjectIDFromHex(messageID)
	if err != nil {
		return err
	}

	now := time.Now().UTC()

	// Get existing message
	var oldMsg models.Message
	filter := bson.M{"_id": msgID, "sender_id": senderID}
	if err := db.MessagesC.FindOne(context.Background(), filter).Decode(&oldMsg); err != nil {
		return err
	}

	// Update message with edit history
	update := bson.M{
		"$push": bson.M{
			"edit_history": bson.M{
				"content":   oldMsg.Content,
				"edited_at": now,
			},
		},
		"$set": bson.M{
			"content":   newContent,
			"edited_at": now,
		},
	}

	_, err = db.MessagesC.UpdateOne(context.Background(), filter, update)
	return err
}

func sendPushNotification(convID, senderID primitive.ObjectID, messageText string) {
	// Get conversation to find other participant
	var conv models.Conversation
	if err := db.ConversationsC.FindOne(context.Background(), bson.M{"_id": convID}).Decode(&conv); err != nil {
		return
	}

	// Find the other participant
	var recipientID primitive.ObjectID
	if conv.Participants[0] == senderID {
		recipientID = conv.Participants[1]
	} else {
		recipientID = conv.Participants[0]
	}

	// Send push notification
	SendPush(recipientID, "New message", messageText, map[string]string{
		"conversationId": convID.Hex(),
	})
}
