import prisma from "@/lib/prisma";

type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';

export async function updateAppointmentStatus(id: number, status: AppointmentStatus) {
  return prisma.appointment.update({
    where: { id },
    data: { status },
    include: {
      patient: true,
    },
  });
} 