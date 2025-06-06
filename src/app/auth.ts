import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";
import { db } from "@/db";
import google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { eq } from "drizzle-orm";
import type { Provider } from "next-auth/providers";
import type { DefaultSession, User } from "next-auth";
import bcrypt from "bcryptjs";


declare module "next-auth" {
  interface Session {
    user: {
      roleId?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    roleId?: string | null;
  }
}

const providers: Provider[] = [
  google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const { email, password } = credentials as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .then((res) => res[0]);

      if (!user || !user.password) {
        throw new Error("Invalid email or password.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      return passwordMatch
        ? {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
        }
        : null;
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  } as any),

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.roleId = user.roleId as string | null;
        token.email = user.email as string;
        token.name = user.name as string;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.roleId = token.roleId as string | null;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      console.log("New user created:", user);
    },
  },
  session: {
    strategy: "jwt",
  },
});
