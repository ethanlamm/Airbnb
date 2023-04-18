"use client"

import React, { useState, useCallback } from "react"
import axios from "axios"
// https://react-hook-form.com/get-started/
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../Inputs/Input"
import Button from "../Button"
import { toast } from "react-hot-toast"
import { signIn } from "next-auth/react"

export default function RegisterModal() {
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			name: "",
			password: ""
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)

		axios
			.post("/api/register", data)
			.then(() => {
				toast.success("Successfully registered \nPlease login first", { duration: 4000 })
				handleClose()
				setTimeout(() => {
					loginModal.onOpen()
				}, 1000)
			})
			.catch((e) => {
				toast.error(e.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const handleClose = useCallback(() => {
		registerModal.onClose()
		// 每次关闭都要重置Form
		reset()
	}, [])

	// switchTo LoginModal
	const goToLogin = useCallback(() => {
		handleClose()
		loginModal.onOpen()
	}, [handleClose])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to Airbnb"
				subtitle="Create an account!"
			/>
			<Input
				id="email"
				label="Email"
				type="email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Google"
				Icon={FcGoogle}
				onClick={() => {}}
			/>
			<Button
				outline
				label="Continue with Github"
				Icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row justify-center items-center gap-2">
					<div>Already have an account?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={goToLogin}
					>
						Login
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={handleClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}
