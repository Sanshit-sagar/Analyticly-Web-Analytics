import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    site: process.env.NEXTAUTH_URL,
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        session: async (session, user) => {
            session.id = user.id;
            return Promise.resolve(session);
        },
    },
    session: {
        jwt: true,
    },
    jwt: {
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
        secret: process.env.JWT_SECRET
    },
    secret: process.env.JWT_SECRET,
    events: { },
    debug: false
});