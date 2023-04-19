"use client"

import React from "react"
import { IconType } from "react-icons"

interface CategoryInputProps {
	onClick: (value: string) => void
	label: string
	selected: boolean
	icon: IconType
}

export default function CategoryInput({ onClick, label, selected, icon: Icon }: CategoryInputProps) {
	return (
		<div
			onClick={() => onClick(label)}
			className={`flex flex-col gap-3 p-4 rounded-xl border-2 hover:border-black transition cursor-pointer ${
				selected ? "border-black" : "border-neutral-200"
			}`}
		>
			<Icon size={30} />
			<div className="font-semibold">{label}</div>
		</div>
	)
}
