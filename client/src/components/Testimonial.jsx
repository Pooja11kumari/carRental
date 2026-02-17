import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const Testimonial = () => {

  const testimonials = [
    { 
      name: "Emma Rodriguez", 
      location: "England",
      image: assets.testimonial_image_1,
      rating: 5,
      review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!"
    },
    { 
      name: "Liam Johnson",
      location: "New York, USA", 
      image: assets.testimonial_image_2,
      rating: 4,
      review: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!"
    },
    { 
      name: "Sophia Lee",
      location: "Seoul, South Korea",
      image: assets.testimonial_image_3,
      rating: 5,
      review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results."
    }
  ]

  return (
    <div>
      <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
        <Title
          title="What Our Customers Say"
          subtitle="Disvover why discering travelers choose StayVenture for their luxury accommodations around the world."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="text-xl">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-4">
                {Array(5).fill(0).map((_, index) => (
                  <img
                    key={index}
                    src={assets.star_icon}
                    alt="star-icon"
                  />
                ))}
              </div>

              <p className="text-gray-500 mt-4 font-light">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonial
