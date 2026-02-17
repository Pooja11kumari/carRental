import { constants } from "http2";
import imagekit from "../configs/imagekit.js";
import Booking from "../modals/Booking.js";
import Car from "../modals/Car.js";
import User from "../modals/user.js";
import fs from "fs";


export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" });
        res.json({ success: true, message: "Now you can list your cars" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.car);
        const imageFile = req.file;
        //uplodad image to imagekit
        const fileBuffer=fs.readFileSync(imageFile.path)
        const response=await imagekit.upload({
        
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/users'
        })
        //optimisation through imagekit url transformation
        var optimizedImageUrl =imageFile.url({
            path:response.filePath,
            transformation: [
                    { width:'400'},
                    {quality:"auto"},
                    {format:"webp"}
                    ]
        });
        const image=optimizedImageUrl;

        await UserfindByIdAndUpdate(_id, { image });
        res.json({ success: true, message: "Image updated successfully" });
        
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//api to list owner cars

export const getOwnerCars=async(req,res)=>{
    try{
        const { _id } = req.user;
        const cars=await Car.find({owner:_id})
        res.json({success: true,cars})

    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
//api to toggle car availability

export const toggleCarAvailability=async(req,res)=>{
    try{
        const { _id } = req.user;
        const {carId}=req.body;
        const car=await Car.findById({carId})
        //chehck if the car belongs to the owner
        if(car.owner.toString()!==_id){
            return res.json({success: false,message:"You are not authorized to perform this action"})
        }
        car.available=!car.available;
        await car.save();
    
        res.json({success: true,message:"Car availability toggled successfully"})

    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
//api to delete car
export const deleteCar=async(req,res)=>{
    try{
        const { _id } = req.user;
        const {carId}=req.body;
        const car=await Car.findById({carId})

        //chehck if the car belongs to the owner
        if(car.owner.toString()!==_id){
            return res.json({success: false,message:"You are not authorized to perform this action"})
        }
        car.owner=null;
        car.available=false;
    
        res.json({success: true,message:"car removed from listing successfully"})

    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//api to dashboard data
export const getDashboardData=async(req,res)=>{
    try{
        const { _id ,role} = req.user;
        if(role!=="owner"){
            return res.json({success: false,message:"You are not authorized to access this data"})
        }
        const cars=await Car.find({owner:_id})
        const bookings=await Booking.find({owner:_id}).populate("car user").sort({createdAt:-1});
        const pendingBookings=await Booking.find({owner:_id,status:"pending"})
        const completedBookings=await Booking.find({owner:_id,status:"completed"})

        //calculate monthyrevenue from bookings where stauts is confirmed
        const monthlyRevenue=bookings.slice().filter(booking=>booking.status==="completed").reduce((acc,booking)=> acc+=booking.price,0)

        const dashboardData={
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:completedBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue
        }
        res.json({success: true,dashboardData});

    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
//api to update user image
export const updateImage=async(req,res)=>{
    try{
        const { _id } = req.user;
        const imageFile = req.file;

    }catch(error){
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}