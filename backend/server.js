import express  from 'express';
// import products from './Products';
// import test from './data/test.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleWare/errorMidllewar.js';
dotenv.config();
import connectDB from './config/db.js';
import productRoute from './routes/productRoutes.js';
import userRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
const port = process.env.PORT;

connectDB();
const app = express();

// Body parse middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Cookie parser middleware
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('API is running...');
})

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal',(req,res)=>
res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>
console.log(`server running on port ${port}`));