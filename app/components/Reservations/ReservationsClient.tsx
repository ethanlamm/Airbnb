"use client"

import React, { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { safeReservation, SafeUser } from "@/app/types"
import axios from "axios"
import { toast } from "react-hot-toast"
import Container from "../Container"
import Heading from "../Heading"
import ListingCard from "../Listings/ListingCard"

interface ReservationsClientProps {
	reservations: safeReservation[]
	currentUser: SafeUser | null
}

export default function ReservationsClient({ reservations, currentUser }: ReservationsClientProps) {
	const router = useRouter()
	const [deleteId, setDeleteId] = useState("")

	// 取消客户预约
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
				title="Reservations"
				subtitle="Bookings on your properties"
			/>
			<div className="grid gap-8 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						onAction={onCancel}
						actionId={reservation.id}
						actionLabel="Cancel guest reservation"
						disabled={deleteId == reservation.id}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}
