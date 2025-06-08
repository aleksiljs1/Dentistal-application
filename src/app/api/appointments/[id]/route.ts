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
    const { status, notes, followUpNeeded } = await request.json();
    const appointmentId = parseInt(params.id);

    // Get current user from token
    const headersList = await headers();
    const token = headersList.get('authorization')?.split(' ')[1];
    const decodedToken = await verifyAuth(token!);

    // Get user with role
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: { role: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check permissions for CONFIRMED and COMPLETED statuses
    if ((status === 'CONFIRMED' || status === 'COMPLETED') && 
        user.role !== 'ADMIN' && user.role !== 'DENTIST') {
      return NextResponse.json(
        { error: 'Only admins and dentists can confirm or complete appointments' },
        { status: 403 }
      );
    }

    // Get the current appointment to check its state
    const currentAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: { staffId: true, status: true }
    });

    if (!currentAppointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // If a dentist is taking the appointment (changing from unassigned to CONFIRMED)
    const isDentistTakingAppointment = user.role === 'DENTIST' && 
                                     !currentAppointment.staffId && 
                                     status === 'CONFIRMED';

    // If the appointment is already assigned to a different dentist
    if (currentAppointment.staffId && 
        currentAppointment.staffId !== decodedToken.id && 
        user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'This appointment is already assigned to another dentist' },
        { status: 403 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    if (status) {
      updateData.status = status;
    }
    
    if (notes !== undefined) {
      updateData.notes = notes;
    }
    
    if (followUpNeeded !== undefined) {
      updateData.followUpNeeded = followUpNeeded;
    }
    
    if (isDentistTakingAppointment) {
      updateData.staffId = decodedToken.id;
    }

    // Update appointment
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          }
        },
        staff: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          }
        }
      }
    });

    return NextResponse.json({ appointment: updatedAppointment });
  } catch (error) {
    console.error('Error in update appointment API:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
} 