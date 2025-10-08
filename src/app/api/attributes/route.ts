import prisma from "@/components/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const param = (new URL(req.url)).searchParams.get('attr')
  const id = (new URL(req.url)).searchParams.get('id')
  let data;

  if (!id) {
    data = await getAttrs(param)
  } else {
    data = [await getAttrById(param, +id)]
  }

  return NextResponse.json({ info: data ? 'OK' : 'Not Found', data }, { status: data ? 200 : 404 })
}

const getAttrs = async (param: string | null) => {
  let data = {}
  switch (param) {
    case 'role':
      data = await prisma.roles.findMany();
      break;

    case 'company':
      data = await prisma.companies.findMany();
      break;

    case 'status':
      data = await prisma.statuses.findMany();
      break;

    case 'all':
      data = {
        roles: await prisma.roles.findMany(),
        statuses: await prisma.statuses.findMany(),
        companies: await prisma.companies.findMany()
      };
      break;

    default:
      break
  }
  return data
}

const getAttrById = async (param: string | null, id: number) => {
  let data
  switch (param) {
    case 'role':
      data = await prisma.roles.findFirst({ where: { id } });
      break;

    case 'company':
      data = await prisma.companies.findFirst({ where: { id } });
      break;

    case 'status':
      data = await prisma.statuses.findFirst({ where: { id } });
      break;

    default:
      break
  }
  return data
}