package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// PushSubscription stores Web Push API subscription details
type PushSubscription struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	UserID   primitive.ObjectID `bson:"user_id"`
	Endpoint string             `bson:"endpoint"`
	Keys     struct {
		P256dh string `bson:"p256dh"`
		Auth   string `bson:"auth"`
	} `bson:"keys"`
	CreatedAt time.Time `bson:"created_at"`
}
