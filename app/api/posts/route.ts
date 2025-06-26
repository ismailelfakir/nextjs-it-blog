import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';

// GET /api/posts - Fetch all posts
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    // Build query
    let query: any = {};
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error: any) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch posts',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, slug, content, tags } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Title, slug, and content are required'
        },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: 'Slug already exists',
          message: 'A post with this slug already exists'
        },
        { status: 409 }
      );
    }

    // Validate tags as array of strings
    const validTags = Array.isArray(tags) && tags.every(tag => typeof tag === 'string')
      ? tags
      : [];

    // Create post
    const post = new Post({
      title,
      slug,
      content,
      tags: validTags
    });

    const savedPost = await post.save();

    return NextResponse.json(
      {
        success: true,
        data: savedPost,
        message: 'Post created successfully'
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('POST /api/posts error:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: validationErrors.join(', ')
        },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Duplicate entry',
          message: 'A post with this slug already exists'
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create post',
        message: error.message
      },
      { status: 500 }
    );
  }
}