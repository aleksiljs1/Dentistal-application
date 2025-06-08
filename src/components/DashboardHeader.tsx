'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/dashboard" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                DentCare
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/users"
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Users
              </Link>
              <Link
                href="/my-appointments"
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                My Appointments
              </Link>
              <Link
                href="/appointment-history"
                className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Appointment History
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Log Out
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu - you can use any icon library or SVG */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/dashboard"
            className="text-gray-500 hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/users"
            className="text-gray-500 hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium"
          >
            Users
          </Link>
          <Link
            href="/my-appointments"
            className="text-gray-500 hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium"
          >
            My Appointments
          </Link>
          <Link
            href="/appointment-history"
            className="text-gray-500 hover:bg-blue-50 hover:text-blue-600 block pl-3 pr-4 py-2 text-base font-medium"
          >
            Appointment History
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:bg-blue-50 hover:text-blue-600 block w-full text-left pl-3 pr-4 py-2 text-base font-medium"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
} 