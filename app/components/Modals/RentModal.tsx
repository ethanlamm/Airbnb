"use client"

import React, { useCallback, useMemo, useState } from "react"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRenModal"
import Heading from "../Heading"
import { categories } from "../Navbar/Categories"
import { FieldValues, useForm } from "react-hook-form"
import type { Country } from "@/app/types"
import CategoryInput from "../Inputs/CategoryInput"
import CountrySelect from "../Inputs/CountrySelect"
import Map from "../Map"

enum STEPS {
	CATEGORY,
	LOCATION,
	INFO,
	IMAGES,
	DESCRIPTION,
	PRICE
}

export default function RentModal() {
	const rentModal = useRentModal()

	const handleClose = useCallback(() => {
		rentModal.onClose()
		// 重置
		setStep(STEPS.CATEGORY)
		reset()
	}, [])

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
	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true
		})
	}

	// --------------------- STEP 1 CATEGORY(DEFAULT) --------------------------
	const selectedCategory = watch("category")

	// 父组件传入函数，子组件调用传值
	const selectCategory = useCallback((category: string) => {
		// console.log(category)
		setCustomValue("category", category)
	}, [])

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

	const selectLocation = useCallback((location: Country) => {
		setCustomValue("location", location)
	}, [])

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

	return (
		<Modal
			title="Airbnb your home!"
			isOpen={rentModal.isOpen}
			onClose={handleClose}
			actionLabel={actionLabel}
			onSubmit={onNext}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			body={bodyContent}
		/>
	)
}
