import mongoose from "mongoose";
const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb", error.message);
  }
};

export default connectToMongodb;
