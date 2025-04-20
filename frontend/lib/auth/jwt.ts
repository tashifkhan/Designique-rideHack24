import * as jose from "jose"

interface JWTPayload {
   id: string
   email: string
   roles: string[]
   isVerified: boolean
   iat?: number
   exp?: number
}

/**
 * Verifies a JWT token and returns the decoded payload
 */
export async function verifyJWT(token: string): Promise<JWTPayload> {
   const secret = process.env.JWT_ACCESS_SECRET
   
   if (!secret) {
      throw new Error("JWT secret is not defined")
   }
   
   try {
      const { payload } = await jose.jwtVerify(
         token,
         new TextEncoder().encode(secret)
      )
      
      return payload as unknown as JWTPayload
   } catch (error) {
      console.error("JWT verification failed:", error)
      throw error
   }
}
