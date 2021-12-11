import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "@/utils/auth";
import users from "@/models/users";
import dbConnect from "@/utils/database";

dbConnect();

export default NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Keymaster",
      credentials: {
        email: {
          label: "Цахим шуудан",
          type: "email",
          placeholder: "Цахим шуудан",
        },
        password: {
          label: "Нууц үг",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await users.findOne({ email });
        if (!user) {
          throw new Error("Хэрэглэгч бүртгэлгүй байна.");
        }
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("Нууц үг буруу байна.");
        }
        return {
          user,
        };
      },
    }),
  ],
});
