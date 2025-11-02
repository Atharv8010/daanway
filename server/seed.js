import mongoose from 'mongoose';
import NGO from './models/NGO.js';
import { nagpurNGOs } from '../client/src/utils/ngoData.js';
import dotenv from 'dotenv';

dotenv.config();

const seedNGOs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/daanway');
    console.log('MongoDB connected');

    await NGO.deleteMany({});
    console.log('Cleared existing NGOs');

    await NGO.insertMany(nagpurNGOs);
    console.log('NGOs seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding NGOs:', error);
    process.exit(1);
  }
};

seedNGOs();