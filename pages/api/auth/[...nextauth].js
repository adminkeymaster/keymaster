import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { verifyPassword } from '@/utils/auth';
import users from '@/models/users';
import dbConnect from '@/utils/database';

dbConnect();

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
  providers: [
    CredentialsProvider({
      name: 'Keymaster',
      credentials: {
        username: {
          label: 'Цахим шуудан',
          type: 'email',
          placeholder: 'Цахим шуудан',
        },
        password: {
          label: 'Нууц үг',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const { email, password } = credentials;
        const user = await users.findOne({ email });

        if (!user) {
          throw new Error('noUser');
        }
        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error('wrongPassword');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;

      // console.log(session);

      return session;
    },
  },
});
