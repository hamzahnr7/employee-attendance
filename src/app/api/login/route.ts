import prisma from '@/components/lib/prisma'
import { compare as TextCompare } from "bcrypt";
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  try {
    const findUser = await prisma.users.findUnique({ where: { email } })
    if (!findUser) {
      return NextResponse.json({ info: 'email and password is incorrect', data: {} }, { status: 400 })
    }
    if (await TextCompare(password, findUser?.secret)) {
      return NextResponse.json({ info: 'OK', data: { ...findUser } })
    }
    return NextResponse.json({ info: 'email and password is incorrect', data: {} }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ info: error, data: {} }, { status: 500 })

  }
}