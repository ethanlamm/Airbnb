// "use client"

import "./globals.css"

import ClientOnly from "./components/ClientOnly"
import Navbar from "./components/Navbar/Navbar"
import RegisterModal from "./components/Modals/RegisterModal"
import LoginModal from "./components/Modals/LoginModal"
import ToasterProvider from "./providers/ToasterProvider"

// import useRegisterModal from "./hooks/useRegisterModal"
// import useLoginModal from "./hooks/useLoginModal"

import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Airbnb",
	description: "Airbnb Clone"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// const registerModal = useRegisterModal()
	// const loginModal = useLoginModal()

	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientOnly>
					<ToasterProvider />
					<RegisterModal />
					<LoginModal />
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	)
}
