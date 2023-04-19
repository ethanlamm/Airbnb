/**
 * zustand https://www.npmjs.com/package/zustand
 * 状态管理库
 */

import { create } from "zustand"

interface RentModalStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useRentModal = create<RentModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}))

export default useRentModal
