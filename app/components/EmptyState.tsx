"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Button from "./Button"
import Heading from "./Heading"

interface EmptyStateProps {
	title?: string
	subtitle?: string
	showReset?: boolean
}

export default function EmptyState({
	title = "No exact matches",
	subtitle = "Try changing or removing some of your filters",
	showReset
}: EmptyStateProps) {
	const router = useRouter()

	return (
		<div className="flex flex-col justify-center items-center gap-2 h-[60vh]">
			<Heading
				title={title}
				subtitle={subtitle}
				center
			/>
			<div className="w-48 mt-4">
				{showReset && (
					<Button
						outline
						label="Remove all filters"
						onClick={() => router.push("/")}
					/>
				)}
			</div>
		</div>
	)
}
