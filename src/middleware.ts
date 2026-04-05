import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;
    const adminToken = request.cookies.get('admin_token')?.value;

    const isAdminPath = pathname.startsWith('/admin');
    const isAdminLogin = pathname === '/admin/login';

    // Static assets and API routes (except maybe some admin APIs)
    const isStaticAsset = pathname.includes('.') || pathname.startsWith('/_next');
    const isApiRoute = pathname.startsWith('/api');

    if (isStaticAsset || isApiRoute) {
        return NextResponse.next();
    }

    if (isAdminPath) {
        if (!adminToken && !isAdminLogin) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
        if (adminToken && isAdminLogin) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/dashboard';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // Public paths for regular users
    const publicPaths = ['/', '/login', '/signup', '/shop', '/cart'];
    const isPublicPath = publicPaths.some((path) =>
        pathname === path || (path !== '/' && pathname.startsWith(path))
    );

    if (!token && !isPublicPath) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (token && (pathname === '/login' || pathname === '/signup')) {
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
