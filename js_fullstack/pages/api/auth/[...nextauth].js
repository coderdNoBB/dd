import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
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
        console.log(credentials, req)

        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()

        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // Return null if user data could not be retrieved

        // console.log(credentials.username)
        // console.log(typeof credentials.username);
        const user = { id: 1, name: credentials.username, }
        if (credentials.username.includes('d')) {
          user.role = 'Admin'
        }
        if (user)
          return user
        else
          return null

        // return null
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
