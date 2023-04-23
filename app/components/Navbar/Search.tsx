"use client"

import React, { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import useSearchModal from "@/app/hooks/useSearchModal"
import { BiSearch } from "react-icons/bi"
import useCountries from "@/app/hooks/useCountries"
import { differenceInDays } from "date-fns"

export default function Search() {
	const searchModal = useSearchModal()
	const searchParams = useSearchParams()
	const { getByValue } = useCountries()

	const locationValue = searchParams?.get("locationValue")
	const startDate = searchParams?.get("startDate")
	const endDate = searchParams?.get("endDate")
	const guestCount = searchParams?.get("guestCount")

	const locationLabel = useMemo(() => {
		if (locationValue) return getByValue(locationValue)?.label

		return "Any Where"
	}, [locationValue, getByValue])

	const durationLabel = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate)
			const end = new Date(endDate)

			const diff = differenceInDays(end, start)

			return `${diff == 0 ? "1" : diff} Day`
		}

		return "Any Week"
	}, [startDate, endDate])

	const guestLabel = useMemo(() => {
		return `${guestCount ? `${guestCount} Guests` : "Add Guests"}`
	}, [guestCount])

	return (
		<div
			onClick={searchModal.onOpen}
			className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
		>
			<div className="flex flex-row items-center justify-between">
				<div className="text-sm font-semibold px-6">{locationLabel}</div>
				<div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
					{durationLabel}
				</div>
				<div className="text-sm text-gray-600 pl-6 pr-2 flex flex-row items-center gap-3">
					<div className="hidden sm:block">{guestLabel}</div>
					<div className="text-white bg-rose-500 p-2 rounded-full">
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	)
}
