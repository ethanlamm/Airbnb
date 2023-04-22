"use client"

import React, { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { safeListing, SafeUser } from "@/app/types"
import axios from "axios"
import { toast } from "react-hot-toast"
import Container from "../Container"
import Heading from "../Heading"
import ListingCard from "../Listings/ListingCard"

interface PropertiesClientProps {
	propertyListings: safeListing[]
	currentUser: SafeUser | null
}

export default function PropertiesClient({ propertyListings, currentUser }: PropertiesClientProps) {
	const router = useRouter()
	const [deleteId, setDeleteId] = useState("")

	const onCancel = useCallback((id: string) => {
		setDeleteId(id)

		axios
			.delete(`/api/listings/${id}`)
			.then(() => {
				toast.success("Property deleted")
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
				title="Properties"
				subtitle="List of your properties"
			/>
			<div className="grid gap-8 mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{propertyListings.map((propertyListing) => (
					<ListingCard
						key={propertyListing.id}
						data={propertyListing}
						onAction={onCancel}
						actionId={propertyListing.id}
						actionLabel="Delete property"
						disabled={deleteId == propertyListing.id}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}
