import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL!;

export const connectDB = async () => {

    if(mongoose.connection.readyState >= 1) 
        return
    console.log("connecting to database...")
    ;

    return mongoose.connect(MONGODB_URL);
};