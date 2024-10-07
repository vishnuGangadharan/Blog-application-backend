import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.DB_URL
    const connectDB = async () => {
    try {
        const connect = await mongoose.connect(url)
        if (connect) {
            console.log("Database connected successfully");

        } else {
            console.log("Failed to connect database");

        }
    } catch (error) {
        console.error(error.message);

    }
}

export default connectDB