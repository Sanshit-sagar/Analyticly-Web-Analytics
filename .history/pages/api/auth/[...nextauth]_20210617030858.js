import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId:'Iv1.def437cf8a90dff0',
      clientSecret:'e7c073688ac76ad878115746e271e836b25b0335'
    }),
    Providers.Google({
      clientId:'197490376477-v9q620e9bpi5cjt3ij4m4am1batbvio3.apps.googleusercontent.com',
      clientSecret:'tXvBeU3V_nW9pksOQn25cqmO',
    }),
  ],
});
