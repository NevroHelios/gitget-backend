import mongoose from 'mongoose';
import { MONGODBURI } from '../secrets';
export class DatabaseService {
    private connection: mongoose.Connection | null = null;

    public async connect(): Promise<void> {
        if (this.connection) {
            return;
        }

        try {
            await mongoose.connect(MONGODBURI);
            this.connection = mongoose.connection;
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        if (!this.connection) {
            return;
        }

        try {
            await mongoose.disconnect();
            this.connection = null;
            console.log('MongoDB disconnected successfully');
        } catch (error) {
            console.error('MongoDB disconnection error:', error);
            throw error;
        }
    }
}