import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Successfully Connected to mongoDB");
  } catch (error) {
    console.log("ERROR :", error.message);
    //to exit the nodejs process
    process.exit(1);
  }
};

export default connectDB;
