import React, { useEffect, useState } from 'react'

const ManageBookings = () => {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [cancelConfirm, setCancelConfirm] = useState(null)
  const [toast, setToast] = useState(null)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(t)
  }, [])

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(savedBookings)
  }, [])

  // Status badge component
  const StatusBadge = ({ status }) => {
    const styles = {
      Confirmed: 'bg-green-100 text-green-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Completed: 'bg-blue-100 text-blue-700',
      Cancelled: 'bg-red-100 text-red-700',
    }
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>
  }

  // Filter and paginate
  const filtered = bookings.filter((booking) => {
    const matchSearch = booking.car.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = !statusFilter || booking.status === statusFilter
    return matchSearch && matchStatus
  })

  const itemsPerPage = 5
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedBookings = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Cancel handler
  const handleCancel = (id) => {
    const updatedBookings = bookings.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    setCancelConfirm(null)
    setToast('Booking cancelled successfully')
    setTimeout(() => setToast(null), 3000)
  }

  // Approve handler
  const handleApprove = (id) => {
    const updatedBookings = bookings.map((b) => (b.id === id ? { ...b, status: 'Confirmed' } : b))
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    setToast('Booking confirmed successfully')
    setTimeout(() => setToast(null), 3000)
  }

  // Empty state
  if (bookings.length === 0) {
    return (
      <div className={`min-h-screen py-10 px-4 md:px-10 font-sans bg-gradient-to-br from-gray-50 to-gray-100 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">No bookings yet</h2>
            <p className="text-sm text-gray-500 mt-1">Bookings will appear here once customers start renting cars</p>
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
            <h1 className="text-2xl font-semibold text-gray-900">Manage Bookings</h1>
            <p className="mt-1 text-sm text-gray-500">Track all customer bookings, approve or cancel requests, and manage booking statuses</p>
          </div>

          {/* Top Controls */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by car name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">All Statuses</option>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Car & Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Booking Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.car}</p>
                        <p className="text-xs text-gray-500">{booking.customer}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{booking.startDate} to {booking.endDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">${booking.amount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {booking.status === 'Pending' && (
                          <button
                            onClick={() => handleApprove(booking.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors duration-150"
                          >
                            Approve
                          </button>
                        )}
                        {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
                          <button
                            onClick={() => setCancelConfirm(booking.id)}
                            className="px-3 py-1 border border-red-200 text-red-600 rounded text-xs hover:bg-red-50 transition-colors duration-150"
                          >
                            Cancel
                          </button>
                        )}
                        {booking.status === 'Completed' || booking.status === 'Cancelled' ? (
                          <button disabled className="px-3 py-1 border border-gray-200 text-gray-400 rounded text-xs cursor-not-allowed">
                            View
                          </button>
                        ) : (
                          <button className="px-3 py-1 border border-gray-200 text-gray-600 rounded text-xs hover:bg-gray-50 transition-colors duration-150">
                            View
                          </button>
                        )}
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
              <p className="text-sm text-gray-500">Showing {paginatedBookings.length} of {filtered.length} bookings</p>
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

      {/* Cancel Confirmation Modal */}
      {cancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancel Booking?</h3>
            <p className="text-sm text-gray-600 mb-6">This will cancel the customer's booking and send a cancellation notification.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setCancelConfirm(null)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-150">
                Keep Booking
              </button>
              <button
                onClick={() => handleCancel(cancelConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors duration-150"
              >
                Cancel Booking
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

export default ManageBookings