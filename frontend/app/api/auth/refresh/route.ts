import { NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

export async function POST(request: NextRequest) {
   try {
      const { refreshToken } = await request.json()
      
      if (!refreshToken) {
         return NextResponse.json({ error: "Refresh token required" }, { status: 400 })
      }

      // Verify the refresh token
      const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET)
      
      try {
         const { payload } = await jose.jwtVerify(refreshToken, refreshSecret, {
            algorithms: ["HS256"]
         })
         
         if (!payload.id || !payload.email) {
            return NextResponse.json({ error: "Invalid token payload" }, { status: 401 })
         }
         
         // Generate new tokens
         const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
         const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || "1d"
         const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || "30d"
         
         // Create new access token
         const accessToken = await new jose.SignJWT({
            id: payload.id,
            email: payload.email,
            roles: payload.roles || []
         })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime(accessTokenExpiry)
            .setIssuedAt()
            .sign(accessSecret)
         
         // Create new refresh token
         const newRefreshToken = await new jose.SignJWT({
            id: payload.id,
            email: payload.email,
            roles: payload.roles || []
         })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime(refreshTokenExpiry)
            .setIssuedAt()
            .sign(refreshSecret)
         
         return NextResponse.json({
            accessToken,
            refreshToken: newRefreshToken
         })
         
      } catch (error) {
         console.error("Token verification failed:", error)
         return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 401 })
      }
   } catch (error) {
      console.error("Refresh token error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
   }
}
