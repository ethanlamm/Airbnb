"use client"

import React, { useEffect, useState } from "react"

interface ClientOnlyProps {
	children: React.ReactNode
}

export default function ClientOnly({ children }: ClientOnlyProps) {
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) return null
	return <>{children}</>
}
/**
 * This component is to fix the "Unhandled Runtime Error: Error: Text content does not match server-rendered HTML"
 */
