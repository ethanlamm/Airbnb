"use client"

import React, { useCallback, useMemo, useState } from "react"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRenModal"
import Heading from "../Heading"
import { categories } from "../Navbar/Categories"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import type { Country } from "@/app/types"
import CategoryInput from "../Inputs/CategoryInput"
import CountrySelect from "../Inputs/CountrySelect"
import Map from "../Map"
import Counter from "../Inputs/Counter"
import ImageUpload from "../Inputs/ImageUpload"
import Input from "../Inputs/Input"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
	CATEGORY,
	LOCATION,
	INFO,
	IMAGES,
	DESCRIPTION,
	PRICE
}

export default function RentModal() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const rentModal = useRentModal()

	// --------------------- Next & Back --------------------------
	const [step, setStep] = useState(STEPS.CATEGORY)

	const onNext = useCallback(() => {
		setStep((pre) => (pre === STEPS.PRICE ? STEPS.PRICE : pre + 1))
	}, [])

	const onBack = useCallback(() => {
		// min: 0
		setStep((pre) => (pre === STEPS.CATEGORY ? STEPS.CATEGORY : pre - 1))
	}, [])

	const actionLabel = useMemo(() => {
		return step === STEPS.PRICE ? "Create" : "Next"
	}, [step])

	const secondaryActionLabel = useMemo(() => {
		return step === STEPS.CATEGORY ? undefined : "Back"
	}, [step])

	// --------------------- useForm --------------------------
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: ""
		}
	})

	// useForm：1）setValue：修改值  2）watch：监视值
	const setCustomValue = useCallback(
		(id: string, value: any) => {
			setValue(id, value, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true
			})
		},
		[setValue]
	)

	// handleClose
	const handleClose = useCallback(() => {
		rentModal.onClose()
		// 重置
		setStep(STEPS.CATEGORY)
		reset()
	}, [rentModal, reset])

	// --------------------- STEP 1 CATEGORY(DEFAULT) --------------------------
	const selectedCategory = watch("category")

	// 父组件传入函数，子组件调用传值
	const selectCategory = useCallback(
		(category: string) => {
			// console.log(category)
			setCustomValue("category", category)
		},
		[setCustomValue]
	)

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map((item) => (
					<div
						key={item.label}
						className="col-span-1"
					>
						<CategoryInput
							onClick={selectCategory}
							selected={selectedCategory == item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	)

	// --------------------- STEP 2 LOCATION --------------------------
	const selectedLocation = watch("location")

	const selectLocation = useCallback(
		(location: Country) => {
			setCustomValue("location", location)
		},
		[setCustomValue]
	)

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Help guests find you!"
				/>
				<CountrySelect
					value={selectedLocation}
					onChange={selectLocation}
				/>
				{/* 需要key传给Map，选择了不同位置需要重新加载Map组件 */}
				<Map
					center={selectedLocation?.latlng}
					key={selectedLocation?.latlng}
				/>
			</div>
		)
	}

	// --------------------- STEP 3 GUESTCOUNT ROOMCOUNT BATHROOMCOUNT --------------------------
	const selectedGuestCount = watch("guestCount")
	const selectedRoomCount = watch("roomCount")
	const selectedBathroomCount = watch("bathroomCount")

	const selectGuestCount = useCallback(
		(guestCount: number) => {
			setCustomValue("guestCount", guestCount)
		},
		[setCustomValue]
	)

	const selectRoomCount = useCallback(
		(roomCount: number) => {
			setCustomValue("roomCount", roomCount)
		},
		[setCustomValue]
	)
	const selectBathroomCount = useCallback(
		(bathroomCount: number) => {
			setCustomValue("bathroomCount", bathroomCount)
		},
		[setCustomValue]
	)
	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenitis do you have?"
				/>
				<Counter
					title="Guests"
					subtitle="How many guests do you allow?"
					value={selectedGuestCount}
					onChange={selectGuestCount}
				/>
				<hr />
				<Counter
					title="Rooms"
					subtitle="How many rooms do you have?"
					value={selectedRoomCount}
					onChange={selectRoomCount}
				/>
				<hr />
				<Counter
					title="Bathrooms"
					subtitle="How many bathrooms do you have?"
					value={selectedBathroomCount}
					onChange={selectBathroomCount}
				/>
			</div>
		)
	}

	// --------------------- STEP 4 INAGES --------------------------
	const selectedImageSrc = watch("imageSrc")
	const selectImageSrc = useCallback(
		(imageSrc: string) => {
			setCustomValue("imageSrc", imageSrc)
		},
		[setCustomValue]
	)

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add a photo of your place"
					subtitle="Show guests what your place looks like!"
				/>
				<ImageUpload
					value={selectedImageSrc}
					onChange={selectImageSrc}
				/>
			</div>
		)
	}

	// --------------------- STEP 5 DESCRIPTION PRICE --------------------------
	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="How would you describe your place?"
					subtitle="Short and sweet works best!"
				/>
				<Input
					id="title"
					label="Title"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="description"
					label="Description"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		)
	}

	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Now, set your price"
					subtitle="How much do you charge per night?"
				/>
				<Input
					id="price"
					label="Price"
					formatPrice
					type="number"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		)
	}

	// --------------------- FINAL SUBMIT --------------------------
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.PRICE) {
			return onNext()
		}

		setIsLoading(true)

		axios
			.post("/api/listings", data)
			.then(() => {
				toast.success("Listing Created!")
				router.refresh()
			})
			.catch((e) => {
				toast.error(e?.message)
			})
			.finally(() => {
				handleClose()
				setIsLoading(false)
			})
	}

	return (
		<Modal
			title="Airbnb your home!"
			isOpen={rentModal.isOpen}
			onClose={handleClose}
			actionLabel={actionLabel}
			onSubmit={handleSubmit(onSubmit)}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	)
}
