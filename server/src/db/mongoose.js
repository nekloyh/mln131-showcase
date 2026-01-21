/**
 * MongoDB Connection with Mongoose
 * Simple, no migrations needed!
 */
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/runner_quiz';

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[SUCCESS] MongoDB connected successfully');
  } catch (error) {
    console.error('[FAIL] MongoDB connection error:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default mongoose;
