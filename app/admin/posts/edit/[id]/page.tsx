// app/admin/posts/edit/[id]/page.tsx
import { getPostById, getAllPosts } from '@/lib/db';
import EditPostForm from './EditPostForm';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

// Interface matching models/Post.ts
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts;
}

// Fallback component for suspense
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    </div>
  );
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  // Validate post ID
  const postId = params.id;
  if (!postId || typeof postId !== 'string') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Invalid Post ID</h2>
          <p className="text-muted-foreground mb-6">Please provide a valid post ID.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/posts">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch post server-side
  const post = await getPostById(postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The post you're trying to edit doesn't exist or has been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => history.back()}
              variant="outline"
              className="hover:bg-blue-50 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Link href="/admin/posts">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render form with suspense
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EditPostForm post={post} />
    </Suspense>
  );
}