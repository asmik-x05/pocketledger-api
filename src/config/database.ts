import mongoose from "mongoose";
import config from "./config.js";


async function connectDb() {
  try {
    const status = await mongoose.connect(config.mongodb_url);
    console.log(`DB Connected :${status.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(" connecting DB", error.message);
    } else {
      console.log("Connecting DB", error);
    }
    process.exit(1);
  }
}

export default connectDb;