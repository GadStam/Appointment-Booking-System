import { config } from "dotenv";
import mongoose from "mongoose";

config();

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
}

export default connectDB;