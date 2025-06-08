import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('📝 Fetching users from database...');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('✅ Successfully fetched users:', users.length);
    return NextResponse.json({ users });
  } catch (error) {
    // Log the full error for debugging
    console.error('🔥 Error in users API:', error);
    
    // Return a generic error to the client
    return NextResponse.json(
      { error: 'Failed to fetch users. Please try again later.' },
      { status: 500 }
    );
  }
} 