import prisma from "@/lib/prisma";

export async function getAllAppointments() {
  return prisma.appointment.findMany({
    include: {
      patient: true,
    },
    orderBy: {
      date: 'asc',
    },
  });
} 