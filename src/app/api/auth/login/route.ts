import { NextResponse } from 'next/server';
import { findUserByUsername } from "@/app/api/services/auth/login/find-user-by-username/find-user-by-username";
import { validatePassword } from "@/app/api/services/auth/login/validate-password/validate-password";
import { generateJwtToken } from "@/app/api/services/auth/login/generate-jwt-token/generate-jwt-token";
import { createFirstAdmin } from "@/app/api/services/auth/login/create-first-admin/createFirstAdmin";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userName, password } = await request.json();


    if (!userName || !password) {

      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }
    if (userName === 'adminAccount@gmail.com') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' }
      });

      if (adminCount === 0) {
        await createFirstAdmin();
      }
    }

    const user = await findUserByUsername(userName);
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Mismatching password" },
        { status: 400 }
      );
    }
    const token = await generateJwtToken(user.id);

    return NextResponse.json({
      message: "You have logged in!",
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


