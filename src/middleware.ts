// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // Define paths that should be accessible only when logged in
    const protectedPaths = ['/']
    // Define paths that should be accessible only when logged out
    const authPaths = ['/login']

    if (!token && protectedPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && authPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/login'],
}