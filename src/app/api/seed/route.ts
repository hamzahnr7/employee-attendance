import prisma from "@/components/lib/prisma"
import { NextResponse } from "next/server"

const seedKey = process.env.SEEDING_KEY

const rolesData = [
  {
    name: 'admin',
    desc: 'Administrator'
  }, {
    name: 'staff',
    desc: 'Employee'
  }
]

const companiesData = [
  {
    name: 'neuron',
    desc: 'PT Neuronworks'
  }, {
    name: 'nordspec',
    desc: 'PT Nordspec'
  }
]

const statusesData = [
  {
    name: 'Request',
    type: 'user',
    desc: 'New User',
    color: 'blue'
  }, {
    name: 'Active',
    type: 'user',
    desc: 'Approved User',
    color: 'green'
  }, {
    name: 'Suspended',
    type: 'user',
    color: 'red',
    desc: 'Suspended User'
  }, {
    name: 'Present',
    color: 'green',
    type: 'attendance',
    desc: 'Present'
  }, {
    name: 'Sick',
    type: 'attendance',
    color: 'purple',
    desc: 'Sick Permission'
  }, {
    name: 'Leave',
    type: 'attendance',
    color: 'blue',
    desc: 'Day Off'
  }
]

export async function GET(req: Request) {
  const url = new URL(req.url)
  const key = url.searchParams.get('key')
  if (key === seedKey) {
    try {
      await prisma.roles.createMany({
        data: rolesData
      })
      await prisma.companies.createMany({
        data: companiesData
      })
      await prisma.statuses.createMany({
        data: statusesData
      })

    } catch (error) {
      return NextResponse.json({ info: 'seeding data failed', data: { msg: error } }, { status: 500 })
    }
  } else {
    return NextResponse.json({ info: 'key is uncorrect', data: { key } }, { status: 401 })
  }
  return NextResponse.json({ info: 'Seeding data successful', data: { key } }, { status: 200 })
}