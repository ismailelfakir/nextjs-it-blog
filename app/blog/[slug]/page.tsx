import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/share-button';
import { 
  Calendar, 
  User, 
  Clock,
  ArrowLeft,
  BookOpen,
  Tag
} from 'lucide-react';
import { generateBlogPostMetadata } from '@/lib/seo-utils';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface BlogPostPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/posts/slug/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - TechInsights',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  // Generate structured data for the blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    "author": {
      "@type": "Person",
      "name": "Admin"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TechInsights",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/logo.png`
      }
    },
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/blog/${post.slug}`
    },
    "keywords": post.tags.join(', ')
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />

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
                    
                    <ShareButton title={post.title} />
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
                      __html: post.content.replace(/\n/g, '<br />') 
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
                      <ShareButton title={post.title} />
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