import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/dentist-team-posing.jpg"
            alt="Our professional dental team"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your Smile, Our Passion
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Experience exceptional dental care with our team of experienced professionals in a modern, comfortable environment.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/book-appointment"
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
                >
                  Book Appointment
                </Link>
                <Link
                  href="#services"
                  className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/images/girl-with-white-teeth.jpg"
                alt="Beautiful smile transformation"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive dental care for you and your family</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🦷",
                title: "General Checkup",
                description: "Comprehensive dental examination and cleaning",
                image: "/images/dental-checkup.jpg"
              },
              {
                icon: "✨",
                title: "Teeth Whitening",
                description: "Professional whitening for a brighter smile",
                image: "/images/whitest-teeth.jpg "
              },
              {
                icon: "🏥",
                title: "Dental Surgery",
                description: "Expert surgical procedures and treatments",
                image: "/images/dentist-operating.jpg"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px]">
              <Image
                src="/images/dentist-team-posing.jpg"
                alt="Our professional dental team"
                fill
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Us?</h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Expert Team",
                    description: "Our experienced dentists and staff are committed to your oral health"
                  },
                  {
                    title: "Modern Technology",
                    description: "State-of-the-art equipment for precise and comfortable treatments"
                  },
                  {
                    title: "Comfortable Environment",
                    description: "Relaxing atmosphere designed for your comfort and peace of mind"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-12 bg-blue-600 text-white">
                <h2 className="text-3xl font-bold mb-6">Visit Our Clinic</h2>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    123 Dental Street, Tirana, Albania
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    +355 69 123 4567
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-2xl">⏰</span>
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                </div>
                <div className="mt-8 relative h-[300px]">
                  <Image
                    src="/images/dentist-h5-client.jpg"
                    alt="Happy dental patient"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="p-12">
                <h2 className="text-3xl font-bold mb-6">Book an Appointment</h2>
                <p className="text-gray-600 mb-8">
                  Ready to schedule your visit? Fill out our online form or give us a call.
                </p>
                <Link
                  href="/book-appointment"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Schedule Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DentCare</h3>
              <p className="text-gray-400">
                Your trusted partner in dental health and beautiful smiles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/services" className="hover:text-white">Services</Link></li>
                <li><Link href="/book-appointment" className="hover:text-white">Book Appointment</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📱</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📸</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">🐦</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DentCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
