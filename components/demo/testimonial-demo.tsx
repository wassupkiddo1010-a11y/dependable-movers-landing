import { Testimonial } from "@/components/ui/testimonial-card"

const testimonials = [
  {
    name: "Jenny A.",
    role: "Homeowner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    testimonial:
      "Working with United Global Vanline has been an absolute delight! They're an extremely professional and caring team—their friendly attitude kept me calm throughout the move. I highly recommend their services!",
  },
  {
    name: "Anne K.",
    role: "Homeowner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    testimonial:
      "United Global Vanline made it super easy to pack up my home and move across the state without any additional stress or worry. Loved working with them!",
  },
  {
    name: "Shayne E.",
    role: "Business Owner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    testimonial:
      "Our business needed to pack up some heavy equipment and move it safely across the city to our new office. We were really worried until we saw how helpful and professional the team at United Global Vanline is. I couldn't be happier with their services.",
  },
]

function TestimonialDemo() {
  return (
    <div className="container py-10">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Testimonial key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

export { TestimonialDemo }
