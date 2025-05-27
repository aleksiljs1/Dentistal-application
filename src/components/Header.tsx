import Link from "next/link";

export default function Header() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">DentCare</h1>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            <Link 
              href="/about"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              About Us
            </Link>
            <Link 
              href="/services"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Services
            </Link>
            <Link 
              href="/contact"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Contact
            </Link>
            <Link 
              href="/login"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Staff Login
            </Link>
          </div>
          <Link 
            href="/book-appointment"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
} 