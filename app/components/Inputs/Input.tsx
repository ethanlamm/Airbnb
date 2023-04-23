"use client"

import React, { useEffect, useState } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"

interface InputProps {
	id: string
	label: string
	type?: string
	disabled?: boolean
	formatPrice?: boolean
	required?: boolean
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
}

export default function Input({
	id,
	label,
	type = "text",
	disabled,
	formatPrice,
	required,
	register,
	errors
}: InputProps) {
	return (
		<div className="w-full relative">
			{formatPrice && (
				<BiDollar
					size={24}
					className="absolute text-neutral-700 top-5 left-2"
				/>
			)}
			<input
				id={id}
				disabled={disabled}
				{...register(id, {
					required: {
						value: required as boolean,
						message: `${label} is required`
					},
					validate: (value) => {
						if (id == "email" && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
							return "Invalid email address"
						} else if (id == "password") {
							if (value.length <= 5 || value.length >= 19) {
								return "Password length is between 6 to 18"
							}
						}
					}
				})}
				placeholder=" "
				type={type}
				className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                    ${formatPrice ? "pl-9" : "pl-4"} 
                    ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-black"}`}
			/>
			<label
				className={`absolute text-md transform duration-150 top-5 z-10 origin-[0] -translate-y-4
				peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
				peer-focus:scale-75 peer-focus:-translate-y-4
				${formatPrice ? "left-9" : "left-4"}
        		${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
			>
				{label}
			</label>
			{errors && errors[id] && errors[id]?.message && <div className="pl-3">{errors[id]?.message as string}</div>}
		</div>
	)
}
