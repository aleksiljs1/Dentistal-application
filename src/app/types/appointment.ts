import { Appointment as PrismaAppointment } from '@prisma/client';

export interface Appointment {
    id: number;
    patient: {
        firstName: string;
        lastName: string;
        email: string;
    };
    date: string;
    problem: string;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
}

export interface AppointmentWithPatient extends Omit<PrismaAppointment, 'date'> {
    patient: {
        firstName: string;
        lastName: string;
        email: string;
    };
    staff?: {
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    };
    date: string;
}