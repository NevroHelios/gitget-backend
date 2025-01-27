import mongoose from 'mongoose';
const MONGODBURI = process.env.MONGODBURI || 'mongodb://localhost:27017/express-mongo';

const connectToDatabase = async () => {
    try {
        const connectionString = MONGODBURI;
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};

export default connectToDatabase;