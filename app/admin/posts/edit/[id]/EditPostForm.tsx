"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Shield,
  LogOut,
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  X
} from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

// Form schema
const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).max(10, "Cannot have more than 10 tags"),
});

type PostFormData = z.infer<typeof postSchema>;

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

interface EditPostFormProps {
  post: Post;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      tags: [],
    },
  });

  const watchedTitle = watch("title");
  const watchedSlug = watch("slug");

  // Initialize form and content
  useEffect(() => {
    if (post) {
      console.log("Post data:", post); // Debug: Verify post data
      setValue("title", post.title || "", { shouldDirty: false });
      setValue("slug", post.slug || "", { shouldDirty: false });
      setValue("content", post.content || "", { shouldDirty: false });
      setValue("tags", post.tags || [], { shouldDirty: false });
      setContent(post.content || "<p></p>");
      setTags(post.tags || []);
      setInitialLoading(false);
    }
  }, [post, setValue]);

  // Track form dirty state
  useEffect(() => {
    setIsFormDirty(
      isDirty ||
        content !== (post.content || "<p></p>") ||
        JSON.stringify(tags) !== JSON.stringify(post.tags || [])
    );
  }, [isDirty, content, tags, post.content, post.tags]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !watchedSlug) {
      const slug = watchedTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", slug, { shouldDirty: true });
    }
  }, [watchedTitle, watchedSlug, setValue]);

  // Sync rich text editor content
  useEffect(() => {
    setValue("content", content, { shouldDirty: true });
  }, [content, setValue]);

  // Sync tags
  useEffect(() => {
    setValue("tags", tags, { shouldDirty: true });
  }, [tags, setValue]);

  // Handle tag addition with case-insensitive validation
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      const tagExists = tags.some(
        (existingTag) => existingTag.toLowerCase() === tag
      );
      if (tag && !tagExists && tags.length < 10) {
        setTags([...tags, tag]);
        setTagInput("");
      } else if (tagExists) {
        toast.error("Tag already exists");
      } else if (tags.length >= 10) {
        toast.error("Cannot add more than 10 tags");
      }
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle form submission
  const onSubmit = async (data: PostFormData) => {
    const finalData = { ...data, tags };
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Post updated successfully!");
        router.push("/admin/posts");
      } else {
        toast.error(result.message || "Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("An error occurred while updating the post");
    } finally {
      setLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Handle cancel
  const handleCancel = () => {
    if (isFormDirty) {
      setCancelDialogOpen(true);
    } else {
      router.push("/admin/posts");
    }
  };

  // Render loading state
  if (status === "loading" || initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-muted-foreground dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Edit Post
                </h1>
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  Update your blog post
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium dark:text-white">
                  {session.user?.name || "Admin"}
                </p>
                <p className="text-xs text-muted-foreground dark:text-slate-400">
                  {session.user?.email || ""}
                </p>
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/admin/posts">
            <Button
              variant="ghost"
              className="hover:bg-blue-50 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
          <Link href={`/blog/${post.slug}`} target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="dark:border-slate-600 dark:hover:bg-slate-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="dark:text-white">Post Details</CardTitle>
              <CardDescription className="dark:text-slate-400">
                Update the basic information about your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="dark:text-white">
                  Title *
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter post title"
                  className={errors.title ? "border-red-500 dark:border-red-400" : "dark:bg-slate-700 dark:text-white"}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="dark:text-white">
                  Slug *
                </Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  placeholder="post-url-slug"
                  className={errors.slug ? "border-red-500 dark:border-red-400" : "dark:bg-slate-700 dark:text-white"}
                />
                {errors.slug && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.slug.message}</p>
                )}
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  This will be the URL path for your post. Be careful when
                  changing this as it will break existing links.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="dark:text-white">
                  Tags
                </Label>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type a tag and press Enter or comma"
                  className="mb-2 dark:bg-slate-700 dark:text-white"
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 dark:bg-slate-700 dark:text-white"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {tags.length === 0 && (
                  <p className="text-sm text-muted-foreground dark:text-slate-400">
                    Add tags to help categorize your post. Press Enter or comma
                    to add.
                  </p>
                )}
                {errors.tags && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="dark:text-white">Content *</CardTitle>
              <CardDescription className="dark:text-slate-400">
                Update your blog post content using the rich text editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Start writing your blog post..."
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["blockquote", "code-block"],
                    ["clean"],
                  ],
                }}
                className="dark:bg-slate-700 dark:text-white"
              />
              {errors.content && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  {errors.content.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex-col space-y-2 sm:flex sm:flex-row sm:gap-4 sm:space-y-0 justify-end">
            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto dark:border-slate-600 dark:hover:bg-slate-700"
                  onClick={() => isFormDirty && setCancelDialogOpen(true)}
                >
                  Cancel
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md dark:bg-slate-800">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Discard Changes?</DialogTitle>
                  <DialogDescription className="dark:text-slate-400">
                    You have unsaved changes. Are you sure you want to cancel
                    and discard them?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setCancelDialogOpen(false)}
                    className="dark:border-slate-600 dark:hover:bg-slate-700"
                  >
                    Stay
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => router.push("/admin/posts")}
                    className="dark:bg-red-700 dark:hover:bg-red-800"
                  >
                    Discard
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Post
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}