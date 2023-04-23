"use client"

import axios from "axios"
import React, { useCallback, useMemo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { safeListing, SafeUser, safeReservation } from "@/app/types"
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
	reservations?: safeReservation[]
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
	// console.log("disabledDates", disabledDates)

	const handleChangeDate = useCallback((value: Range) => {
		// console.log("Range", value)
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

		/**
		 * 时间问题：选择时间/展示时间 与 数据库存储时间 不一致
		 * 1.提交(POST)时，startDate、endDate都是 Date 对象；在提交到PrismaClient DateTime(格式)时，Prisma会自动调用 toISOString()方法，会转换为少了8小时的时间
		 * 2.获取(GET)时，在 disabledDate 中，使用了 new Date(date)方法，当date中有前导零时，会将传入值转换为多8小时的时间(https://segmentfault.com/a/1190000022403847)
		 * 3.所以，前端选择的时间与展示的时间一致，数据库存储的时间 比 选择时间/展示时间 少8小时
		 */
		axios
			.post("/api/reservations", {
				listingId: listing.id,
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate
			})
			.then(() => {
				toast.success("Make an appointment successfully")
				setDateRange(initialDateRange)

				// redictTo /trips
				router.push("/trips")
			})
			.catch(() => {
				toast.error("Something went wrong")
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [currentUser, loginModal, listing, totalPrice, dateRange, router])

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
