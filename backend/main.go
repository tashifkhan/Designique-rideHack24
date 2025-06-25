package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// upgrader upgrades an HTTP connection to a WebSocket,
// here we allow all origins for simplicity (adjust in prod).
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// wsHandler handles WebSocket requests on /ws.
func wsHandler(w http.ResponseWriter, r *http.Request) {
	// 1) Upgrade HTTP → WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	defer conn.Close()

	// 2) Read messages in a loop and echo them back
	for {
		msgType, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}
		log.Printf("Received: %s\n", msg)

		response := fmt.Sprintf("You said: %s", msg)
		if err := conn.WriteMessage(msgType, []byte(response)); err != nil {
			log.Println("Write error:", err)
			break
		}
	}
}

func main() {
	http.HandleFunc("/ws", wsHandler)

	port := "8080"
	log.Printf("WebSocket server listening on :%s/ws\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
