import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

interface IParams {
	reservationId: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser()

	if (!currentUser) return NextResponse.error()

	const { reservationId } = params

	if (!reservationId || typeof reservationId !== "string") throw new Error("Invaild reservationId")

	await prisma.reservation.deleteMany({
		where: {
			// id: 该reservation的Id
			id: reservationId,
			OR: [
				// OR 的意思：id + userId（预约客户取消该reservation） 或者 id + listing(userId)（创建该listing的创建者取消该reservation）
				{ userId: currentUser.id },
				{ listing: { userId: currentUser.id } }
			]
		}
	})

	return NextResponse.json("Reservation canceled")
}
