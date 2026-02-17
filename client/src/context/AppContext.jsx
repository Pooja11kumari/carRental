import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
export const AppContext= createContext();

export const AppProvider=({children})=>{
    const navigate=useNavigate();
    const currency=import.meta.env.VITE_CURRENCY;
    const [token,setToken]=useState(null);
    const [user,setUser]=useState(null);
    const [isOwner,setIsOwner]=useState(false);
    const[showLogin,setShowLogin]=useState(false);
    const[pickupDate,setPickupDate]=useState('');
    const [returnDate,setReturnDate]=useState('');

    const [cars,setCars]=useState([])

    //func to check if user is logged in
    const fetchUser=async()=>{
        try {
            const {data}=await axios.get('/api/users/data')
                if(data.success){
                    setUser(data.user);
                    setIsOwner(data.user.role==='owner');
                }else{
                    navigate('/');
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        // function to fetch cars
        const fetchCars=async()=>{
            try {
                // Load cars from localStorage
                const savedCars = JSON.parse(localStorage.getItem('cars') || '[]')
                setCars(savedCars)
            } catch (error) {
                console.error('Error loading cars:', error)
                setCars([])
            }
        }

        //func to logout user
        const logout=()=>{
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setIsOwner(false);
            axios.defaults.headers.common['Authorization']=''
            toast.success('Logged out successfully');
            
        }


        //useeffecr to  retrive the token from local storage
        useEffect(()=>{
            const token=localStorage.getItem('token');
        setToken(token)
        fetchCars()

        // Listen for storage changes to keep cars in sync
        const handleStorageChange = (e) => {
            if (e.key === 'cars') {
                fetchCars()
            }
        }
        window.addEventListener('storage', handleStorageChange)

        return () => window.removeEventListener('storage', handleStorageChange)
        },[])


        //use effect to fetch user data when token is available
        useEffect(()=>{
            if(token){
            axios.defaults.headers.common['Authorization']=`${token}`
            fetchUser()
                }
        }, [token])
    
      const value={
        navigate,
        currency,
        axios,
          user,
        setUser, token,setToken, isOwner,setIsOwner, fetchUser,showLogin,setShowLogin,pickupDate,setPickupDate,returnDate,setReturnDate,cars,setCars,logout,fetchCars,        
    }
    return(
        <AppContext.Provider value={value}>
               {children}
               </AppContext.Provider>
               )
}

export const useAppContext=()=>{
    return useContext(AppContext);
}