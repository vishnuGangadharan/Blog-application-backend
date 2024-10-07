import express from 'express';
const app = express();
import connectDB from './config/db.js';
import http from 'http';
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';

dotenv.config()

const port =process.env.PORT

connectDB()
const  server = http.createServer(app);
app.use('/uploads', express.static('public/uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: [ 'https://blog-application-sand-seven.vercel.app'] ,
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
};

app.use(cors(corsOptions))  
app.use('/user',userRouter)

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


