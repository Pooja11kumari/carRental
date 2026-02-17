import React, { useEffect, useState } from 'react'
import { assets, dummyCarData, dummyDashboardData } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'

const Dashboard = () => {

    const {axios,isOwner,currency}=useAppContext()

    

    const [data ,setData]=useState({
        totalCars:0,
        totalBookings:0,
        pendingBookings:0,
        completeBookings:0,
        recentBookings:[],
        monthlyRevenue:0,
    })
    const dashboardCards=[
        {title:"Total Cars", value:data.totalCars,icon:assets.carIconColored},
        {title:"Total Bookings", value:data.totalBookings,icon:assets.listIconColored},
        {title:"Pending", value:data.pendingBookings,icon:assets.cautionIconColored},
        {title:"Confirmed", value:data.completeBookings,icon:assets.listIconColored},
    ]

    const fetchDashboardData=async()=>{
        try{
            const {data}=await axios.get('/api/owner/dashboard')
            if(data.success){
                setData(data.dashboardData)
            }else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)}
    }

    useEffect(()=>{
        if(isOwner){
            fetchDashboardData()
        }  
    },[isOwner])

  return (
    <div className='px-2 pt-10 md:px-4 flex-1'>
        <Title  title="Admin Dashboard" subTitle="Monitor your performance"/>
        
        {/* Main Dashboard Cards */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8'>
            {dashboardCards.map((card,index)=>(
                <div key={index} className='flex gap-4 items-center justify-between p-4 rounded-md border border-borderColor bg-white'>
                    <div>
                        <h1 className='text-xs text-gray-500'>{card.title}</h1>
                        <p className='text-2xl font-bold text-primary'>{card.value}</p>
                    </div>
                    <div className='flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 flex-shrink-0'>
                        <img src={card.icon} alt="" className='h-5 w-5' />
                    </div>
                </div>
            ))}
        </div>

        
        <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
            {/*recent bookings */}
            <div className='p-3 md:p-4 border border-borderColor rounded-md max-w-2xl w-full'>
                <h1 className='text-lg font-medium'>Recent Bookings</h1>
                <p className='text-gray-500 text-sm mb-2'>Latest customer bookings</p>
                
                {data.recentBookings.map((booking,index)=>(
                    <div key={index} className='mt-2 p-2 border border-borderColor rounded-lg'>
                        <div className='flex gap-2 items-start'>
                            {/* Car Image */}
                            <div className='hidden md:flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 flex-shrink-0'>
                                <img src={booking.car.image || assets.listIconColored} alt="" className='h-12 w-12 object-cover rounded' />
                            </div>

                            {/* Left side: Price and Status */}
                            <div className='flex flex-col gap-1'>
                                <div>
                                    <p className='text-xs text-gray-500'>Total Price</p>
                                    <p className='text-sm font-bold text-primary'>{currency}{booking.price}</p>
                                </div>
                                <p className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${booking.status === 'confirmed' ? 'bg-green-500 text-white' : 'bg-orange-400/15 text-orange-600'}`}>{booking.status}</p>
                            </div>

                            {/* Car Name and Date */}
                            <div className='flex-1 text-right'>
                                <p className='font-semibold text-sm'>{booking.car.brand} {booking.car.model}</p>
                                <p className='text-xs text-gray-500 mt-1'>{booking.createdAt.split('T')[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='p-4 md:p-6 border border-black/20 rounded-md w-full md:max-w-xs bg-white'> 
                <h1 className='text-lg font-medium'>Monthly Revenue</h1>
                <p className='text-gray-500'>Revenue for current month</p>
                <p className='text-3xl mt-4 font-semibold text-primary'>{currency}{data.monthlyRevenue}</p>
            </div>
        </div>
    </div>
  )
}

export default Dashboard