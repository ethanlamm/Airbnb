import React from "react"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import TripsClient from "../components/Trips/TripsClient"

export default async function TripPage() {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState
					title="Unauthorized"
					subtitle="Please login"
				/>
			</ClientOnly>
		)
	}

	const reservations = await getReservations({ userId: currentUser.id })

	if (!reservations.length) {
		return (
			<ClientOnly>
				<EmptyState
					title="No trips found"
					subtitle="Looks like you do not reserve any trips"
				/>
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<TripsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	)
}
