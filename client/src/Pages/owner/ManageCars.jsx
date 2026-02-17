import React, { useEffect, useState } from 'react'
import * as assets from '../../assets/assets'

const ManageCars = () => {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toast, setToast] = useState(null)
  const [cars, setCars] = useState([])

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(t)
  }, [])

  // Load cars from localStorage on mount
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars') || '[]')
    setCars(savedCars)
  }, [])

  // Badge component
  const Badge = ({ text, type = 'default' }) => {
    const styles = {
      default: 'bg-gray-100 text-gray-700',
      available: 'bg-green-100 text-green-700',
      unavailable: 'bg-red-100 text-red-700',
    }
    return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[type]}`}>{text}</span>
  }

  // Filter and paginate
  const filtered = cars.filter((car) => {
    const matchSearch = `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = !categoryFilter || car.category === categoryFilter
    return matchSearch && matchCategory
  })

  const itemsPerPage = 5
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedCars = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Delete handler
  const handleDelete = (id) => {
    const updatedCars = cars.filter((c) => c.id !== id)
    setCars(updatedCars)
    localStorage.setItem('cars', JSON.stringify(updatedCars))
    setDeleteConfirm(null)
    setToast('Car deleted successfully')
    setTimeout(() => setToast(null), 3000)
  }

  // Empty state
  if (cars.length === 0) {
    return (
      <div className={`min-h-screen py-10 px-4 md:px-10 font-sans bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">No cars listed yet</h2>
            <p className="text-sm text-gray-500 mt-1">Start by adding your first car to the rental platform</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-10 px-4 md:px-10 font-sans bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Manage Cars</h1>
            <p className="mt-1 text-sm text-gray-500">View all listed cars, update their details, or remove them</p>
          </div>

          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by brand or model..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">All Categories</option>
              <option>SUV</option>
              <option>Sedan</option>
              <option>Coupe</option>
              <option>Hatchback</option>
              <option>Van</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 whitespace-nowrap">
              + Add Car
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Price/Day</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedCars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden rounded-lg shadow-md bg-gray-100 flex-shrink-0 group">
                          <img
                            src={car.image || '/car-placeholder.png'}
                            alt={`${car.brand} ${car.model}`}
                            className="h-14 w-14 object-cover transition-transform duration-300 group-hover:scale-110 fade-in"
                            onError={(e) => {
                              e.target.src = '/car-placeholder.png'
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{car.brand}</p>
                          <p className="text-xs text-gray-500">{car.model}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{car.seating_capacity || car.seats} seats • {car.transmission}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge text={car.category} type="default" />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">${car.pricePerDay || car.price}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge text="Available" type="available" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-blue-50 rounded transition-colors duration-150" title="View">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteConfirm(car.id)} className="p-1.5 hover:bg-red-50 rounded transition-colors duration-150" title="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">Showing {paginatedCars.length} of {filtered.length} cars</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 py-1 rounded text-sm transition-colors duration-150 ${
                        currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Car?</h3>
            <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-150">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm animate-pulse">
          {toast}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  )
}

export default ManageCars