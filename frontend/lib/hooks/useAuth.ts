"use client"

import { useState, useEffect, useCallback } from "react"

async function checkAuth(): Promise<[boolean, string?]> {
   const response = await fetch(`/api/auth/me`, {
      credentials: "include", 
   })
   const data = await response.json()
   if (data.message === "Unauthorized: No token provided") {
      return [false, data.message]  
   }     
   else {
      return [true, data.user]
   }
}

export function useAuth() {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [isLoading, setIsLoading] = useState(true)
   const [data, setData] = useState<any>(null)

   const updateAuth = useCallback(async () => {
      const [authStatus, authData] = await checkAuth()
      setIsAuthenticated(authStatus)
      setData(authData)
   }, [])

   useEffect(() => {
      updateAuth().then(() => setIsLoading(false))
      
      window.addEventListener("authChange", updateAuth)
      return () => window.removeEventListener("authChange", updateAuth)
   }, [updateAuth])

   return { isAuthenticated, isLoading, data }
}
