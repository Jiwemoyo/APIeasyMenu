const mongoose = require('mongoose');
const { config } = require('dotenv');
config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;