import mongoose from "mongoose"

const connectDB = async() => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Mongodb connected successfully")
        })
       await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("Error in mongodb connection: ", error)
        throw error;
    }
}

export {connectDB}