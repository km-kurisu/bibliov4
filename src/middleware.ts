import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;

    // Public paths that don't require authentication
    const publicPaths = ['/login', '/signup', '/api'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // Also allow static assets and images
    const isStaticAsset = pathname.includes('.') || pathname.startsWith('/_next');

    if (!token && !isPublicPath && !isStaticAsset) {
        // Redirect to login if unauthenticated and trying to access a protected route
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (token && (pathname === '/login' || pathname === '/signup')) {
        // Redirect to home if already authenticated and trying to access login/signup
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
