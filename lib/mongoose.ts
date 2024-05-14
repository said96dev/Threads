import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);
    if (!process.env.MONGODB_URL) return console.log("Connection to Mongoose failed");
    if (isConnected) return console.log("Connection to Mongoose")

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true;
        console.log("Connection to Mongo")
    } catch (error) {
        console.log(error)
    }


}