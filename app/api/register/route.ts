import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"

import { NextResponse } from "next/server"

// 注册 POST
export async function POST(request: Request) {
	// 拿到用户提交的信息
	const { email, name, password } = await request.json()

	// 密码加密
	const hashedPassword = await bcrypt.hash(password, 12)

	// 创建用户，写入数据库
	const user = await prisma.user.create({
		data: { email, name, hashedPassword }
	})

	// 返回数据
	return NextResponse.json(user)
}
