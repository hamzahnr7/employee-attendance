import prisma from '@/components/lib/prisma';
import { Users } from '@/generated/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, name, secret, roleId, companyId }:
    { email?: string, name?: string, secret?: string, roleId?: number, companyId?: number } = await request.json()

  if (!email || !name || !secret) {
    return NextResponse.json({ info: 'Email and Password are Required', data: {} }, { status: 400 })
  }

  try {
    const hashedPass = await bcrypt.hash(secret, 10);
    await prisma.users.create({
      data: {
        email,
        name,
        role: { connect: { id: roleId } },
        company: { connect: { id: companyId } },
        status: { connect: { id: 1 } },
        secret: hashedPass
      },
    });
    return NextResponse.json({ info: 'Success Create User', data: { name } }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ info: 'Something went wrong.' }, { status: 500 })
  }
}

export async function GET(request: Request): Promise<NextResponse<{ info: string, data?: Users[] | object }>> {
  const url = new URL(request.url)
  const userId = url.searchParams.get('userId')
  const companyId = url.searchParams.get('companyId')

  try {
    let user
    if (userId) {
      user = await prisma.users.findUnique({ where: { id: userId }, include: { status: true } })
      return NextResponse.json({ info: 'OK', data: { user } }, { status: 200 })
    }
    if (companyId) {
      user = await prisma.users.findMany({ where: { companyId: Number(companyId) }, include: { status: true } })
      return NextResponse.json({ info: 'OK', data: { user } }, { status: 200 })
    }
    user = await prisma.users.findMany({ include: { status: true } })
    return NextResponse.json({ info: 'OK', data: { user } }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ info: 'Something went wrong.' }, { status: 500 })
  }
}



export async function PATCH(request: Request) {
  const url = new URL(request.url)
  const reqData: Users | { id: string, statusId: number | null | string, rolesId: number | null | string } = {
    id: String(url.searchParams.get('id')),
    statusId: Number(url.searchParams.get('statusId')),
    rolesId: Number(url.searchParams.get('rolesId')),
    name: url.searchParams.get('name'),
  }

  try {
    const userData = { id: reqData.id }
    for (const key in reqData) {
      const validKey = key as keyof object;
      if (reqData[validKey]) {
        userData[validKey] = reqData[validKey]
      }
    }
    console.log(userData)
    await prisma.users.update({ where: { id: userData.id }, data: { ...userData } })
    return NextResponse.json({ info: 'OK', data: {} }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ info: 'Something went wrong.' }, { status: 500 })
  }
}

// export async function DELETE(request: Request) { }
