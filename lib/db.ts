import mongoose, { Mongoose } from 'mongoose';
import Post from '@/models/Post';

const MONGODB_URI: string = process.env.MONGODB_URI ?? '';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Type-safe global caching for serverless environments
declare global {
  var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}

const globalWithMongoose = global as typeof global & {
  mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      autoIndex: true,
      maxPoolSize: 10,
      minPoolSize: 2,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw new Error('Failed to connect to MongoDB');
  }
}

// Interface to match page.tsx and Post.ts
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Transform lean post to match Post interface
const transformPost = (post: any): Post => ({
  id: post._id.toString(),
  title: post.title,
  slug: post.slug,
  content: post.content,
  tags: post.tags,
  createdAt: post.createdAt.toISOString(),
  updatedAt: post.updatedAt.toISOString(),
});

// Fetch a single post by ID
export async function getPostById(id: string): Promise<Post | null> {
  try {
    await connectDB();
    const post = await Post.findById(id).lean();
    return post ? transformPost(post) : null;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
}

// Fetch all posts for generateStaticParams
export async function getAllPosts(): Promise<{ id: string }[]> {
  try {
    await connectDB();
    const posts = await Post.find().select('_id').lean();
    return posts.map((post) => ({ id: post._id.toString() }));
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

export default connectDB;