"use client"

import { useRouter, useSearchParams } from "next/navigation"
import React, { useCallback } from "react"
import { IconType } from "react-icons"
import qs from "query-string"

interface CategoryBoxProps {
	label: string
	icon: IconType
	selected?: boolean
}

export default function CategoryBox({ label, icon: Icon, selected }: CategoryBoxProps) {
	const router = useRouter()
	const params = useSearchParams()

	const handleClick = useCallback(() => {
		let currentQuery = {}

		if (params) {
			currentQuery = qs.parse(params.toString())
		}

		// 重复 return
		if (params?.get("category") === label) return

		// 保留前面的URL参数，加上category
		const updatedQuery = {
			...currentQuery,
			category: label
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery
			},
			{ skipNull: true }
		)

		router.push(url)
	}, [label, router, params])

	return (
		<div
			onClick={handleClick}
			className={`flex flex-col items-center justify-center gpa-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
            ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}`}
		>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	)
}
