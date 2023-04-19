import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) return NextResponse.error()

	const body = await request.json()
	const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body

	// 判断是否上传项完整
	Object.keys(body).forEach((key) => {
		if (!body[key]) {
			return NextResponse.error()
		}
	})

	const listing = await prisma.listing.create({
		// 提交到数据库的字段要与 schema 一致！！
		data: {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			locationValue: location.value,
			price: parseInt(price, 10),
			userId: currentUser.id
		}
	})

	return NextResponse.json(listing)
}
