import prisma from "../libs/prismadb"

export interface IListingsParams {
	userId?: string
}

export default async function getListings(params?: IListingsParams) {
	try {
		// 查询条件
		let query: any = {}

		/**
		 * getListings()
		 * 1.不传参数（即 params 是 uundefined），查询全部 => HomePage
		 * 2.传入参数，依据参数改变查询条件 query，来进行查询符合条件的 lsiting
		 */
		if (params) {
			const { userId } = params

			if (userId) query.userId = userId
		}

		const listings = await prisma.listing.findMany({
			where: query,
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
