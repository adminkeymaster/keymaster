import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { verifyPassword } from "@/utils/auth";
import users from '@/models/users'
import dbConnect from '@/utils/database'

dbConnect();

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {

        const user = await users.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        return { email: user.email };
        
      },
    }),
  ],
});