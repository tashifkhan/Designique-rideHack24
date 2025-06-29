package server

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

// UploadResponse is returned after a successful upload.
type UploadResponse struct {
	URL      string `json:"url"`
	FileName string `json:"filename"`
	MimeType string `json:"mimeType"`
}

// UploadHandler handles file uploads for images and documents
func UploadHandler(w http.ResponseWriter, r *http.Request) {
	// Limit to 20 MB per file
	r.Body = http.MaxBytesReader(w, r.Body, 20<<20)
	if err := r.ParseMultipartForm(20 << 20); err != nil {
		http.Error(w, "file too big", http.StatusRequestEntityTooLarge)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "missing file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Create uploads directory if missing
	uploadDir := os.Getenv("UPLOAD_DIR")
	if uploadDir == "" {
		uploadDir = "./uploads"
	}
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		log.Println("upload create dir:", err)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	// Generate unique filename
	timestamp := time.Now().UnixNano()
	ext := filepath.Ext(header.Filename)
	filename := fmt.Sprintf("%d%s", timestamp, ext)
	dstPath := filepath.Join(uploadDir, filename)

	// Create destination file
	dst, err := os.Create(dstPath)
	if err != nil {
		log.Println("upload create file:", err)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	// Copy file content
	if _, err := io.Copy(dst, file); err != nil {
		log.Println("upload copy:", err)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	// Determine MIME type
	mimeType := header.Header.Get("Content-Type")
	if mimeType == "" {
		mimeType = mime.TypeByExtension(ext)
	}

	// Build response
	host := r.Host
	if host == "" {
		host = "localhost:8080"
	}

	response := UploadResponse{
		URL:      fmt.Sprintf("http://%s/uploads/%s", host, filename),
		FileName: header.Filename,
		MimeType: mimeType,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
