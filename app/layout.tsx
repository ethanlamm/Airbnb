// server component as default
import "./globals.css"

import ClientOnly from "./components/ClientOnly"
import Navbar from "./components/Navbar/Navbar"
import RegisterModal from "./components/Modals/RegisterModal"
import LoginModal from "./components/Modals/LoginModal"
import ToasterProvider from "./providers/ToasterProvider"

import getCurrentUser from "./actions/getCurrentUser"

import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Airbnb",
	description: "Airbnb Clone"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser()

	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientOnly>
					<ToasterProvider />
					<RegisterModal />
					<LoginModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				{children}
			</body>
		</html>
	)
}
