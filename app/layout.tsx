import "./globals.css"

import ClientOnly from "./components/ClientOnly"
import Navbar from "./components/Navbar/Navbar"
import RegisterModal from "./components/Modals/RegisterModal"
import ToasterProvider from "./providers/ToasterProvider"

import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Airbnb",
	description: "Airbnb Clone"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientOnly>
					<ToasterProvider />
					<RegisterModal />
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	)
}
