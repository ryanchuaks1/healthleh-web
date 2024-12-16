import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Heart, Utensils, Brain } from 'lucide-react'

const features = [
  {
    title: "Track Your Activity",
    description: "Monitor your daily steps, workouts, and calories burned.",
    icon: Activity,
  },
  {
    title: "Heart Health",
    description: "Keep an eye on your heart rate and blood pressure trends.",
    icon: Heart,
  },
  {
    title: "Nutrition Guidance",
    description: "Get personalized meal plans and track your nutrient intake.",
    icon: Utensils,
  },
  {
    title: "Mental Wellness",
    description: "Practice mindfulness and track your mood and stress levels.",
    icon: Brain,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">App Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

