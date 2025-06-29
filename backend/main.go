package main

import (
	"log"
	"net/http"
	"os"

	"github.com/tashifkhan/Designique-rideHack24/backend/db"
	"github.com/tashifkhan/Designique-rideHack24/backend/server"
)

func main() {
	// Initialize MongoDB connection
	db.InitMongo()

	// Create WebSocket hub
	hub := server.NewHub()
	go hub.Run()

	// Set up HTTP routes
	http.HandleFunc("/ws", server.WSHandler(hub))
	http.HandleFunc("/upload", server.UploadHandler)
	http.HandleFunc("/push/subscribe", server.PushSubscribeHandler)

	// Serve uploaded files
	uploadDir := os.Getenv("UPLOAD_DIR")
	if uploadDir == "" {
		uploadDir = "./uploads"
	}
	http.Handle("/uploads/",
		http.StripPrefix("/uploads/",
			http.FileServer(http.Dir(uploadDir))),
	)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Chat server starting on port :%s", port)
	log.Printf("WebSocket endpoint: ws://localhost:%s/ws", port)
	log.Printf("File upload endpoint: http://localhost:%s/upload", port)
	log.Printf("Push subscription endpoint: http://localhost:%s/push/subscribe", port)
	log.Printf("File serving: http://localhost:%s/uploads/", port)

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
