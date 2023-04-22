import React from "react"
import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "../components/Favorites/FavoritesClient"

export default async function FavoritePage() {
	const favoriteListings = await getFavoriteListings()
	const currentUser = await getCurrentUser()

	if (!favoriteListings.length) {
		return (
			<ClientOnly>
				<EmptyState
					title="No favorites found"
					subtitle="Looks like you have no favorite listings"
				/>
			</ClientOnly>
		)
	}
	return (
		<ClientOnly>
			<FavoritesClient
				favoriteListings={favoriteListings}
				currentUser={currentUser}
			/>
		</ClientOnly>
	)
}
