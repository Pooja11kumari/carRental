import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const Cars = () => {

  // getting search params  form url
  const [searchParams]=useSearchParams()
  const pickupLocation=searchParams.get('pickupLocation')
  const pickupDate=searchParams.get('pickupDate')
  const returnDate=searchParams.get('returnDate')


  const {cars,axios}=useAppContext()


  const [input,setInput]=useState('')
  const isSearchData= pickupLocation && pickupDate && returnDate
  const [filteredCars,setFilteredCars]=useState([])

  const searchCarAvailability=()=>{
    // Filter cars by location if provided, otherwise show all
    let availableCars = cars
    if (pickupLocation) {
      availableCars = cars.filter(car => 
        car.location && car.location.toLowerCase().includes(pickupLocation.toLowerCase())
      )
    }
    
    setFilteredCars(availableCars)
    
    if(availableCars.length===0){
      toast.error('No cars available for the selected location')
    } else {
      toast.success(`Found ${availableCars.length} available cars`)
    }
  }
  
  useEffect(()=>{
   if (isSearchData) {
    searchCarAvailability()
   }
  },[isSearchData, pickupLocation, pickupDate, returnDate, cars])

  useEffect(()=>{
    if (!isSearchData) {
      setFilteredCars(cars)
    }
  },[cars, isSearchData])

  // Filter by search input
  const displayedCars = input 
    ? filteredCars.filter(car => 
        `${car.brand} ${car.model} ${car.category}`.toLowerCase().includes(input.toLowerCase())
      )
    : filteredCars

    return (
    <div>
      <div className='bg-light py-20'>
        <div className='max-md:px-4 px-6'>
          <Title title="Available cars" subtitle="Browse selection of cars available for your next adventure"/>

          <div className='mx-auto max-w-3xl w-full flex items-center bg-white px-4 mt-6 h-12 rounded-full shadow'>
            <img src={assets.search_icon } alt="" className='w-4.5 h-4.5 mr-2' />
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or feature'  className='w-full h-full outline-none text-gray-500'/>
            <img src={assets.filter_icon} alt="filter" className='w-4.5 h-4.5 ml-2  '  />
          </div>

          <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
            <p>
              Showing {displayedCars.length} cars</p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 max-w-7xl mx-auto'>
            {displayedCars.map((car,index)=>(
              <div key={car._id || car.id || index}>
                <CarCard car={car}/>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}

export default Cars
