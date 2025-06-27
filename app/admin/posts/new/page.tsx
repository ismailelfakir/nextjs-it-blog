import { Header } from '@/components/header';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Database, 
  Cloud, 
  Shield, 
  Smartphone, 
  Cpu,
  ArrowRight,
  Calendar,
  User,
  BookOpen
} from 'lucide-react';
import { generateMetadata, generateStructuredData } from '@/lib/seo-utils';
import Post from '@/models/Post';
import connectDB from '@/lib/db';
import type { Metadata } from 'next';

// Define the shape of a post for the UI, including fields needed for display
interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  createdAt: string;
  author: string;
  readTime: string;
  tags: string[];
}

export const metadata: Metadata = generateMetadata({
  title: 'TechInsights - IT Blog & Technology News',
  description: 'Explore the latest in technology, programming, and IT insights. Your go-to source for tech trends, tutorials, and industry analysis.',
  keywords: ['technology blog', 'programming tutorials', 'IT insights', 'software development', 'tech news', 'web development', 'cybersecurity', 'cloud computing'],
  type: 'website',
});

// Helper function to calculate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper function to generate description from content
const generateDescription = (content: string): string => {
  const plainText = content.replace(/<[^>]+>/g, ''); // Strip HTML tags
  return plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText;
};

export default async function Home() {
  // Connect to MongoDB
  await connectDB();

  // Fetch the latest 3 posts from the database
  const rawPosts = await Post.find()
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(3) // Limit to 3 featured posts
    .select('title slug content tags createdAt author') // Select relevant fields
    .lean(); // Convert to plain objects

  // Transform posts to match UI requirements
  const featuredPosts: Post[] = rawPosts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    description: generateDescription(post.content),
    category: post.tags[0] || 'General', // Use first tag as category or default
    createdAt: post.createdAt,
    author: post.author || 'EL FAKIR Ismail',
    readTime: calculateReadTime(post.content),
    tags: post.tags,
  }));

  // Static categories (unchanged)
  const categories = [
    { name: "Programming", icon: Code, count: 42, color: "bg-blue-500" },
    { name: "Database", icon: Database, count: 28, color: "bg-green-500" },
    { name: "Cloud", icon: Cloud, count: 35, color: "bg-purple-500" },
    { name: "Security", icon: Shield, count: 24, color: "bg-red-500" },
    { name: "Mobile", icon: Smartphone, count: 19, color: "bg-orange-500" },
    { name: "Hardware", icon: Cpu, count: 16, color: "bg-indigo-500" }
  ];

  const websiteStructuredData = generateStructuredData({
    type: 'WebSite',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Welcome to my{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    IT Blog
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Dive deep into the world of technology with expert insights, practical tutorials, 
                  and the latest trends in software development, cybersecurity, and IT infrastructure.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/blog">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Reading
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg" className="px-8 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800">
                    Browse Categories
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-white/50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Explore Categories</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Find content tailored to your interests</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link key={category.name} href={`/blog?tag=${encodeURIComponent(category.name.toLowerCase())}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{category.count} articles</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Articles</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Latest insights from industry experts</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Link key={index} href={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-gray-900 dark:text-white">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3 text-gray-600 dark:text-gray-300">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="outline" size="lg" className="px-8 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800">
                  View All Articles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
              <p className="text-xl text-blue-100 dark:text-blue-200">
                Get the latest tech insights and tutorials delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none text-base"
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TechInsights</span>
              </div>
              <p className="text-slate-400 dark:text-slate-500 mb-6">
                Empowering IT professionals with knowledge and insights
              </p>
              <div className="flex justify-center space-x-6 text-sm text-slate-400 dark:text-slate-500">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-600 text-sm">
                © 2025 TechInsights. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}