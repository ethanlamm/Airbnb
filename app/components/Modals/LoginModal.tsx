"use client"

import React, { useState, useCallback } from "react"
import axios from "axios"
// https://react-hook-form.com/get-started/
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import useLoginModal from "@/app/hooks/useLoginModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../Inputs/Input"
import Button from "../Button"
import { toast } from "react-hot-toast"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginModal() {
	/**
	 * https://github.com/vercel/next.js/issues/43251
	 * Use "next/navigation" and do not "next/router" in app folder or it will cause Error!
	 */
	const router = useRouter()

	const loginModal = useLoginModal()
	const registerModal = useRegisterModal()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true)

		// 登录
		signIn("credentials", { ...data, redirect: false }).then((callback) => {
			setIsLoading(false)

			if (callback?.error) {
				toast.error(callback.error)
			}

			if (callback?.ok) {
				toast.success("Logged in!")
				router.refresh()
				handleClose()
			}
		})
	}

	const handleClose = useCallback(() => {
		loginModal.onClose()
		// 每次关闭都要重置Form
		reset()
	}, [])

	// switch to RegisterModal
	const goToRegister = useCallback(() => {
		handleClose()
		registerModal.onOpen()
	}, [handleClose])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome back"
				subtitle="Login to your account!"
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
				onClick={() => {}}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row justify-center items-center gap-2">
					<div>Don't have an account?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={goToRegister}
					>
						Register
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={handleClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}
