// app/api/auth/[...nextauth]/route.js

import createUserApi from "@/apis/userApis/createUser";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const data = await createUserApi({
        firstName : user?.name,
        email : user?.email,
        isGoogleUser : true
      })
      return true;
    },

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/task`;
    },
    
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
