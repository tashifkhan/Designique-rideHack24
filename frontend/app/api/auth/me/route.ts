import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyJWT } from "@/lib/auth/jwt"
import connectMongo from "@/lib/db/connectMongo"
import { User } from "@/models/Users"

export async function GET() {
   try {
      // Get the access token from cookies
      const cookieStore = cookies()
      const accessToken = cookieStore.get("accessToken")?.value


      if (!accessToken) {
         return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 })
      }

      // Verify the token and get the payload
      let payload
      try {
         payload = await verifyJWT(accessToken)
      } catch (error) {
         console.error("JWT verification failed:", error)
         return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 })
      }

      // Connect to MongoDB
      await connectMongo()

      // Get user data from database
      const user = await User.findById(payload.id).select("-password")

      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      // Return user data
      interface UserResponse {
         user: {
         id: string,
         firstname: string,
         lastname: string,
         email: string,
         roles: string[]
         }
      }

      return NextResponse.json<UserResponse>({
         user: {
         id: user._id.toString(),
         firstname: user.firstname,
         lastname: user.lastname,
         email: user.email,
         roles: Array.isArray(user.roles) ? user.roles.map((r: unknown) => (r as string).toString()) : []
         }
      }, { status: 200 })
   } catch (error) {
      console.error("Error fetching user data:", error)
      return NextResponse.json({ 
         message: error instanceof Error ? error.message : "An unexpected error occurred" 
      }, { status: 500 })
   }
}
