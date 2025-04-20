import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyJWT } from "@/lib/auth/jwt"

// Paths that don't require authentication
const publicPaths = [
   "/",
   "/signin",
   "/signup",
   "/verification/:path*",
   "/forgot-password",
   "/reset-password/:path*",
   "/api/auth/:path*"
]

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl

   // Check if the path is public
   const isPublicPath = publicPaths.some(path => {
      if (path.includes(":path*")) {
         const basePath = path.split("/:path*")[0]
         return pathname === basePath || pathname.startsWith(`${basePath}/`)
      }
      return pathname === path
   })

   if (isPublicPath) {
      return NextResponse.next()
   }

   // Check for the access token in cookies
   const accessToken = request.cookies.get("accessToken")?.value

   // If no token is found, redirect to the signin page
   if (!accessToken) {
      const signinUrl = new URL("/signin", request.url)
      signinUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signinUrl)
   }

   try {
      // Verify the token
      await verifyJWT(accessToken)
      return NextResponse.next()
   } catch (error) {
      // If token verification fails, redirect to signin
      console.error("JWT verification failed:", error)
      
      const signinUrl = new URL("/signin", request.url)
      signinUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signinUrl)
   }
}

export const config = {
   matcher: [
      /*
       * Match all paths except:
       * 1. /api/auth routes that handle authentication (to avoid infinite redirects)
       * 2. /_next (Next.js internals)
       * 3. /static or /public (static files)
       * 4. .*\\..* (files with extensions like .js, .css, etc.)
       */
      "/((?!_next|static|public|.*\\..*|favicon.ico).*)"
   ],
}
