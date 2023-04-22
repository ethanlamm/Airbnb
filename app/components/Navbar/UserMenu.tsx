"use client"

import React, { useCallback, useState, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import useRentModal from "@/app/hooks/useRenModal"

import { signOut } from "next-auth/react"

import { SafeUser } from "@/app/types"

interface UserMenuProps {
	currentUser?: SafeUser | null
}

export default function UserMenu({ currentUser }: UserMenuProps) {
	const router = useRouter()
	// 点击开启 RegisterModal
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const rentModal = useRentModal()

	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = useCallback((e: MouseEvent<HTMLDivElement>, cb?: Function) => {
		e.stopPropagation
		// 关闭菜单
		setIsOpen((pre) => !pre)
		cb && cb()
	}, [])

	const onRent = useCallback(() => {
		// 未登录，先登录 => LoginModal
		if (!currentUser) return loginModal.onOpen()

		// 已登录 => RentModal
		rentModal.onOpen()
	}, [])

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					onClick={onRent}
				>
					Airbnb your home
				</div>
				<div
					className="flex flex-row items-center gap-3 p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition"
					onClick={toggleMenu}
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									onClick={(e) => toggleMenu(e, () => router.push("/trips"))}
									label="My trips"
								/>
								<MenuItem
									onClick={(e) => toggleMenu(e, () => router.push("/favorites"))}
									label="My favorites"
								/>
								<MenuItem
									onClick={(e) => toggleMenu(e, () => router.push("/reservations"))}
									label="My reservations"
								/>
								<MenuItem
									onClick={(e) => toggleMenu(e, () => router.push("/properties"))}
									label="My properties"
								/>
								<MenuItem
									onClick={(e) => toggleMenu(e, rentModal.onOpen)}
									label="Airbnb my home"
								/>
								<hr />
								<MenuItem
									onClick={(e) => toggleMenu(e, signOut)}
									label="Logout"
								/>
							</>
						) : (
							<>
								<MenuItem
									onClick={(e) => toggleMenu(e, loginModal.onOpen)}
									label="Login"
								/>
								<MenuItem
									onClick={(e) => toggleMenu(e, registerModal.onOpen)}
									label="Sign Up"
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
