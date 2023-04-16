import "./globals.css"

import ClientOnly from "./components/ClientOnly"
import Navbar from "./components/Navbar/Navbar"
import Modal from "./components/Modal/Modal"

import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Airbnb",
	description: "Airbnb Clone"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const handleSecondaryAction = () => {}
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientOnly>
					<Modal
						isOpen
						title="Login Modal"
						actionLabel="Submit"
						secondaryActionLabel="Cancel"
					/>
					<Navbar />
				</ClientOnly>
				{children}
			</body>
		</html>
	)
}
