import mongoose from "mongoose";

const connectDB = async () => {
  const data = await mongoose.connect(process.env.DB_URI);
  console.log(`Mongodb connected with server: ${data.connection.host}`);
};

export default connectDB;
