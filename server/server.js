import express from 'express';  
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js'; 
import userRouter from './routes/userRoutesjs.js';
import ownerRouter from './routes/ownerRoute.js';
import bookingRouter from './routes/bookingRoutes.js';

// Initialize express app
const app = express();
//connect to database
await connectDB();

//Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) =>res.send("Server is running"));
    app.use('/api/user', userRouter);
    app.use('/api/owner', ownerRouter);
    app.use('/api/owner',ownerRouter)
    app.use('/api/bookings',bookingRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));