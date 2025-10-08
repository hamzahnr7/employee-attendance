import prisma from "@/components/lib/prisma"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  const { date, time, lat, lng, userId, status, desc } = await req.json()
  try {
    const attd = await prisma.attendaces.create({
      data: {
        date, time, lat, lng, userId, status, desc
      }
    })
    return NextResponse.json({ info: 'OK', data: { id: attd.id, userId: attd.usersId } })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ info: 'Error insert data', data: {} }, { status: 500 })
  }
}