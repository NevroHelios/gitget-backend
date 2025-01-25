import mongoose from 'mongoose';
const {MONGODBURI} = require('../secrets.js')

const connectToDatabase = async () => {
    try {
        const connectionString = MONGODBURI
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = { connectToDatabase};