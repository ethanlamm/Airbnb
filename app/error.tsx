"use client"

import React, { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorProps {
	error: Error
}

export default function Error({ error }: ErrorProps) {
	let timmer: any = undefined
	useEffect(() => {
		if (error) {
			timmer = setTimeout(() => {
				console.error(error)
			}, 100)
		}

		return () => {
			clearTimeout(timmer)
		}
	}, [error])

	return (
		<EmptyState
			title="Uh oh"
			subtitle="Something went wrong!"
		/>
	)
}
