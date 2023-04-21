"use client"

import React, { useMemo } from "react"
import { safeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { categories } from "../Navbar/Categories"
import Container from "../Container"
import ListingHead from "./ListingHead"
import ListingInfo from "./ListingInfo"

interface ListingClientProps {
	listing: safeListing & { user: SafeUser }
	currentUser: SafeUser | null
	reservations?: Reservation[]
}

export default function ListingClient({ listing, currentUser }: ListingClientProps) {
	const category = useMemo(() => {
		return categories.find((item) => item.label == listing.category)
	}, [listing.category])

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
					</div>
				</div>
			</div>
		</Container>
	)
}
