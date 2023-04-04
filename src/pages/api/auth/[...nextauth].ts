import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import { Session as NextAuthSession } from "next-auth";


const prisma = new PrismaClient();

interface ExtendedSession extends NextAuthSession {
    userId: string;
}


export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }
                console.log("credentials", credentials)

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                console.log("user", user)

                console.log(bcrypt.compareSync(credentials.password, user.password!))

                if (user && (await bcrypt.compare(credentials.password, user.password!))) {
                    return { id: user.id, email: user.email, name: user.name, image: user.image };
                }

                return null;
            }
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            (session as ExtendedSession).userId = user.id;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
