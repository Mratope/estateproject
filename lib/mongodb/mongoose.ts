import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);
    
    // Check if already initialized (logic was reversed before)
    if (initialized) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'Next Estate'
        });
        initialized = true; // Set initialized to true after successful connection
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}