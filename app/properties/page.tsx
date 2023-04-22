import React from "react"
import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import PropertiesClient from "../components/Properties/PropertiesClient"

export default async function PropertyPage() {
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

	// 查询当前用户的 properties(listings)
	const myPropertyListings = await getListings({ userId: currentUser.id })

	if (!myPropertyListings.length) {
		return (
			<ClientOnly>
				<EmptyState
					title="No properties found"
					subtitle="Looks like you have no properties"
				/>
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<PropertiesClient
				propertyListings={myPropertyListings}
				currentUser={currentUser}
			/>
		</ClientOnly>
	)
}
