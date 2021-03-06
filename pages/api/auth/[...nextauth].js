import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// import Adapters from "next-auth/adapters"
// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    // adapter: Adapters.Prisma.Adapter({ prisma }),
    theme: 'light',
    debug: true,
};

export default (req, res) => NextAuth(req, res, options)