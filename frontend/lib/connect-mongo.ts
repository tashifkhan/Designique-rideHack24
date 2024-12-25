import mongoose from 'mongoose';

const connectMongo = async () => {
  // Check if there's already an existing connection
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    // Connect to MongoDB using the URI from the environment variable
    await mongoose.connect(process.env.MONGODB_URI as string, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });  
    console.log("MongoDB connection successfull");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error('MongoDB connection failed');
  }
};

export default connectMongo;
