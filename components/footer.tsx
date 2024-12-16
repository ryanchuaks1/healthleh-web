import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="text-2xl font-bold">
            HealthLeh
          </Link>
          <p className="mt-2 text-sm">Your personal health companion</p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
          <Link href="#" className="text-sm hover:text-gray-300">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:text-gray-300">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:text-gray-300">
            Contact Us
          </Link>
        </nav>
      </div>
      <div className="container mx-auto mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} HealthLeh. All rights reserved.</p>
      </div>
    </footer>
  )
}

