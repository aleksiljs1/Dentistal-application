import prisma from "@/lib/prisma";

export async function findUserByUsername(userName: string) {
  console.log('🔍 Searching for user with email:', userName);
  try {
    const user = await prisma.user.findUnique({
      where: { email: userName },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
      }
    });
    console.log('👤 User found?', !!user);
    return user;
  } catch (error) {
    console.error('🔥 Error finding user:', error);
    throw error;
  }
}

