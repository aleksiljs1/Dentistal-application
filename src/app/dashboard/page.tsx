'use client';

import {useEffect, useState} from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {api} from '@/lib/axios';
import {getDateOnly} from "@/utils/date-only";
import type { AppointmentWithPatient } from '@/app/types/appointment';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const [appointments, setAppointments] = useState<AppointmentWithPatient[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<AppointmentWithPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Filter appointments based on user role
  const filteredAppointments = user?.role === 'DENTIST' 
    ? appointments.filter(apt => !apt.staffId || apt.staffId === user.id)
    : appointments;

  const fetchAppointments = async () => {
    try {
      const response = await api.get<{ appointments?: AppointmentWithPatient[] }>('/api/appointments');
      console.log('API Response:', response);
      console.log('Response Data:', response.data);
      
      const appointmentsData = response.data.appointments || response.data;
      
      if (Array.isArray(appointmentsData)) {
        setAppointments(appointmentsData);
        getTodayAppointments(appointmentsData);
      } else {
        console.error('Expected array of appointments but got:', response.data);
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getTodayAppointments = (appointments: AppointmentWithPatient[]) => {
    const todayString = getDateOnly(new Date().toISOString());
    setTodayAppointments(appointments.filter((appointment) => getDateOnly(appointment.date) === todayString));
  }

  const updateAppointmentStatus = async (id: number, newStatus: AppointmentWithPatient['status']) => {
    try {
      // Check if user has permission to update to this status
      if ((newStatus === 'CONFIRMED' || newStatus === 'COMPLETED') && 
          user?.role !== 'ADMIN' && user?.role !== 'DENTIST') {
        toast.error('Only admins and dentists can confirm or complete appointments');
        return;
      }

      await api.patch(`/api/appointments/${id}`, { status: newStatus });
      await fetchAppointments();
      toast.success('Appointment status updated successfully');
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment status');
    }
  };

  const getStatusColor = (status: AppointmentWithPatient['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'RESCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingRequests = Array.isArray(appointments) ? appointments.filter(apt => 
    apt.status === 'PENDING'
  ) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-blue-900">Today's Appointments</h2>
            <p className="mt-2 text-3xl font-bold text-blue-600">{todayAppointments.length}</p>
            <p className="mt-1 text-sm text-blue-500">{new Date().toString()}</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-green-900">All Completed</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">{appointments.filter(apt => apt.status === 'COMPLETED').length}</p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-emerald-900">Completed Today</h2>
            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {todayAppointments.filter(x => x.status === "COMPLETED").length}
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-yellow-900">Confirmed</h2>
            <p className="mt-2 text-3xl font-bold text-yellow-600">{appointments.filter(apt => apt.status === 'CONFIRMED').length}</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-purple-900">Pending Requests</h2>
            <p className="mt-2 text-3xl font-bold text-purple-600">{pendingRequests.length}</p>
          </div>
        </div>

        {/* Dentist's Appointments Section */}
        {user?.role === 'DENTIST' && (
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">My Appointments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Problem
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patient.firstName} {appointment.patient.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.patient.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {appointment.problem}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {appointment.staffId ? (
                          <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={appointment.status}
                            onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value as AppointmentWithPatient['status'])}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="RESCHEDULED">Rescheduled</option>
                          </select>
                        ) : user?.role === 'DENTIST' ? (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Take Appointment
                          </button>
                        ) : (
                          <span className="text-gray-500">Unassigned</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* All Appointments Table (visible to admin and staff) */}
        {user?.role !== 'DENTIST' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Appointments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Problem
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patient.firstName} {appointment.patient.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.patient.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {appointment.problem}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.staff ? `${appointment.staff.firstName} ${appointment.staff.lastName}` : 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {appointment.staffId ? (
                          <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={appointment.status}
                            onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value as AppointmentWithPatient['status'])}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="RESCHEDULED">Rescheduled</option>
                          </select>
                        ) : user?.role === 'DENTIST' ? (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Take Appointment
                          </button>
                        ) : (
                          <span className="text-gray-500">Unassigned</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 