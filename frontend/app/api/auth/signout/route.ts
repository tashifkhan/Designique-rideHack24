import { NextResponse } from "next/server"

export async function POST() {
   const response = NextResponse.json({
      success: true,
      message: "Successfully signed out"
   })
   
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
}
