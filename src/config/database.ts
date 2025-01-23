import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/gitget';
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};
const config = {
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gitget'
};

export { connectToDatabase, config };