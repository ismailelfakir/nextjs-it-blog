import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all /admin routes except /admin/login
        if (req.nextUrl.pathname.startsWith('/admin')) {
          if (req.nextUrl.pathname === '/admin/login') {
            return true;
          }
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*']
};