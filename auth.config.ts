import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt', // Set the session strategy to "jwt"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      // if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token && typeof token.sub === 'string') {
        // This ensures that token.sub is indeed a string before assigning it
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
