import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "email",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "johndoe" },
                password: { label: "Password", type: "password"}
            },
            
            async authorize(credentials, req){
                const username = credentials?.username
                const password = credentials?.password

                // check for the user in the database
                // if user found, return the user, else return null
                return {
                    username: "johndoe",
                    id: "1",
                    email: "johndoe@gmail.com"
                }
            }

        })
    ]
})

export {handler as GET, handler as POST}
