/**
 * https://authjs.dev/reference/adapter/prisma
 * https://next-auth.js.org/providers/credentials
 * https://www.npmjs.com/package/bcrypt
 */

import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

// 加密
import bcrypt from "bcrypt"

// prisma 数据库操作
import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" }
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials.password) throw new Error("Invalid credentials")

				// 查找user
				const user = await prisma.user.findUnique({
					where: { email: credentials.email }
				})

				if (!user || !user.hashedPassword) throw new Error("The user does not exist")

				// 对比密码
				// bcrypt.compare(要加密的数据，数据库的数据)
				const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

				if (!isCorrectPassword) throw new Error("Incorrect password")

				return user
			}
		})
	],
	pages: {
		signIn: "/"
	},
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt"
	},
	secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
