import { NextResponse } from 'next/server';
import { getAllAppointments } from '@/app/api/services/appointments/get-all-appointments/get-all-appointments';
import { createAppointment } from '@/app/api/services/appointments/create-appointment/create-appointment';

export async function GET() {
  try {
    const appointments = await getAllAppointments();
    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await createAppointment(body);

    return NextResponse.json({ 
      success: true,
      message: 'Appointment created successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
} 