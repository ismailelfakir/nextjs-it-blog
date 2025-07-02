"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  LogOut,
  FileText,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: { _id?: string; id?: string; title: string; slug: string; content: string; tags: string[]; createdAt: string; updatedAt: string }[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
      return;
    }
    fetchPosts();
  }, [session, status, router]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/posts?limit=5");
      const data: ApiResponse = await response.json();

      if (data.success && Array.isArray(data.data)) {
        const mappedPosts: Post[] = data.data
          .map((post) => {
            const id = post.id || post._id?.toString();
            if (!id) {
              console.warn("Post missing ID:", post);
              return null;
            }
            return {
              ...post,
              id,
            };
          })
          .filter((post): post is Post => post !== null);
        console.log("Fetched posts:", mappedPosts); // Debug: Remove in production
        setPosts(mappedPosts);
        setError(null);
      } else {
        setError("Failed to fetch posts: Invalid response");
        toast.error("Failed to fetch posts");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("An error occurred while fetching posts");
      toast.error("An error occurred while fetching posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!postId) {
      toast.error("Invalid post ID");
      return;
    }
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        setPosts(posts.filter((post) => post.id !== postId));
        toast.success("Post deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("An error occurred while deleting the post");
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-muted-foreground dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const stats = [
    { title: "Total Posts", value: posts.length.toString(), icon: FileText, color: "bg-blue-500" },
    { title: "Published", value: posts.length.toString(), icon: Eye, color: "bg-green-500" },
    { title: "Draft", value: "0", icon: Edit, color: "bg-yellow-500" },
    { title: "Categories", value: "6", icon: BarChart3, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="border-b bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-muted-foreground dark:text-slate-400">TechInsights Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium dark:text-white">{session.user?.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground dark:text-slate-400">{session.user?.email || ""}</p>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground dark:text-white">
            Welcome back, {session.user?.name || "Admin"}!
          </h2>
          <p className="text-muted-foreground dark:text-slate-400">
            Here's what's happening with your blog today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-slate-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between dark:text-white">
                Recent Posts
                <Link href="/admin/posts/new">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </Link>
              </CardTitle>
              <CardDescription className="dark:text-slate-400">Manage your latest blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600 dark:text-blue-400" />
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                  <Button onClick={fetchPosts} className="mt-4 dark:bg-slate-700 dark:hover:bg-slate-600">
                    Try Again
                  </Button>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground dark:text-slate-400 mx-auto mb-4" />
                  <p className="text-muted-foreground dark:text-slate-400 mb-4">No posts found</p>
                  <Link href="/admin/posts/new">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Post
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground dark:text-white line-clamp-1">{post.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-muted-foreground dark:text-slate-400">{formatDate(post.createdAt)}</p>
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs dark:border-slate-600 dark:text-slate-300">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs dark:border-slate-600 dark:text-slate-300">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Published
                        </Badge>
                        <div className="flex space-x-1">
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Button size="sm" variant="ghost" title="View Post" className="dark:hover:bg-slate-600">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/posts/edit/${post.id}`}>
                            <Button size="sm" variant="ghost" title="Edit Post" className="dark:hover:bg-slate-600">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:text-red-600 dark:hover:text-red-400 dark:hover:bg-slate-600"
                            onClick={() => handleDeletePost(post.id)}
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <Link href="/admin/posts">
                      <Button variant="outline" className="dark:border-slate-600 dark:hover:bg-slate-700">
                        View All Posts
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="dark:text-white">Quick Actions</CardTitle>
              <CardDescription className="dark:text-slate-400">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/posts/new">
                <Button className="w-full justify-start dark:border-slate-600 dark:hover:bg-slate-700" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Post
                </Button>
              </Link>
              <Link href="/admin/posts">
                <Button className="w-full justify-start dark:border-slate-600 dark:hover:bg-slate-700" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Manage All Posts
                </Button>
              </Link>
              <Link href="/blog" target="_blank">
                <Button className="w-full justify-start dark:border-slate-600 dark:hover:bg-slate-700" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Blog
                </Button>
              </Link>
              <Button className="w-full justify-start dark:border-slate-600 dark:hover:bg-slate-700" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}