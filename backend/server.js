import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import { PORT } from './config/config.js';

//app config
const app = express();
connectDB();
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//API endpoints

app.use('/api/admin', adminRouter)
// localhost:4000/api/admin

app.get('/', (req, res)=>{
    res.status(200).send('Hello World')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
