package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Conversation represents a 1–1 chat.
type Conversation struct {
	ID            primitive.ObjectID    `bson:"_id,omitempty"`
	Participants  [2]primitive.ObjectID `bson:"participants"` // sorted
	CreatedAt     time.Time             `bson:"created_at"`
	UpdatedAt     time.Time             `bson:"updated_at"`
	LastMessage   string                `bson:"last_message,omitempty"`
	LastMessageAt time.Time             `bson:"last_message_at,omitempty"`
}
