import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educator.routes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/course.routes.js';
import userRouter from './routes/user.routes.js';


//Initialize express
const app=express();

//connect to database
await connectDB();
await connectCloudinary();

//middlewares
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get('/',(req,res)=> res.send('API working!'))
app.post('/clerk',express.json(),clerkWebhooks);
app.use('/api/educator',express.json(),educatorRouter);
app.use('/api/course',express.json(),courseRouter)
app.use('/api/user',express.json(),userRouter);

//port
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})