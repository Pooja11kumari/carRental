import { Car } from "../modals/Car.js";
import Booking from "../modals/Booking"


//function to checkk availability og car
const checkAvailablity=async (car ,pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$lte:pickupDate},

    })
    return bookings.length===0;


}
//api to check availabolty of cars for given date and location
export const checkAvailablityOfCar =async (req,res)=>{
    try{
            const {location,pickupDate,returnDate}=req.body;
            //ferch cars based on location
            const cars=await Car.find({location,isAvailable:true});

            //check availablity of each car for given date
        const availableCarsPromises=cars.map(async (car)=>{
         const isAvailable  =   await checkAvailablity(car._id,pickupDate,returnDate);
            return {...car._doc,isAvailable:isAvailable}
        })

        let availableCars=await Promise.all(availableCarsPromises);
        availableCars=availableCars.filter(car=>car.isAvailable===true);
        res.json({success:true ,availableCars});

    }catch(error){
        console.log(error);
        res.json({message:"false",messsage:error.message})
    }
}
//api to craete booking
export const createBooking=async (req,res)=>{
    try{    
        const {_id}=req.user;
        const {car,pickupDate,returnDate}=req.body;
        const isAvailable=await checkAvailablity(car,pickupDate,returnDate);
        if(!isAvailable){
            return res.json({success:false,message:"Car not available for selected dates"});
        }

        const carData=await Car.findById(car);
        //calculate price based on pivkyup and return date
        const picked=new Date(pickupDate);
        const returned=new Date(returnDate);
        const noOfDays=Math.ceil((returned-picked)/(1000*3600*24));
        const price=carData.pricePerDay*noOfDays;

        await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price});
        res.json({success:true,message:"Booking created successfully"});    

    }catch(error){
        console.log(error);
        res.json({message:"false",messsage:error.message})
    }
}
//api to list user bookings
        export const getUserBookings=async (req,res)=>{
             try{
                const {_id}=req.user;
                const bookings=await Booking.find({user:_id}).populate("car").sort({createdAt:-1});
                res.json({success:true,bookings});
             }catch(error){
                console.log(error);
                res.json({message:"false",messsage:error.message})
             }
            }
            //api to get owner bookings
            export const getOwnerBookings=async (req,res)=>{
                try{
                    if(!req.user.role!='owner'){
                        return res.json({success:false,message:"Unauthorized"});
                    }
                    const bookings=await Booking.find({owner:req.user._id}).populate("car user").select("-user.password").sort({createdAt:-1});
                    res.json({success:true,bookings});
                }catch(error){
                    console.log(error);
                    res.json({message:"false",messsage:error.message})
                }
            }

            //api to update booking status 
            export const changeBookingStatus=async (req,res)=>{
                try{
                    const {_id}=req.user;
                    const {bookingId,status}=req.body;
                    const booking=await Booking.findById(bookingId)
                    if(booking.owner.toString()!==_id.toString()){
                        return res.json({success:false,message:"Unauthorized"});
                    }
                    booking.status=status;
                    await booking.save();
                    res.json({success:true,message:"Booking status updated successfully"});
                }
                catch(error){
                    console.log(error);
                    res.json({message:"false",messsage:error.message})
                }
            }