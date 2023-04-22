import React from "react"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import ReservationsClient from "../components/Reservations/ReservationsClient"

export default async function ReservationPage() {
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

	const reservations = await getReservations({ authorId: currentUser.id })

	if (!reservations.length) {
		return (
			<ClientOnly>
				<EmptyState
					title="No reservations found"
					subtitle="Looks like you have no reservations on your properties."
				/>
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<ReservationsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	)
}
