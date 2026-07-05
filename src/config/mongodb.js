import mongoose from 'mongoose';
import { config } from './env.config.js';

export async function connectDB() {
    await mongoose.connect(config.mongoUri);
    console.log('✅ MongoDB conectado correctamente.');
}
