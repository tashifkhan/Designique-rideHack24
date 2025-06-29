package main

import (
	"fmt"

	"github.com/SherClockHolmes/webpush-go"
)

func main() {
	publicKey, privateKey, err := webpush.GenerateVAPIDKeys()
	if err != nil {
		fmt.Printf("Error generating VAPID keys: %v\n", err)
		return
	}

	fmt.Println("VAPID Keys generated successfully!")
	fmt.Println("Add these to your config.env file:")
	fmt.Println()
	fmt.Printf("VAPID_PUBLIC_KEY=%s\n", publicKey)
	fmt.Printf("VAPID_PRIVATE_KEY=%s\n", privateKey)
	fmt.Println()
	fmt.Println("Note: Keep your private key secure and never expose it in client-side code.")
}
