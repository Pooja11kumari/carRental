import express from "express";
import { changeBookingStatus, checkAvailablityOfCar, createBooking, getOwnerBookings, getUserBookings } from "../controllers/bookingController";
 const router = express.Router();
 import { protect } from "../middleware/auth.js";

 bookingRouter.post("check-availability", checkAvailablityOfCar)
 bookingRouter.post("/create", protect , createBooking)
 bookingRouter.get("/user",protect ,getUserBookings)
 bookingRouter.get("/owner",protect ,getOwnerBookings)
 bookingRouter.get("/change-status",protect ,changeBookingStatus)

 export default bookingRouter;