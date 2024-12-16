import { CheckCircle } from 'lucide-react'

const steps = [
  "Download the HealthLeh app from your app store",
  "Create an account and set up your health profile",
  "Connect your wearable devices or manually input your data",
  "Receive personalized insights and recommendations",
  "Track your progress and achieve your health goals",
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start mb-6">
              <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

