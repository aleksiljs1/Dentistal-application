import prisma from "@/lib/prisma";

interface CreateAppointmentData {
  firstName: string;
  lastName: string;
  email: string;
  problemDesc: string;
  scheduledDate: string;
}

export async function createAppointment(data: CreateAppointmentData) {
  const { firstName, lastName, email, problemDesc, scheduledDate } = data;


  const patient = await prisma.patient.create({
    data: {
      firstName,
      lastName,
      email,
    },
  });


  return prisma.appointment.create({
    data: {
      patientId: patient.id,
      date: new Date(scheduledDate),
      problem: problemDesc,
      status: 'PENDING',
    },
    include: {
      patient: true,
    },
  });
} 