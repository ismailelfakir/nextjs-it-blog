"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  User,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Tag,
  BookOpen,
  Loader2,
} from "lucide-react";

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
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<
    ApiResponse["pagination"] | null
  >(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  const fetchPosts = async (page = 1, search = "", tag = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
      });

      if (search) params.append("search", search);
      if (tag) params.append("tag", tag);

      const response = await fetch(`/api/posts?${params}`);
      const data: ApiResponse = await response.json();

      if (data.success) {
        setPosts(data.data);
        setPagination(data.pagination);

        // Extract unique tags from all posts
        const tags = new Set<string>();
        data.data.forEach((post) => {
          post.tags.forEach((tag) => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      } else {
        setError("Failed to fetch posts");
      }
    } catch (err) {
      setError("An error occurred while fetching posts");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get search params from URL
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search") || "";
    const tag = urlParams.get("tag") || "";

    setSearchTerm(search);
    setSelectedTag(tag);

    fetchPosts(currentPage, search, tag);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts(1, searchTerm, selectedTag);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  // Generate page metadata
  const pageTitle = searchTerm
    ? `Search results for "${searchTerm}" | TechInsights Blog`
    : selectedTag
    ? `${selectedTag} Articles | TechInsights Blog`
    : "Blog | TechInsights - IT & Technology Articles";

  const pageDescription = searchTerm
    ? `Search results for "${searchTerm}" on TechInsights blog. Find articles about technology, programming, and IT insights.`
    : selectedTag
    ? `Browse ${selectedTag} articles on TechInsights. Expert insights and tutorials about ${selectedTag} and related technologies.`
    : "Explore in-depth articles about technology, programming, and IT insights. Your go-to source for tech trends, tutorials, and industry analysis.";

  if (error) {
    return (
      <>
        <Head>
          <title>Error | TechInsights Blog</title>
          <meta
            name="description"
            content="An error occurred while loading the blog posts."
          />
          <meta name="robots" content="noindex" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
              <p className="text-muted-foreground">{error}</p>
              <Button
                onClick={() => fetchPosts(currentPage, searchTerm, selectedTag)}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="technology blog, programming articles, IT insights, software development, tech tutorials, web development, cybersecurity"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/blog`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/blog`}
        />
        <meta property="og:site_name" content="TechInsights" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "TechInsights Blog",
              description: "IT Blog & Technology News",
              url: `${
                process.env.NEXTAUTH_URL || "http://localhost:3000"
              }/blog`,
              publisher: {
                "@type": "Organization",
                name: "TechInsights",
              },
              blogPost: posts.map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                url: `${
                  process.env.NEXTAUTH_URL || "http://localhost:3000"
                }/blog/${post.slug}`,
                datePublished: post.createdAt,
                dateModified: post.updatedAt,
                author: {
                  "@type": "Person",
                  name: "EL FAKIR Ismail",
                },
                keywords: post.tags.join(", "),
              })),
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />

        {/* Hero Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Latest{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Articles
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore in-depth articles about technology, programming, and IT
                insights
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border shadow-sm">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-4 mb-6"
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </form>

              {/* Tag Filter */}
              {allTags.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Filter by tags:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className={`cursor-pointer transition-all hover:scale-105 ${
                          selectedTag === tag
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            : "hover:bg-blue-50"
                        }`}
                        onClick={() => handleTagFilter(tag)}
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-muted-foreground">
                  Loading articles...
                </span>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedTag
                    ? "Try adjusting your search or filter criteria."
                    : "No articles have been published yet."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm overflow-hidden h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(post.createdAt)}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {getReadingTime(post.content)}
                            </div>
                          </div>
                          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-sm leading-relaxed line-clamp-3">
                            {truncateContent(
                              post.content.replace(/<[^>]*>/g, "")
                            )}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col justify-end">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <User className="w-4 h-4 mr-1" />
                              EL FAKIR Ismail
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={!pagination.hasPrev}
                      className="px-6"
                    >
                      Previous
                    </Button>
                    <div className="flex items-center space-x-2">
                      {Array.from(
                        { length: Math.min(5, pagination.totalPages) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <Button
                              key={pageNum}
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 p-0 ${
                                currentPage === pageNum
                                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                  : ""
                              }`}
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!pagination.hasNext}
                      className="px-6"
                    >
                      Next
                    </Button>
                  </div>
                )}

                {/* Results Summary */}
                {pagination && (
                  <div className="text-center mt-8 text-sm text-muted-foreground">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}{" "}
                    of {pagination.total} articles
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
