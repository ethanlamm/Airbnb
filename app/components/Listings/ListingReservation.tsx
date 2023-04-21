"use client"

import React, { useCallback } from "react"
import { Range, RangeKeyDict } from "react-date-range"
import Button from "../Button"
import Calendar from "../Inputs/Calendar"

interface ListingReservationProps {
	price: number
	totalPrice: number
	dateRange: Range
	onChangeDate: (value: Range) => void
	onSubmit: () => void
	isLoading?: boolean
	disabledDates?: Date[]
}

export default function ListingReservation({
	price,
	totalPrice,
	dateRange,
	onChangeDate,
	onSubmit,
	isLoading,
	disabledDates
}: ListingReservationProps) {
	const handleChange = useCallback((value: RangeKeyDict) => {
		// console.log('RangeKeyDict',value)
		onChangeDate(value.selection)
	}, [])

	return (
		<div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
			<div className="flex flex-row items-center gap-1 p-4">
				<div className="text-2xl font-semibold">$ {price}</div>
				<div className="font-light text-neutral-600">night</div>
			</div>
			<hr />
			<Calendar
				dateRange={dateRange}
				disabledDates={disabledDates}
				// onChange={(value) => onChangeDate(value.selection)}
				onChange={handleChange}
			/>
			<hr />
			<div className="p-4">
				<Button
					disabled={isLoading}
					label="Reserve"
					onClick={onSubmit}
				/>
			</div>
			<div className="flex flex-row items-center justify-between p-4 font-semibold text-lg">
				<div>Total</div>
				<div>$ {totalPrice}</div>
			</div>
		</div>
	)
}
