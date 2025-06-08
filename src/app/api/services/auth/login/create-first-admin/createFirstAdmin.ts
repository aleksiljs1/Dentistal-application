import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createFirstAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  return prisma.user.create({
    data: {
      email: "adminAccount@gmail.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  });
}
