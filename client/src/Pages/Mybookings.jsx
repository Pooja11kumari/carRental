import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import Title from '../components/Title'

const Mybookings = () => {

  const [bookings, setBookings] = useState([])

  const fetchMyBookings = async () => {
    setBookings(dummyMyBookingsData)
  }

  const currency = import.meta.env.VITE_CURRENCY || '$'

  useEffect(() => {
    fetchMyBookings()
  }, [])

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
      
      <Title
        title="My Bookings"
        subtitle="View and manage your all car bookings"
        align="left"
      />

      <div>
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border border-borderColor rounded-lg mt-5 first:mt-12 items-start"
          >
            {/* Column 1: Car Image + Details */}
            <div className="md:col-span-1 space-y-4">
              <div className="rounded-md overflow-hidden">
                <img
                  src={booking.car.image}
                  alt=""
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-medium">{booking.car.brand} {booking.car.model}</p>
                <p className="text-gray-500 text-sm mt-2">{booking.car.year} · {booking.car.category}</p>
              </div>
            </div>

            {/* Column 2: Booking info, status buttons, and rental/pickup details */}
            <div className="md:col-span-1 space-y-4">
              <div className='flex items-center gap-3'>
                <p className='px-3 py-2 rounded bg-gray-100 text-sm'>Booking #{index+1}</p>
                <p className={`px-3 py-2 text-sm rounded-full font-medium ${booking.status === 'confirmed' ? 'bg-green-500 text-white' : 'bg-red-400/15 text-red-600'}`}>{booking.status}</p>
              </div>

              <div className="space-y-4">
                <div className='flex items-start gap-2'>
                  <img src={assets.calendar_icon_colored} alt="" className='w-5 h-4 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className="text-gray-600 text-sm">Rental period</p>
                    <p className="font-medium">{booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}</p>
                  </div>
                </div>

                <div className='flex items-start gap-2'>
                  <img src={assets.location_icon_colored} alt="" className='w-5 h-4 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-gray-600 text-sm'>Pickup location</p>
                    <p className='font-medium'>{booking.car.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Price and booking date */}
            <div className='md:col-span-1 space-y-4'>
              <div>
                <p className='text-gray-500 text-sm'>Total Price</p>
                <h1 className='text-3xl font-bold text-primary'>{currency}{booking.price}</h1>
              </div>

              <div className='text-sm'>
                <p className='text-gray-500'>Booked on</p>
                <p className='font-medium'>{booking.createdAt.split('T')[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Mybookings
