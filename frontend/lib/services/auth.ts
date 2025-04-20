"use client"

/**
 * Authentication service for handling login, logout, and token management
 */
export async function login(email: string, password: string) {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
         const errorData = await response.json()
         throw new Error(errorData.error || "Login failed")
      }

      const data = await response.json()
      
      // Store tokens in localStorage
      localStorage.setItem("token", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      
      // Notify about auth change
      window.dispatchEvent(new Event("authChange"))
      
      return data
   } catch (error) {
      console.error("Login error:", error)
      throw error
   }
}

export async function logout() {
   try {
      // Optionally call server to invalidate token
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
         method: "POST",
      })
      
      // Remove tokens regardless of server response
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      
      // Notify about auth change
      window.dispatchEvent(new Event("authChange"))
      
      return response.ok
   } catch (error) {
      // Still remove tokens on error
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      
      // Notify about auth change
      window.dispatchEvent(new Event("authChange"))
      
      console.error("Logout error:", error)
      return true // Consider logout successful even if server call fails
   }
}

export function isAuthenticated(): boolean {
   return !!localStorage.getItem("token")
}

export function getToken(): string | null {
   return localStorage.getItem("token")
}
