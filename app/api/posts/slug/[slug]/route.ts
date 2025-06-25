import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';

// GET /api/posts/slug/[slug] - Fetch a post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing slug parameter',
          message: 'Slug parameter is required'
        },
        { status: 400 }
      );
    }

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
          message: 'No post found with the provided slug'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });

  } catch (error: any) {
    console.error(`GET /api/posts/slug/${params.slug} error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch post',
        message: error.message
      },
      { status: 500 }
    );
  }
}