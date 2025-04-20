import { NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"
import connectMongo from "@/lib/db/connectMongo"
import { User } from "@/models/Users"

export async function GET(req: Request) {
   try {
      // Extract the token from cookie
      const cookieHeader = req.headers.get("cookie") || ""
      const cookies = Object.fromEntries(
         cookieHeader.split("; ").map(c => {
            const [key, ...value] = c.split("=")
            return [key, value.join("=")]
         })
      )
      
      const accessToken = cookies.accessToken
      
      if (!accessToken) {
         return NextResponse.json({ 
            isAuthenticated: false,
            message: "No authentication token found" 
         }, { status: 401 })
      }
      
      // Verify the token
      try {
         const payload = await verifyJWT(accessToken)
         
         // Connect to the database
         await connectMongo()
         
         // Get user data without the password
         const user = await User.findById(payload.id)
            .select("-password -token")
            .lean()
         
         if (!user) {
            return NextResponse.json({ 
               isAuthenticated: false,
               message: "User not found" 
            }, { status: 404 })
         }
         
         return NextResponse.json({
            isAuthenticated: true,
            user
         }, { status: 200 })
         
      } catch (error) {
         console.error("Token verification error:", error)
         return NextResponse.json({ 
            isAuthenticated: false,
            message: "Invalid or expired token" 
         }, { status: 401 })
      }
      
   } catch (error) {
      console.error("Auth check error:", error)
      return NextResponse.json({ 
         isAuthenticated: false,
         message: "Server error during authentication check" 
      }, { status: 500 })
   }
}
