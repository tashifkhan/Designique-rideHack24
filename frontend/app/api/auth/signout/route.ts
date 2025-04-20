import { NextResponse } from "next/server"

export async function POST() {
   try {
      // Create response
      const response = NextResponse.json({ message: "Signed out successfully" }, { status: 200 })
      
      // Clear cookies by setting to empty strings and expiring them
      response.cookies.set("accessToken", "", {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 0,
         path: "/"
      })
      
      response.cookies.set("refreshToken", "", {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 0,
         path: "/"
      })
      
      return response
   } catch (error) {
      console.error("Signout error:", error)
      return NextResponse.json({ 
         message: error instanceof Error ? error.message : "An unexpected error occurred during signout" 
      }, { status: 500 })
   }
}
