"use client"

import React, { MouseEvent } from "react"

interface MenuItemProps {
	onClick: (e: MouseEvent<HTMLDivElement>) => void
	label: string
}

export default function MenuItem({ onClick, label }: MenuItemProps) {
	return (
		<div
			onClick={onClick}
			className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
		>
			{label}
		</div>
	)
}
