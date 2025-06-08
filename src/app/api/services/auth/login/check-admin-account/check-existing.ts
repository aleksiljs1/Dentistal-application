import prisma from "@/lib/prisma";

export class CheckAdminUser {
  async checkUserExist(): Promise<boolean> {
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });
    return adminCount > 0;
  }
}