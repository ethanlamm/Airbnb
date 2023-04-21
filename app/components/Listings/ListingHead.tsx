"use client"

import React from "react"
import { SafeUser } from "@/app/types"
import useCountries from "@/app/hooks/useCountries"
import Heading from "../Heading"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingHeadProps {
	id: string
	title: string
	imageSrc: string
	locationValue: string
	currentUser: SafeUser | null
}

export default function ListingHead({ id, title, imageSrc, locationValue, currentUser }: ListingHeadProps) {
	const { getByValue } = useCountries()

	const location = getByValue(locationValue)

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
				<Image
					src={imageSrc}
					fill
					className="objet-cover"
					alt="Image"
				/>
				<div className="absolute top-5 right-5">
					<HeartButton
						listingId={id}
						currentUser={currentUser}
					/>
				</div>
			</div>
		</>
	)
}
