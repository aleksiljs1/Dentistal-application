import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
      },
      orderBy: {
        scheduledDate: 'asc',
      },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, problemDesc, scheduledDate } = body;

    // Create patient
    const patient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        scheduledDate: new Date(scheduledDate),
        problemDesc,
        status: 'PENDING',
      },
      include: {
        patient: true,
      },
    });

    return NextResponse.json({ 
      success: true, 
      appointment,
      message: 'Appointment created successfully' 
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
} 