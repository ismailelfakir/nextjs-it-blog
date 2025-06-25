import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Clock,
  ArrowLeft,
  BookOpen,
  Tag,
  Share2
} from 'lucide-react';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import { generateBlogPostMetadata, generateStructuredData } from '@/lib/seo-utils';
import { getReadingTime, formatDate } from '@/lib/date-utils';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  try {
    await connectDB();
    const post = await Post.findOne({ slug }).lean();
    
    if (!post) {
      return null;
    }

    return {
      id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      content: post.content,
      tags: post.tags,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | TechInsights',
      description: 'The requested blog post could not be found.',
      robots: 'noindex',
    };
  }

  return generateBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const articleStructuredData = generateStructuredData({
    type: 'Article',
    title: post.title,
    description: post.content.substring(0, 160),
    url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/blog/${post.slug}`,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: 'TechInsights Admin',
    tags: post.tags,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    TechInsights
                  </h1>
                  <p className="text-sm text-muted-foreground">IT Blog & Technology News</p>
                </div>
              </Link>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="text-sm font-medium text-foreground hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Subscribe
                </Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Back Navigation */}
        <section className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog">
              <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Content */}
        <article className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8 lg:p-12">
                {/* Article Header */}
                <header className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b">
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Admin
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(post.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {getReadingTime(post.content)}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: post.title,
                            text: `Check out this article: ${post.title}`,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </header>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-foreground leading-relaxed"
                    style={{
                      lineHeight: '1.8',
                      fontSize: '1.1rem'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                    }}
                  />
                </div>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      Last updated: {formatDate(post.updatedAt)}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: post.title,
                              text: `Check out this article: ${post.title}`,
                              url: window.location.href,
                            });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                          }
                        }}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Article
                      </Button>
                    </div>
                  </div>
                </footer>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="mt-8 flex justify-center">
              <Link href="/blog">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}