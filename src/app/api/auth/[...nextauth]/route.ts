import { UUID } from "crypto";
import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: UUID | string,
      companyId: number
    } & DefaultSession['user']
  }

  interface User {
    id: UUID | string,
    companyId: number
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    companyId: number
  }
}



const baseURL = process.env.NEXTAUTH_URL

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await fetch(baseURL + '/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (user.status != 200) {
          const body = await user.json()
          return body.data.info
        } else {
          const jsonData = await user.json();
          return { id: jsonData.data?.id, name: jsonData.data?.name, email: jsonData.data?.email, companyId: jsonData.data?.companyId };
        }
      },
    })
  ],

  // 2. Konfigurasi Session
  session: {
    // Gunakan strategi JWT untuk manajemen sesi (direkomendasikan)
    strategy: "jwt",
    // Atur masa kedaluwarsa sesi (contoh: 30 hari)
    maxAge: 60 * 60, // 1 Jam karena 60 s * 60
  },

  // (Opsional)
  pages: {
    signIn: '/login', // Arahkan ke halaman login kustom
    signOut: '/login'
  },

  callbacks: {
    async signIn({ account, user, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.companyId = user.companyId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user.id = token.id;
        session.user.companyId = token.companyId;
        session.user.name = token.name;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };