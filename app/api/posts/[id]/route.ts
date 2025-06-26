import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import mongoose from 'mongoose';

// Helper: clean a post for safe client usage
function cleanPost(post: any) {
  return {
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    tags: post.tags,
    createdAt: new Date(post.createdAt).toISOString(),
    updatedAt: new Date(post.updatedAt).toISOString(),
  };
}

// GET /api/posts/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid post ID',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      }, { status: 400 });
    }

    const post = await Post.findById(id).lean();

    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'Post not found',
        message: 'No post found with the provided ID'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: cleanPost(post)
    });

  } catch (error: any) {
    console.error(`GET /api/posts/${params.id} error:`, error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch post',
      message: error.message
    }, { status: 500 });
  }
}

// PUT /api/posts/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid post ID',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      }, { status: 400 });
    }

    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return NextResponse.json({
        success: false,
        error: 'Post not found',
        message: 'No post found with the provided ID'
      }, { status: 404 });
    }

    if (body.slug && body.slug !== existingPost.slug) {
      const duplicate = await Post.findOne({ slug: body.slug, _id: { $ne: id } });
      if (duplicate) {
        return NextResponse.json({
          success: false,
          error: 'Slug already exists',
          message: 'Another post with this slug already exists'
        }, { status: 409 });
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedPost) {
      return NextResponse.json({
        success: false,
        error: 'Update failed',
        message: 'Could not update the post'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: cleanPost(updatedPost),
      message: 'Post updated successfully'
    });

  } catch (error: any) {
    console.error(`PUT /api/posts/${params.id} error:`, error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: messages.join(', ')
      }, { status: 400 });
    }

    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'Duplicate entry',
        message: 'A post with this slug already exists'
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update post',
      message: error.message
    }, { status: 500 });
  }
}

// DELETE /api/posts/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid post ID',
        message: 'The provided ID is not a valid MongoDB ObjectId'
      }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(id).lean();

    if (!deletedPost) {
      return NextResponse.json({
        success: false,
        error: 'Post not found',
        message: 'No post found with the provided ID'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: deletedPost._id.toString(),
        title: deletedPost.title,
        slug: deletedPost.slug
      },
      message: 'Post deleted successfully'
    });

  } catch (error: any) {
    console.error(`DELETE /api/posts/${params.id} error:`, error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete post',
      message: error.message
    }, { status: 500 });
  }
}