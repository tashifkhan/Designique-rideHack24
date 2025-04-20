import { NextResponse } from "next/server"
import connectMongo from "@/lib/db/connectMongo"
import { User } from "@/models/Users"
import mongoose from "mongoose"

export async function POST(req: Request) {
   try {
      await connectMongo()
   } catch (error) {
      console.error("Error connecting to MongoDB", error)
      return NextResponse.json({ message: "Failed to connect to database" }, { status: 500 })
   }

   try {
      const body = await req.json()
      const { token, id } = body

      if (!token || !id) {
         return NextResponse.json({ message: "Token and user ID are required" }, { status: 400 })
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
         return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 })
      }

      const user = await User.findOne({
         _id: id,
         token: token
      })

      if (!user) {
         return NextResponse.json({ 
            message: "Invalid or expired verification link. Please request a new one." 
         }, { status: 404 })
      }

      if (user.isVerified) {
         return NextResponse.json({ 
            message: "Your email is already verified. You can sign in now." 
         }, { status: 200 })
      }

      user.isVerified = true
      user.token = undefined
      await user.save()

      return NextResponse.json({
         message: "Email successfully verified! You can now sign in to your account.",
         success: true
      }, { status: 200 })

   } catch (error) {
      console.error("Email verification error:", error)
      return NextResponse.json({ 
         message: "An unexpected error occurred during verification" 
      }, { status: 500 })
   }
}
