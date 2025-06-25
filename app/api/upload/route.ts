import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateSignedUploadParams } from '@/lib/cloudinary';

// POST /api/upload - Generate signed upload parameters
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'You must be logged in to upload images'
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { folder = 'blog-images' } = body;

    // Generate signed upload parameters
    const uploadParams = generateSignedUploadParams(folder);

    return NextResponse.json({
      success: true,
      data: {
        uploadParams,
        uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
      }
    });

  } catch (error: any) {
    console.error('Upload params generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate upload parameters',
        message: error.message
      },
      { status: 500 }
    );
  }
}