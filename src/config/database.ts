import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const connectionString = process.env.MONGODB_URI || '';
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};

export default connectToDatabase;