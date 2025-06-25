import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import mongoose from 'mongoose';

// GET /api/posts/[id] - Fetch a single post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid post ID',
          message: 'The provided ID is not a valid MongoDB ObjectId'
        },
        { status: 400 }
      );
    }

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
          message: 'No post found with the provided ID'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });

  } catch (error: any) {
    console.error(`GET /api/posts/${params.id} error:`, error);
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

// PUT /api/posts/[id] - Update a post by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid post ID',
          message: 'The provided ID is not a valid MongoDB ObjectId'
        },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
          message: 'No post found with the provided ID'
        },
        { status: 404 }
      );
    }

    // If slug is being updated, check for duplicates
    if (body.slug && body.slug !== existingPost.slug) {
      const duplicatePost = await Post.findOne({ 
        slug: body.slug, 
        _id: { $ne: id } 
      });
      
      if (duplicatePost) {
        return NextResponse.json(
          {
            success: false,
            error: 'Slug already exists',
            message: 'Another post with this slug already exists'
          },
          { status: 409 }
        );
      }
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    );

    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: 'Post updated successfully'
    });

  } catch (error: any) {
    console.error(`PUT /api/posts/${params.id} error:`, error);

    // Handle validation errors
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

    // Handle duplicate key error
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
        error: 'Failed to update post',
        message: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete a post by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid post ID',
          message: 'The provided ID is not a valid MongoDB ObjectId'
        },
        { status: 400 }
      );
    }

    // Find and delete the post
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        {
          success: false,
          error: 'Post not found',
          message: 'No post found with the provided ID'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: deletedPost,
      message: 'Post deleted successfully'
    });

  } catch (error: any) {
    console.error(`DELETE /api/posts/${params.id} error:`, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete post',
        message: error.message
      },
      { status: 500 }
    );
  }
}