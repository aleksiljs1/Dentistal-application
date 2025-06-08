'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function BookingSuccess() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Appointment Request Received!
          </h1>

          <div className="text-gray-600 space-y-4">
            <p className="text-lg">
              Thank you for choosing DentCare. Your appointment request has been successfully submitted and is currently <span className="font-semibold text-blue-600">pending confirmation</span>.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">What happens next?</h2>
              <ul className="text-left space-y-3 text-blue-800">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  Our team will review your request within the next few hours.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  You will receive an email confirmation with the final appointment details.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  If any adjustments are needed, we will contact you at the email address provided.
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-6">
                Have questions? Feel free to contact us at <a href="tel:+123456789" className="text-blue-600 hover:underline">+123 456 789</a>
              </p>
              
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 