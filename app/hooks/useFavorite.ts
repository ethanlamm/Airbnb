import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, MouseEvent } from "react"
import { toast } from "react-hot-toast"
import { SafeUser } from "../types"
import useLoginModal from "./useLoginModal"

interface IUseFavorite {
	listingId: string
	currentUser?: SafeUser | null
}

export default function useFavorite({ listingId, currentUser }: IUseFavorite) {
	const loginModal = useLoginModal()
	const router = useRouter()

	const isfavorite = useMemo(() => {
		const favoriteIds = currentUser?.favoriteIds || []

		return favoriteIds.includes(listingId)
	}, [currentUser, listingId])

	const toggleFavorite = useCallback(
		async (e: MouseEvent<HTMLDivElement>) => {
			e.stopPropagation()

			// 未登录，先登录
			if (!currentUser) return loginModal.onOpen()

			try {
				let request

				// 取反
				if (isfavorite) {
					request = () => axios.delete(`/api/favorite/${listingId}`)
				} else {
					request = () => axios.post(`/api/favorite/${listingId}`)
				}

				await request()
				router.refresh()
				toast.success("Favorite Change")
			} catch (error) {
				toast.error("Something went wrong")
			}
		},
		[currentUser, listingId, isfavorite]
	)

	return { isfavorite, toggleFavorite }
}
