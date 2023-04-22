import { NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {
	const currentUser = await getCurrentUser()

	if (!currentUser) return NextResponse.error()

	const { listingId, totalPrice, startDate, endDate } = await request.json()

	if (!listingId || !totalPrice || !startDate || !endDate) return NextResponse.error()

	const listingAndReservation = await prisma.listing.update({
		where: { id: listingId },
		data: {
			reservations: {
				create: {
					userId: currentUser.id,
					totalPrice,
					startDate,
					endDate
				}
			}
		}
	})

	return NextResponse.json(listingAndReservation)
}
