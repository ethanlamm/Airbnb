"use client"

import React, { useCallback } from "react"
// https://next-cloudinary.spacejelly.dev/components/clduploadwidget/basic-usage
import { CldUploadWidget } from "next-cloudinary"
import { TbPhotoPlus } from "react-icons/tb"
import Image from "next/image"

declare global {
	var cloudinary: any
}

interface ImageUploadProps {
	value: string
	onChange: (value: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
	const handleUpload = useCallback(
		(res: any) => {
			onChange(res.info.secure_url)
		},
		[onChange]
	)

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="dyvq2n5l"
			options={{ maxFiles: 1 }}
		>
			{({ open }) => (
				<div
					onClick={() => open && open()}
					className="relative flex flex-col justify-center items-center gap-4 cursor-pointer hover:opacity-70 border-dashed border-2 border-neutral-300 text-neutral-600 p-20 "
				>
					<TbPhotoPlus size={50} />
					<div className="font-semibold text-lg">Click to upload</div>
					{value && (
						<div className="absolute inset-0 w-full h-full">
							<Image
								fill
								style={{ objectFit: "cover" }}
								src={value}
								alt="House"
							/>
						</div>
					)}
				</div>
			)}
		</CldUploadWidget>
	)
}
