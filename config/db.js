import mongoose from "mongoose";

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

const connectDB = async (app) => {
  if (!MONGO_URL) {
    console.error("MONGO_URL is not set");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGO_URL, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    app.listen(PORT, () => {
      console.log(`Server is up & running on: ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
