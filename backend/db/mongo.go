package db

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	Client         *mongo.Client
	ConversationsC *mongo.Collection
	MessagesC      *mongo.Collection
	PushSubsC      *mongo.Collection
)

// InitMongo loads .env, connects, and sets indexes.
func InitMongo() {
	_ = godotenv.Load("config.env")
	uri := getEnv("MONGO_URI", "mongodb://localhost:27017")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cli, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("mongo connect:", err)
	}
	Client = cli
	db := cli.Database("Core")

	ConversationsC = db.Collection("Conversations")
	MessagesC = db.Collection("Messages")
	PushSubsC = db.Collection("PushSubscriptions")

	// unique on participants
	_, _ = ConversationsC.Indexes().CreateOne(ctx,
		mongo.IndexModel{
			Keys:    bson.D{{Key: "participants", Value: 1}},
			Options: options.Index().SetUnique(true),
		},
	)

	// fast last-messages
	_, _ = MessagesC.Indexes().CreateOne(ctx,
		mongo.IndexModel{
			Keys: bson.D{
				{Key: "conversation_id", Value: 1},
				{Key: "created_at", Value: -1},
			},
		},
	)

	// unique on user+endpoint
	_, _ = PushSubsC.Indexes().CreateOne(ctx,
		mongo.IndexModel{
			Keys:    bson.D{{Key: "user_id", Value: 1}, {Key: "endpoint", Value: 1}},
			Options: options.Index().SetUnique(true),
		},
	)

	log.Println("MongoDB connected and indexes created")
}

func getEnv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
