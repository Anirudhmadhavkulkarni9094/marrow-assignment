import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // Store this in your .env.local file

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined');
}

let cached = global._mongoClient;

if (!cached) {
  cached = global._mongoClient = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
