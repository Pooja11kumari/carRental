import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <section className="px-4 md:px-0 mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-auto rounded-2xl overflow-hidden px-8 md:px-12 py-10">
        
        {/* Left content */}
        <div className="text-white max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Do You Own a Luxury Car?
          </h2>

          <p className="mt-3 text-sm md:text-base">
            Monetize your vehicle effortlessly by listing it on CarRental.
          </p>

          <p className="mt-2 text-sm md:text-base opacity-90">
            We take care of insurance, driver verification and secure payments —
            so you can earn passive income, stress-free.
          </p>

          <button className="mt-5 px-6 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition">
            List your car
          </button>
        </div>

        {/* Right image */}
        <img
          src={assets.banner_car_image}
          alt="Luxury car"
          className="mt-8 md:mt-0 max-h-56 md:max-h-64 object-contain"
        />
      </div>
    </section>
  )
}

export default Banner
