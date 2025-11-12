import express from 'express'
import cors from 'cors'
import 'dotenv/config'
// Import the 'connection' export and rename it to 'connectDB'
import { connection as connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/resultRoutes.js';

const app=express();
const port = 4000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// database
connectDB();
// routes
app.use('/api/auth', userRouter);
app.use('/api/results',resultRouter);
app.get('/',(req,res)=>{
    res.send('API WORKING');
});

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})