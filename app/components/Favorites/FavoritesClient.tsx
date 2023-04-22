"use client"

import { safeListing, SafeUser } from "@/app/types"
import React from "react"
import Container from "../Container"
import Heading from "../Heading"
import ListingCard from "../Listings/ListingCard"

interface FavoritesClientProps {
	favoriteListings: safeListing[]
	currentUser: SafeUser | null
}

export default function FavoritesClient({ favoriteListings, currentUser }: FavoritesClientProps) {
	return (
		<Container>
			<Heading
				title="Favorites"
				subtitle="List of places you have favorited!"
			/>
			<div className="grid gap-8 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{favoriteListings.map((favoriteListing) => (
					<ListingCard
						key={favoriteListing.id}
						data={favoriteListing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}
