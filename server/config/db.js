import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/";
    if (!process.env.MONGO_URI) {
      console.warn("MONGO_URI not set. Falling back to mongodb://localhost:27017/ (default 'test' DB)");
    }
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // exit process with failure
  }
};

export default connectDB;
