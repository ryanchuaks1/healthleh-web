import Image from 'next/image'

const testimonials = [
  {
    name: "Sarah L.",
    role: "Fitness Enthusiast",
    content: "HealthLeh has completely transformed my approach to fitness. The personalized insights are incredibly helpful!",
    avatar: "https://picsum.photos/100/100",
  },
  {
    name: "Michael R.",
    role: "Busy Professional",
    content: "As someone with a hectic schedule, HealthLeh makes it easy to stay on top of my health goals. Highly recommended!",
    avatar: "https://picsum.photos/100/100",
  },
  {
    name: "Emily T.",
    role: "Nutrition Coach",
    content: "I recommend HealthLeh to all my clients. It's an excellent tool for tracking nutrition and overall wellness.",
    avatar: "https://picsum.photos/100/100",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

