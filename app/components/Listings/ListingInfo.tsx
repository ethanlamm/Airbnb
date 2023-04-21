"use client"

import React from "react"
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import useCountries from "@/app/hooks/useCountries"
import Avatar from "../Avatar"
import ListCategory from "./ListCategory"
import Map from "../Map"

interface ListingInfoProps {
	user: SafeUser
	description: string
	guestCount: number
	roomCount: number
	bathroomCount: number
	category:
		| {
				icon: IconType
				label: string
				description: string
		  }
		| undefined
	locationValue: string
}

export default function ListingInfo({
	user,
	description,
	guestCount,
	roomCount,
	bathroomCount,
	category,
	locationValue
}: ListingInfoProps) {
	const { getByValue } = useCountries()

	const coordinates = getByValue(locationValue)?.latlng
	return (
		<div className="flex flex-col gap-8 col-span-4">
			<div className="flex flex-col gap-2">
				<div className=" flex flex-row items-center gap-2 text-xl font-semibold">
					<div>Hosted by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
				<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && (
				<ListCategory
					icon={category.icon}
					label={category?.label}
					description={category?.description}
				/>
			)}
			<hr />
			<div className="text-lg font-light text-neutral-500">{description}</div>
			<hr />
			<Map
				center={coordinates}
				key={locationValue}
			/>
		</div>
	)
}
