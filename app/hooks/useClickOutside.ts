import { useEffect, useRef, useState } from "react"

export default function useClickOutside() {
	const [isOpen, setIsOpen] = useState(false)

	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const listener = (e: any) => {
			if (ref?.current === e.target || ref?.current?.contains(e.target)) {
				// 如果点击的是 目标元素或者目标元素的子元素，则取反
				setIsOpen((pre) => !pre)
			} else {
				// 如果点击的是 非目标元素或者非目标元素的子元素
				// 若已经是关闭状态，则return；若是打开状态，则关闭
				if (!isOpen) return
				setIsOpen(false)
			}
		}

		document.addEventListener("click", listener)

		return () => {
			document.removeEventListener("click", listener)
		}
	}, [ref, isOpen])

	return { isOpen, ref }
}
