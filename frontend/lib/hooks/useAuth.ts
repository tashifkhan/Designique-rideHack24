"use client"

import { useState, useEffect, useCallback } from "react"
import * as jose from "jose"

type AuthUser = {
   id: string
   email: string
   roles: string[]
}

export function useAuth() {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [user, setUser] = useState<AuthUser | null>(null)
   const [isLoading, setIsLoading] = useState(true)

   // Function to refresh the token
   const refreshToken = useCallback(async (): Promise<string | null> => {
      try {
         const refreshToken = localStorage.getItem("refreshToken")
         if (!refreshToken) return null

         // Call your API endpoint to refresh the token
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
         })

         if (!response.ok) {
            throw new Error("Failed to refresh token")
         }

         const data = await response.json()
         
         // Save the new tokens - fix token naming consistency
         localStorage.setItem("token", data.accessToken)
         localStorage.setItem("refreshToken", data.refreshToken)
         
         return data.accessToken
      } catch (error) {
         console.error("Error refreshing token:", error)
         // Clear tokens on refresh failure
         localStorage.removeItem("token")
         localStorage.removeItem("refreshToken")
         return null
      }
   }, [])

   const checkAuthStatus = useCallback(async () => {
      try {
         const token = localStorage.getItem("token")
         
         if (!token) {
            setIsAuthenticated(false)
            setUser(null)
            setIsLoading(false)
            return
         }
         
         try {
            // Use jose to verify and decode the token
            const accessSecret = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET
            const secret = new TextEncoder().encode(accessSecret || "fallback-secret-for-client-side")
            
            const { payload } = await jose.jwtVerify(token, secret, {
               algorithms: ["HS256"]
            })
            
            // Token is valid
            setIsAuthenticated(true)
            setUser({
               id: payload.id as string,
               email: payload.email as string,
               roles: payload.roles as string[]
            })
         } catch (e) {
            // Token might be expired, try to refresh
            const newToken = await refreshToken()
            
            if (newToken) {
               // Verify the new token
               const accessSecret = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET
               const secret = new TextEncoder().encode(accessSecret || "fallback-secret-for-client-side")
               
               const { payload } = await jose.jwtVerify(newToken, secret, {
                  algorithms: ["HS256"]
               })
               
               setIsAuthenticated(true)
               setUser({
                  id: payload.id as string,
                  email: payload.email as string,
                  roles: payload.roles as string[]
               })
            } else {
               // Refresh token also failed
               setIsAuthenticated(false)
               setUser(null)
            }
         }
      } finally {
         setIsLoading(false)
      }
   }, [refreshToken])

   useEffect(() => {
      // Check on mount
      checkAuthStatus()

      // Fix event listeners with proper function references
      const handleStorageChange = () => checkAuthStatus()
      const handleAuthChange = () => checkAuthStatus()
      
      window.addEventListener("storage", handleStorageChange)
      window.addEventListener("authChange", handleAuthChange)

      return () => {
         window.removeEventListener("storage", handleStorageChange)
         window.removeEventListener("authChange", handleAuthChange)
      }
   }, [checkAuthStatus])

   // Add logout function
   const logout = useCallback(() => {
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      setIsAuthenticated(false)
      setUser(null)
      
      // Dispatch event to notify other tabs/components
      window.dispatchEvent(new Event("authChange"))
   }, [])

   return { isAuthenticated, user, isLoading, logout, refreshToken }
}
