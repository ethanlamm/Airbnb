import getCurrentUser from "./actions/getCurrentUser"
import getListings from "./actions/getListings"

import ClientOnly from "./components/ClientOnly"
import Container from "./components/Container"
import EmptyState from "./components/EmptyState"
import ListingCard from "./components/Listings/ListingCard"

import type { IListingsParams } from "./actions/getListings"

export default async function Home({ searchParams }: { searchParams: IListingsParams }) {
	// 根据查询字符串 getListings
	const listings = await getListings(searchParams)
	const currentUser = await getCurrentUser()

	if (!listings.length) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		)
	}

	return (
		<ClientOnly>
			<Container>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pt-24">
					{listings.map((listing) => (
						<ListingCard
							key={listing.id}
							data={listing}
							currentUser={currentUser}
						/>
					))}
				</div>
			</Container>
		</ClientOnly>
	)
}
