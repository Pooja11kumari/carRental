import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import * as assets from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddCar = () => {
  const {axios , currency, fetchCars}=useAppContext()

  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // subtle fade-in
    const t = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(t)
  }, [])

  // reusable input component
  const Input = ({ label, icon, error, children, className = '', ...props }) => (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        {children ? (
          children
        ) : (
          <input
            {...props}
            className={`w-full pl-${icon ? '10' : '3'} pr-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200`}
          />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )

  const validate = () => {
    const e = {}
    if (!car.brand.trim()) e.brand = 'Brand is required'
    if (!car.model.trim()) e.model = 'Model is required'
    if (!car.year || Number(car.year) <= 1885) e.year = 'Enter a valid year'
    if (!car.pricePerDay || Number(car.pricePerDay) <= 0) e.pricePerDay = 'Enter a valid daily price'
    if (!car.category) e.category = 'Select a category'
    if (!car.transmission) e.transmission = 'Select transmission'
    if (!car.fuel_type) e.fuel_type = 'Select fuel type'
    if (!car.seating_capacity || Number(car.seating_capacity) <= 0) e.seating_capacity = 'Enter seating capacity'
    if (!car.location.trim()) e.location = 'Location is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setLoading(true)
    try {
      // Get logged in user
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}')
      if (!loggedUser.email) {
        toast.error('Please login first')
        return
      }

      // Prepare car data
      const newCar = {
        id: Date.now(),
        ...car,
        image: image ? URL.createObjectURL(image) : null,
        owner: loggedUser.email,
        createdAt: new Date().toISOString(),
      }

      // Get existing cars from localStorage
      const existingCars = JSON.parse(localStorage.getItem('cars') || '[]')
      
      // Add new car
      existingCars.push(newCar)
      localStorage.setItem('cars', JSON.stringify(existingCars))

      // Refresh cars in context
      fetchCars()

      toast.success('Car listed successfully!')
      
      // Reset form
      setCar({
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        category: '',
        transmission: '',
        fuel_type: '',
        seating_capacity: '',
        location: '',
        description: '',
      })
      setImage(null)

      // Navigate to manage cars
      setTimeout(() => {
        navigate('/owner/manage-cars')
      }, 1000)
    } catch (error) {
      toast.error(error.message || 'Failed to add car')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen py-10 px-4 md:px-10 font-sans bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-[900px] mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Add New Car</h1>
            <p className="mt-1 text-sm text-gray-500">List a car for renters — provide accurate details to attract bookings.</p>
            <p className="mt-2 text-xs text-gray-400">Tip: Add clear photos and precise specs for better conversions.</p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Car Image</label>
              <div
                onClick={() => document.getElementById('car-image-input')?.click()}
                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow duration-150"
                style={{ minHeight: 120 }}
              >
                <input id="car-image-input" type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files?.[0] || null)} />
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="preview" className="max-h-36 object-contain rounded" />
                ) : (
                  <div className="text-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16v-4a4 4 0 014-4h2a4 4 0 014 4v4M12 12v6m-3-3h6" />
                    </svg>
                    <p className="mt-2 text-sm">Click to upload or drag & drop</p>
                    <p className="mt-1 text-xs text-gray-400">Supported: JPG, PNG. Max size: 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Brand / Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Brand"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2V7"/></svg>}
                error={errors.brand}
              >
                <input
                  type="text"
                  placeholder="e.g. BMW, Audi"
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </Input>

              <Input
                label="Model"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6"/></svg>}
                error={errors.model}
              >
                <input
                  type="text"
                  placeholder="e.g. X-5"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </Input>
            </div>

            {/* Year | Price | Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Year" error={errors.year}>
                <input
                  type="number"
                  placeholder="e.g. 2022"
                  value={car.year}
                  onChange={(e) => setCar({ ...car, year: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </Input>

              <Input label="Daily Price (USD)" error={errors.pricePerDay}>
                <input
                  type="number"
                  placeholder="e.g. 120"
                  value={car.pricePerDay}
                  onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </Input>

              <Input label="Category" error={errors.category}>
                <select
                  value={car.category}
                  onChange={(e) => setCar({ ...car, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select</option>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Coupe</option>
                  <option>Hatchback</option>
                  <option>Van</option>
                </select>
              </Input>
            </div>

            {/* Transmission | Fuel | Seating */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Transmission" error={errors.transmission}>
                <select
                  value={car.transmission}
                  onChange={(e) => setCar({ ...car, transmission: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </Input>

              <Input label="Fuel Type" error={errors.fuel_type}>
                <select
                  value={car.fuel_type}
                  onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </Input>

              <Input label="Seating Capacity" error={errors.seating_capacity}>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={car.seating_capacity}
                  onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </Input>
            </div>

            {/* Location */}
            <div>
              <Input label="Location" error={errors.location}>
                <input
                  type="text"
                  placeholder="City, state or address"
                  value={car.location}
                  onChange={(e) => setCar({ ...car, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </Input>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
              <textarea
                placeholder="Add details about the car, features, rules, etc."
                value={car.description}
                onChange={(e) => setCar({ ...car, description: e.target.value })}
                className="w-full px-3 py-3 border border-gray-200 rounded-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                rows={4}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-150 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding Car...' : 'List Your Car'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCar