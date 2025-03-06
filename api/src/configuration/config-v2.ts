import mongoose from "mongoose";

export const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to DB");
  } catch (error: any) {
    console.error("DB Connection Error ", error);
  }
};
