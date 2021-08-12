import mongoose from "mongoose";
const mongodbKey =
  "mongodb+srv://nikita_19:nikita1234@cluster0.75ap7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodbKey, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
