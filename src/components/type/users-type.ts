import { Prisma } from "@/generated/prisma";

const userWithStatus = Prisma.validator<Prisma.UsersDefaultArgs>()({
  include: { status: true },
});
export type Users = Prisma.UsersGetPayload<typeof userWithStatus>;