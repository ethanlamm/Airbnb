"use client"

import React, { useCallback, MouseEvent, useMemo } from "react"
import { useRouter } from "next/navigation"
import { safeListing, safeReservation, SafeUser } from "@/app/types"
import useCountries from "@/app/hooks/useCountries"
import { format } from "date-fns"
import Image from "next/image"
import Button from "../Button"
import HeartButton from "../HeartButton"

interface ListingCardProps {
	data: safeListing
	currentUser: SafeUser | null
	disabled?: boolean
	reservation?: safeReservation
	onAction?: (id: string) => void
	actionLabel?: string
	actionId?: string
}

export default function ListingCard({
	data,
	currentUser,
	disabled,
	reservation,
	onAction,
	actionId = "",
	actionLabel
}: ListingCardProps) {
	const router = useRouter()
	const { getByValue } = useCountries()

	const location = getByValue(data.locationValue)

	const handleCancel = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()

			if (disabled) return

			if (onAction) onAction(actionId)
		},
		[disabled, onAction, actionId]
	)

	const price = useMemo(() => {
		if (reservation) return reservation.totalPrice

		return data.price
	}, [reservation, data.price])

	const reservationDate = useMemo(() => {
		if (!reservation) return null

		const start = new Date(reservation.startDate)
		const end = new Date(reservation.endDate)

		return `${format(start, "PP")} - ${format(end, "PP")}`
	}, [reservation])

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						fill
						className="object-cover h-full w-full group-hover:scale-110 transition"
						src={data.imageSrc}
						alt="Listing"
					/>
					<div className="absolute top-3 right-3">
						<HeartButton
							listingId={data.id}
							currentUser={currentUser}
						/>
					</div>
				</div>
				<div className="font-semibold text-lg truncate">
					{location?.region}, {location?.label}
				</div>
				<div className="font-light text-neutral-500">{reservationDate || data.category}</div>
				<div className="flex flex-row items-center gap-1">
					<div className="font-semibold">$ {price}</div>
					{!reservation && <div className="font-light">night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	)
}
