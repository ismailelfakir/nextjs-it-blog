import { getPostById, getAllPosts } from "@/lib/db";
import EditPostForm from "./EditPostForm";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts;
}

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const postId = params.id;

  if (!postId || typeof postId !== "string") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Invalid Post ID
          </h2>
          <p className="text-muted-foreground mb-6">
            Please provide a valid post ID.
          </p>
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

  const rawPost = await getPostById(postId);
  if (!rawPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 font-semibold">Post not found</p>
      </div>
    );
  }

  const post: Post = {
    id: rawPost.id,
    title: rawPost.title,
    slug: rawPost.slug,
    content: rawPost.content,
    tags: rawPost.tags,
    createdAt: new Date(rawPost.createdAt).toISOString(),
    updatedAt: new Date(rawPost.updatedAt).toISOString(),
  };

  return <EditPostForm post={post} />;
}