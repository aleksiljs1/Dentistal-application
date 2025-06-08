'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from './DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    ...(user?.role === 'DENTIST' ? [
      { name: 'My Appointments', href: '/my-appointments' }
    ] : []),
    { name: 'Appointments', href: '/appointments' },
    { name: 'Appointment History', href: '/appointment-history' },
    { name: 'Patients', href: '/patients' },
    ...(user?.role === 'ADMIN' ? [
      { name: 'Staff', href: '/staff' }
    ] : [])
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('🔒 DashboardLayout - Checking auth token:', !!token);
    
    if (!token) {
      console.log('❌ No token found, redirecting to login');
      router.push('/login');
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        {/* Navigation Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen fixed">
          <nav className="mt-5 px-2">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 