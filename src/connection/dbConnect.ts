import mongoose from "mongoose";
import express from "express";

export const dbConnection = async (app: express.Application, PORT: string | number) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};
