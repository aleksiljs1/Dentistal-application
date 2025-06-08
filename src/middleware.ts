import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth, decodeToken } from '@/lib/auth'

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  '/api/users': ['ADMIN'],
  '/api/users/': ['ADMIN']  // This will match /api/users/{id} as well
};

// Define public API routes that don't require authentication
const PUBLIC_API_ROUTES = [
  '/api/appointments',  // POST /api/appointments should be public
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('🔍 Middleware - Checking path:', path);

  // Skip middleware completely for non-API routes and static files
  if (!path.startsWith('/api/') || 
      path.startsWith('/api/auth') ||
      path.startsWith('/_next') || 
      path.startsWith('/images') ||
      path === '/favicon.ico') {
    console.log('✅ Non-API or public route - skipping auth check:', path);
    return NextResponse.next();
  }

  // Allow public API routes
  if (PUBLIC_API_ROUTES.some(route => path.startsWith(route)) && request.method === 'POST') {
    console.log('✅ Public API route - allowing access:', path);
    return NextResponse.next();
  }

  try {
    const authHeader = request.headers.get('authorization');
    console.log('🔑 Auth header present?:', !!authHeader);
    
    const token = authHeader?.split(' ')[1];
    console.log('🎟️ Token present?:', !!token);

    if (!token) {
      console.log('❌ No token found for API route:', path);
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify token
    await verifyAuth(token);
    
    // Check role-based access for protected routes
    const decodedToken = decodeToken(token);
    console.log('👤 User role:', decodedToken?.role);
    
    // Check if this path requires specific roles
    const requiredRoles = Object.entries(PROTECTED_ROUTES).find(([route]) => 
      path.startsWith(route)
    )?.[1];
    
    if (requiredRoles && decodedToken?.role) {
      console.log('🔐 Required roles:', requiredRoles);
      if (!requiredRoles.includes(decodedToken.role)) {
        console.log('🚫 Access denied - insufficient permissions');
        return NextResponse.json({ 
          error: 'Access denied - insufficient permissions' 
        }, { status: 403 });
      }
      console.log('✅ Role check passed');
    }

    console.log('✅ Token verified successfully');
    return NextResponse.next();
  } catch (error) {
    console.log('🔥 Error in middleware:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

// Update matcher to only include API routes
export const config = {
  matcher: [
    '/api/:path*',  // Only match API routes
  ],
} 