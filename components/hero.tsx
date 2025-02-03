import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Apple, Download } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Personal Health Companion
          </h1>
          <p className="text-xl mb-8">
            HealthLeh helps you track, manage, and improve your health with ease.
          </p>
          <div className="flex space-x-4">
            <Button disabled size="lg" className="bg-white text-blue-500 hover:bg-gray-100">
              Coming Soon <Apple size={24} className="inline-block ml-2" />
            </Button>
            <Button size="lg" className="bg-white text-blue-500 hover:bg-gray-100">
              Android <Download size={24} className="inline-block ml-2" />
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <Image
            src="/run.png"
            alt="HealthLeh App Screenshot"
            width={400}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

