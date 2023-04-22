"use client"

import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { safeReservation, SafeUser } from "@/app/types"
import axios from "axios"
import { toast } from "react-hot-toast"
import Container from "../Container"
import Heading from "../Heading"
import ListingCard from "../Listings/ListingCard"

interface TripPageProps {
	reservations: safeReservation[]
	currentUser: SafeUser | null
}

export default function TripsClient({ reservations, currentUser }: TripPageProps) {
	const router = useRouter()
	const [deleteId, setDeleteId] = useState("")

	const onCancel = useCallback((id: string) => {
		setDeleteId(id)

		axios
			.delete(`/api/reservations/${id}`)
			.then(() => {
				toast.success("Reservation canceled")
				router.refresh()
			})
			.catch((error: any) => {
				toast.error(error?.response?.data?.error)
			})
			.finally(() => {
				setDeleteId("")
			})
	}, [])
	return (
		<Container>
			<Heading
				title="Trips"
				subtitle="Where you've been and where you're going"
			/>
			<div className="grid gap-8 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						onAction={onCancel}
						actionId={reservation.id}
						actionLabel="Cancel reservation"
						disabled={deleteId == reservation.id}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}
