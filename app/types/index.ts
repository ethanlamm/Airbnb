import { User } from "@prisma/client"

// 重新定义User类型
export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
	createdAt: string
	updatedAt: string
	emailVerified: string | null
}

// Country Type
export type Country = {
	value: string
	label: string
	flag: string
	latlng: number[]
	region: string
}
