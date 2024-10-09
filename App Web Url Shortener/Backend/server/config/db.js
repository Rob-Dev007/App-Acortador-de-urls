import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI); 

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    }catch (error) {
        console.log(error);
        process.exit(1);
    };
};

export default connectDB;