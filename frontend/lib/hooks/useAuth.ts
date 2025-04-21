"use client"

import { useState, useEffect, useCallback } from "react"

async function checkAuth() {
   const response = await fetch(`/api/auth/me`, {
      credentials: "include", 
   })
   const data = await response.json()
   if (data.message === "Unauthorized: No token provided") {
      return false
   }     
   else {
      return true
   }
}

export function useAuth() {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [isLoading, setIsLoading] = useState(true)

   const updateAuth = useCallback(async () => {
      const authStatus = await checkAuth()
      setIsAuthenticated(authStatus)
   }, [])

   useEffect(() => {
      updateAuth().then(() => setIsLoading(false))
      
      window.addEventListener("authChange", updateAuth)
      return () => window.removeEventListener("authChange", updateAuth)
   }, [updateAuth])

   return { isAuthenticated, isLoading }
}
