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
  },
  session: {
    strategy: 'jwt',
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
        console.log(user);
        if (!user) {
          return {
            message: 'Таны хэрэглэгчийн мэдээлэл байхгүй байна',
          };
        }
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          return {
            message: 'Нууц үг буруу байна',
          };
        }
        return user;
      },
    }),
  ],
});
