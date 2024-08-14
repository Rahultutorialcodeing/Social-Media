import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    // console.log(path)

    const ispublicPath = path === '/' || path === '/sign-up' || path.startsWith('/verify/')

    const token = request.cookies.get("token")?.value || ''

    if (ispublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    if (!ispublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/sign-up',
        '/verify/:path*',
        '/home',
        '/serch',
        '/notification',
        '/reels',
        '/profile/:userprofile*',
        '/inbox',
        '/explore',
        '/editprofile'
    ]
}