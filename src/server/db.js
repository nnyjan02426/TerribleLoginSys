import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" })

export async function connectDB() {
  const uri = process.env.DB_URI;
  if (!uri) throw new Error("Missing Database URI");

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("Database successfully connected");
}
