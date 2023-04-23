"use client"

import React, { useCallback, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Country } from "@/app/types"
import { Range } from "react-date-range"
import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import queryString from "query-string"
import { formatISO } from "date-fns"
import Heading from "../Heading"
import CountrySelect from "../Inputs/CountrySelect"
import Map from "../Map"
import Calendar from "../Inputs/Calendar"
import Counter from "../Inputs/Counter"

enum STEPS {
	LOCATION,
	DATE,
	INFO
}

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection"
}

export default function SearchModal() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const searchModal = useSearchModal()

	const [step, setStep] = useState(STEPS.LOCATION)

	const [location, setLocation] = useState<Country>()
	const [guestCount, setGuestCount] = useState(1)
	const [roomCount, setRoomCount] = useState(1)
	const [bathroomCount, setBathroomCount] = useState(1)
	const [dateRange, setDateRange] = useState<Range>(initialDateRange)

	const onBack = useCallback(() => {
		// min: 0
		setStep((pre) => (pre == STEPS.LOCATION ? STEPS.LOCATION : pre - 1))
	}, [])

	const onNext = useCallback(() => {
		// max: 2
		setStep((pre) => (pre == STEPS.INFO ? STEPS.INFO : pre + 1))
	}, [])

	const actionLabel = useMemo(() => {
		if (step == STEPS.INFO) return "Search"
		return "Next"
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		if (step == STEPS.LOCATION) return undefined
		return "Back"
	}, [step])

	const handleClose = useCallback(() => {
		searchModal.onClose()
		// 重置
		setStep(STEPS.LOCATION)
		setLocation(undefined)
		setGuestCount(1)
		setRoomCount(1)
		setBathroomCount(1)
		setDateRange(initialDateRange)
	}, [])

	// --------------------- STEP 1 LOCATION(DEFALUT) --------------------------
	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Where do you want to go?"
				subtitle="Find the perfect location!"
			/>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value)}
			/>
			<hr />
			<Map
				center={location?.latlng}
				key={location?.label}
			/>
		</div>
	)

	// --------------------- STEP 2 DATE --------------------------
	if (step === STEPS.DATE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="When do you plan to go?"
					subtitle="Make sure everyone is free!"
				/>
				<Calendar
					dateRange={dateRange}
					onChange={(value) => setDateRange(value.selection)}
				/>
			</div>
		)
	}

	// --------------------- STEP 3 INFO --------------------------
	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="More information"
					subtitle="Find your perfect place!"
				/>
				<Counter
					title="Guests"
					subtitle="How many guests are coming?"
					value={guestCount}
					onChange={(value) => setGuestCount(value)}
				/>
				<hr />
				<Counter
					title="Rooms"
					subtitle="How many rooms do you need?"
					value={roomCount}
					onChange={(value) => setRoomCount(value)}
				/>
				<hr />
				<Counter
					title="Bathrooms"
					subtitle="How many bahtrooms do you need?"
					value={bathroomCount}
					onChange={(value) => setBathroomCount(value)}
				/>
			</div>
		)
	}

	// --------------------- FINAL SUBMIT --------------------------
	const onSubmit = useCallback(() => {
		if (step !== STEPS.INFO) {
			return onNext()
		}

		let currentQuery = {}

		if (searchParams) {
			currentQuery = queryString.parse(searchParams.toString())
		}

		const updateQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount
		}

		if (dateRange.startDate) {
			updateQuery.startDate = formatISO(dateRange.startDate)
		}
		if (dateRange.endDate) {
			updateQuery.endDate = formatISO(dateRange.endDate)
		}

		const url = queryString.stringifyUrl(
			{
				url: "/",
				query: updateQuery
			},
			{ skipNull: true }
		)

		// 重置
		handleClose()
		// 改变URL
		router.push(url)
	}, [step, onNext, searchParams, location, guestCount, roomCount, bathroomCount, dateRange, searchModal, handleClose])

	return (
		<Modal
			title="Filters"
			isOpen={searchModal.isOpen}
			onClose={handleClose}
			actionLabel={actionLabel}
			onSubmit={onSubmit}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
			body={bodyContent}
		/>
	)
}
