import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"

interface IParams {
	listingId?: string
}

// 增加 favoriteId
export async function POST(request: Request, { params }: { params: IParams }) {
	// 是否已登录
	const currentUser = await getCurrentUser()

	if (!currentUser) return NextResponse.error()

	// listingId 解构并验证
	const listingId = params.listingId
	if (!listingId || typeof listingId !== "string") throw new Error("Invaild listingId")

	// 获取当前user的favoriteIds
	let favoriteIds = [...(currentUser.favoriteIds || [])]
	// 添加params传过来的listingId
	favoriteIds.push(listingId)

	// 更新数据库信息
	const updatedUser = await prisma.user.update({
		where: { id: currentUser.id },
		data: { favoriteIds }
	})

	// 返回更新后的数据
	return NextResponse.json(updatedUser)
}

// 删除 favoriteId
export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser()
	if (!currentUser) return NextResponse.error()

	const listingId = params.listingId
	if (!listingId || typeof listingId !== "string") throw new Error("Invaild listingId")

	let favoriteIds = [...(currentUser.favoriteIds || [])]

	favoriteIds = favoriteIds.filter((id) => id !== listingId)

	const updatedUser = await prisma.user.update({
		where: { id: currentUser.id },
		data: { favoriteIds }
	})

	return NextResponse.json(updatedUser)
}
