"use client"

import React from "react"
// https://github.com/hypeserver/react-date-range
import { DateRange, Range, RangeKeyDict } from "react-date-range"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface CalendarProps {
	dateRange: Range
	onChange: (value: RangeKeyDict) => void
	disabledDates?: Date[]
}

export default function Calendar({ dateRange, onChange, disabledDates }: CalendarProps) {
	return (
		<DateRange
			rangeColors={["#262626"]}
			showDateDisplay={false}
			direction="vertical"
			minDate={new Date()}
			ranges={[dateRange]}
			date={new Date()}
			onChange={onChange}
			disabledDates={disabledDates}
		/>
	)
}
