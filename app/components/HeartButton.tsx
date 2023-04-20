"use client"

import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import useFavorite from "../hooks/useFavorite"
import { SafeUser } from "../types"

interface HeartButtonProps {
	listingId: string
	currentUser: SafeUser | null
}

export default function HeartButton({ listingId, currentUser }: HeartButtonProps) {
	const { isfavorite, toggleFavorite } = useFavorite({ listingId, currentUser })

	return (
		<div
			onClick={toggleFavorite}
			className="relative hover:opacity-80 group/heart transition cursor-pointer"
		>
			<AiOutlineHeart
				size={28}
				className="fill-white absolute -top-[2px] -right-[2px] group-hover/heart:fill-rose-500/80"
			/>
			<AiFillHeart
				size={24}
				className={isfavorite ? "fill-rose-500" : "fill-none"}
			/>
		</div>
	)
}
