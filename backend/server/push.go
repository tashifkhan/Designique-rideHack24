package server

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	webpush "github.com/SherClockHolmes/webpush-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/tashifkhan/Designique-rideHack24/backend/db"
	"github.com/tashifkhan/Designique-rideHack24/backend/models"
)

var (
	vapidPub  = os.Getenv("VAPID_PUBLIC_KEY")
	vapidPriv = os.Getenv("VAPID_PRIVATE_KEY")
)

type subscribeReq struct {
	UserID       string                 `json:"userId"`
	Subscription map[string]interface{} `json:"subscription"`
}

// PushSubscribeHandler handles Web Push subscription requests
func PushSubscribeHandler(w http.ResponseWriter, r *http.Request) {
	var req subscribeReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	uid, err := primitive.ObjectIDFromHex(req.UserID)
	if err != nil {
		http.Error(w, "invalid user", http.StatusBadRequest)
		return
	}

	// Convert subscription to our model
	subBytes, _ := json.Marshal(req.Subscription)
	var sub models.PushSubscription
	if err := json.Unmarshal(subBytes, &sub); err != nil {
		http.Error(w, "invalid subscription", http.StatusBadRequest)
		return
	}

	sub.UserID = uid
	sub.CreatedAt = time.Now().UTC()

	// Upsert subscription
	filter := bson.M{"user_id": uid, "endpoint": sub.Endpoint}
	update := bson.M{"$set": sub}
	opts := options.Update().SetUpsert(true)

	if _, err := db.PushSubsC.UpdateOne(context.Background(), filter, update, opts); err != nil {
		log.Println("push subscribe error:", err)
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// SendPush sends a push notification to a specific user
func SendPush(userID primitive.ObjectID, title, body string, data map[string]string) {
	if vapidPub == "" || vapidPriv == "" {
		log.Println("VAPID keys not configured, skipping push notification")
		return
	}

	ctx := context.Background()
	cursor, err := db.PushSubsC.Find(ctx, bson.M{"user_id": userID})
	if err != nil {
		log.Println("find subscriptions error:", err)
		return
	}
	defer cursor.Close(ctx)

	payload, _ := json.Marshal(map[string]interface{}{
		"title": title,
		"body":  body,
		"data":  data,
	})

	for cursor.Next(ctx) {
		var ps models.PushSubscription
		if err := cursor.Decode(&ps); err != nil {
			log.Println("decode subscription error:", err)
			continue
		}

		sub := &webpush.Subscription{
			Endpoint: ps.Endpoint,
			Keys: webpush.Keys{
				P256dh: ps.Keys.P256dh,
				Auth:   ps.Keys.Auth,
			},
		}

		resp, err := webpush.SendNotification(payload, sub, &webpush.Options{
			TTL:             30,
			VAPIDPublicKey:  vapidPub,
			VAPIDPrivateKey: vapidPriv,
		})

		if err != nil {
			log.Println("push send error:", err)
			continue
		}

		if resp != nil && resp.Body != nil {
			resp.Body.Close()
		}
	}
}
