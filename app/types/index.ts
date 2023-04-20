import { User, Listing } from "@prisma/client"

// 重新定义User类型
export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
	createdAt: string
	updatedAt: string
	emailVerified: string | null
}

// 重新定义Listings类型
export type safeListing = Omit<Listing, "createdAt"> & {
	createdAt: string
}

// Country Type
export type Country = {
	value: string
	label: string
	flag: string
	latlng: number[]
	region: string
}
