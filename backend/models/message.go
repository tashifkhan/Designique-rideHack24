package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// MessageContent supports text, images, documents, etc.
type MessageContent struct {
	Type     string `bson:"type"`               // "text"|"image"|"file"
	Text     string `bson:"text,omitempty"`     // for Type=="text"
	URL      string `bson:"url,omitempty"`      // public URL to fetch
	FileName string `bson:"filename,omitempty"` // original filename
	MimeType string `bson:"mime_type,omitempty"`
}

// EditRecord is one prior version of a message.
type EditRecord struct {
	Content  MessageContent `bson:"content"`
	EditedAt time.Time      `bson:"edited_at"`
}

// Message is one chat message, possibly edited.
type Message struct {
	ID             primitive.ObjectID `bson:"_id,omitempty"`
	ConversationID primitive.ObjectID `bson:"conversation_id"`
	SenderID       primitive.ObjectID `bson:"sender_id"`
	Content        MessageContent     `bson:"content"`
	CreatedAt      time.Time          `bson:"created_at"`
	DeliveredAt    *time.Time         `bson:"delivered_at,omitempty"`
	ReadAt         *time.Time         `bson:"read_at,omitempty"`
	EditedAt       *time.Time         `bson:"edited_at,omitempty"`
	EditHistory    []EditRecord       `bson:"edit_history,omitempty"`
}
