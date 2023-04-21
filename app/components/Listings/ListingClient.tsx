"use client"

import axios from "axios"
import React, { useCallback, useMemo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { safeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { categories } from "../Navbar/Categories"
import Container from "../Container"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"
import ListingReservation from "./ListingReservation"
import useLoginModal from "@/app/hooks/useLoginModal"
import { toast } from "react-hot-toast"
// https://www.npmjs.com/package/react-date-range
import { Range } from "react-date-range"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"

interface ListingClientProps {
	listing: safeListing & { user: SafeUser }
	currentUser: SafeUser | null
	reservations?: Reservation[]
}

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection"
}

export default function ListingClient({ listing, currentUser, reservations = [] }: ListingClientProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [totalPrice, setTotalPrice] = useState(listing.price)
	const [dateRange, setDateRange] = useState<Range>(initialDateRange)

	const category = useMemo(() => {
		return categories.find((item) => item.label == listing.category)
	}, [listing.category])

	const loginModal = useLoginModal()
	const router = useRouter()

	const disabledDates = useMemo(() => {
		let dates: Date[] = []

		reservations.forEach((reservation) => {
			// eachDayOfInterval: https://date-fns.org/v2.29.3/docs/eachDayOfInterval
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate)
			})

			dates = [...dates, ...range]
		})

		return dates
	}, [reservations])

	const handleChangeDate = useCallback((value: Range) => {
		// console.log('Range',value)
		setDateRange(value)
	}, [])

	useEffect(() => {
		// differenceInCalendarDays: https://date-fns.org/v2.29.3/docs/differenceInCalendarDays
		const dayCount = differenceInCalendarDays(dateRange.endDate as Date, dateRange.startDate as Date)

		dayCount ? setTotalPrice(dayCount * listing.price) : setTotalPrice(listing.price)
	}, [dateRange, listing.price])

	// 预约
	const onCreateReservation = useCallback(() => {
		if (!currentUser) return loginModal.onOpen()

		setIsLoading(true)

		axios
			.post("/api/reservation", {
				listingId: listing.id,
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate
			})
			.then(() => {
				toast.success("Make an appointment successfully")
				setDateRange(initialDateRange)

				// redictTo /trips
				router.refresh()
			})
			.catch(() => {
				toast.error("Something went wrong")
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [currentUser, loginModal, listing.id, dateRange])

	return (
		<Container>
			<div className="mx-auto max-w-screen-lg">
				<div className="flex flex-col gap-6">
					<ListingHead
						id={listing.id}
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						currentUser={currentUser}
					/>
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
						<div className="order-first mb-10 md:order-last md:col-span-3">
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								dateRange={dateRange}
								onChangeDate={handleChangeDate}
								onSubmit={onCreateReservation}
								isLoading={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
