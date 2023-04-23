"use client"

import React, { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorProps {
	error: Error
}

export default function Error({ error }: ErrorProps) {
	useEffect(() => {
		if (error) {
			console.error(error)
		}
	}, [error])

	return (
		<EmptyState
			title="Uh oh"
			subtitle="Something went wrong!"
		/>
	)
}
