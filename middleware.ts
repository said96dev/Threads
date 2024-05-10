/* import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/chat(.*)',
    '/profile(.*)',
    '/chat(.*)',
    '/tours(.*)', 
]);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}; */

// Resource: https://clerk.com/docs/nextjs/middleware#auth-middleware
// Copy the middleware code as it is from the above resource

import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    // An array of public routes that don't require authentication.
    publicRoutes: ["/api/webhook/clerk"],

    // An array of routes to be ignored by the authentication middleware.
    ignoredRoutes: ["/api/webhook/clerk"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};