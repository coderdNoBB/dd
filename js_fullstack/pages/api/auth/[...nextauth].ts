import NextAuth, { NextAuthOptions } from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      id: 'Credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "ddd" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/user`, {
          method: "post",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        if(res.status === 401){
          throw new Error('Credential invalid');
        }
        const data = await res.json()
       
        // If no error and we have user data, return it
        if (res.ok && data) {
          return data.user
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, user, token }) {
      return session
    }
  },
  pages: {
    signIn: '/mountain', // mountain is login page
  }
}

export default NextAuth(authOptions)
