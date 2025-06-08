'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/axios';
import type { AppointmentWithPatient } from '@/app/types/appointment';
import { useAuth } from '@/hooks/useAuth';

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState<AppointmentWithPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'CANCELLED'>('ALL');
  const { user } = useAuth();

  const fetchAppointments = async () => {
    try {
      const response = await api.get<{ appointments?: AppointmentWithPatient[] }>('/api/appointments');
      const appointmentsData = response.data.appointments || response.data;
      
      if (Array.isArray(appointmentsData)) {
        // Sort appointments by date in descending order (most recent first)
        const sortedAppointments = appointmentsData
          .filter(apt => apt.status === 'COMPLETED' || apt.status === 'CANCELLED')
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setAppointments(sortedAppointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'ALL') return true;
    return apt.status === filter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Appointment History</h1>
            <p className="mt-2 text-sm text-gray-700">
              View past appointments and their outcomes
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
            >
              <option value="ALL">All Past Appointments</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-2 text-gray-600">Loading appointment history...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No past appointments found.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <li key={appointment.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {appointment.patient.firstName} {appointment.patient.lastName}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'COMPLETED' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {appointment.staff && (
                        <div className="text-sm text-gray-500">
                          Handled by: {appointment.staff.firstName} {appointment.staff.lastName}
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6">
                            <p className="text-sm text-gray-500">Problem</p>
                            <p className="mt-1 text-sm text-gray-900">{appointment.problem}</p>
                          </div>
                          {appointment.notes && (
                            <div>
                              <p className="text-sm text-gray-500">Notes</p>
                              <p className="mt-1 text-sm text-gray-900">{appointment.notes}</p>
                            </div>
                          )}
                        </div>
                        {appointment.followUpNeeded && (
                          <div className="mt-2 sm:mt-0">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Follow-up needed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 