import { Users } from "@/components/type/users-type"
import { Companies, Roles, Statuses } from "@/generated/prisma"

const url = process.env.NEXT_PUBLIC_URL + '/api'

export interface GetAttrRes {
  info: string,
  data: Companies[] & Roles[] & Statuses[]
}

export const getAttr = async (attr: string, id?: number): Promise<GetAttrRes> => {
  const urlAttr = new URL(url + '/attributes')
  urlAttr.searchParams.set('attr', attr)
  if (id) {
    urlAttr.searchParams.set('id', `${id}`)
  }
  return await (await fetch(urlAttr)).json()
}

export const reqDataUser = async (userId?: string, companyId?: number): Promise<{ info: string, data: { user: Users[] } }> => {
  let res;
  if (userId) {
    res = await (await fetch('/api/user?userId=' + userId)).json();
  } else if (companyId) {
    res = await (await fetch('/api/user?companyId=' + companyId)).json()
  } else {
    res = await (await fetch('/api/user')).json();
  }
  return res
};