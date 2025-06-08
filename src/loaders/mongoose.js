import mongoose from 'mongoose';
import { dbUri } from '../config/index.js';

export default async () => {
  console.log('🗄️ Connecting to MongoDB...');
  mongoose.set("strictQuery", false);
  await mongoose.connect(dbUri, {})
    .then(() => console.log('Mongodb Connection'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
};