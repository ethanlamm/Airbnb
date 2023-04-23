import prisma from "../libs/prismadb"

export interface IListingsParams {
	userId?: string
	category?: string
	locationValue?: string
	guestCount?: string
	roomCount?: string
	bathroomCount?: string
	startDate?: string
	endDate?: string
}

export default async function getListings(params: IListingsParams) {
	try {
		// 查询条件
		let query: any = {}

		/**
		 * getListings()
		 * 1.传入空对象：HomePage 无查询条件，则查询全部，query = {} (searchParams 默认空对象)
		 * 2.传入参数：
		 *   1）My properties，查询当前用户的 propertyListings，query = { userId: currentUser.id}
		 *   2）SearchMoadl，查询符合条件的 listings，query 受查询字段影响
		 */
		const { userId, category, locationValue, guestCount, roomCount, bathroomCount, startDate, endDate } = params

		if (userId) query.userId = userId

		if (category) query.category = category

		if (locationValue) query.locationValue = locationValue

		if (guestCount) query.guestCount = { gte: parseInt(guestCount) }

		if (roomCount) query.roomCount = { gte: parseInt(roomCount) }

		if (bathroomCount) query.bathroomCount = { gte: parseInt(bathroomCount) }

		// 预约时间
		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{ endDate: { gte: startDate }, startDate: { lte: startDate } },
							{ startDate: { lte: endDate }, endDate: { gte: endDate } }
						]
					}
				}
			}
		}

		const listings = await prisma.listing.findMany({
			where: query, // 传入条件
			orderBy: { createdAt: "desc" }
		})

		const safeListings = listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString()
		}))

		return safeListings
	} catch (error) {
		console.log(error)

		throw new Error("getListings error")
	}
}
