"use client"

import React from "react"

interface ContainerProps {
	children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
	return <div className="px-4 sm:px-2 md:px-10 xl:px-20 mx-auto max-w-[2520px]">{children}</div>
}
