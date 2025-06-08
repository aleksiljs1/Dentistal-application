import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';
import { headers } from 'next/headers';

interface RequestParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, { params }: RequestParams) {
  try {
    const { role } = await request.json();
    const targetUserId = parseInt(params.id);

    // Get current user from token (for self-modification check)
    const headersList = await headers();
    const token = headersList.get('authorization')?.split(' ')[1];
    const decodedToken = await verifyAuth(token!);
    
    // Prevent self-role modification
    if (decodedToken.id === targetUserId) {
      return NextResponse.json(
        { error: 'Cannot modify your own role' },
        { status: 403 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error in update user API:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
} 