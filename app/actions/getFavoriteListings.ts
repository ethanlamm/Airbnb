import prisma from "../libs/prismadb"
import getCurrentUser from "./getCurrentUser"

export default async function getFavoriteListings() {
	try {
		const currrentUser = await getCurrentUser()

		if (!currrentUser) return []

		const favoriteListings = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currrentUser.favoriteIds || [])]
				}
			}
		})

		const safeFavoriteListings = favoriteListings.map((favoriteListing) => ({
			...favoriteListing,
			createdAt: favoriteListing.createdAt.toISOString()
		}))

		return safeFavoriteListings
	} catch (error) {
		throw new Error("getFavoriteListings error")
	}
}
