import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Paths that don't require authentication
const publicPaths = [
   "/signin",
   "/signup",
   "/forgot-password",
   "/api/auth/signin",
   "/api/auth/signup",
   "/api/auth/refresh"
]

// Check if the current path is in the public paths list
function isPublicPath(path: string): boolean {
   return publicPaths.some(publicPath => 
      path === publicPath || 
      path.startsWith(`${publicPath}/`)
   )
}

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl

   // Allow API routes to handle their own authentication
   if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/me")) {
      return NextResponse.next()
   }

   // Check if the path is public
   if (isPublicPath(pathname)) {
      return NextResponse.next()
   }

   // Check for authentication token
   const accessToken = request.cookies.get("accessToken")?.value

   // If no token found and the path requires authentication, redirect to signin
   if (!accessToken && !isPublicPath(pathname)) {
      const url = request.nextUrl.clone()
      url.pathname = "/signin"
      url.searchParams.set("from", pathname)
      return NextResponse.redirect(url)
   }

   return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
   matcher: [
      // Match all request paths except for the ones starting with:
      // - _next/static (static files)
      // - _next/image (image optimization files)
      // - favicon.ico (favicon file)
      '/((?!_next/static|_next/image|favicon.ico).*)',
   ],
}
