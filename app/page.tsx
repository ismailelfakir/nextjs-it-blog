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
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'TechInsights - IT Blog & Technology News',
  description: 'Explore the latest in technology, programming, and IT insights. Your go-to source for tech trends, tutorials, and industry analysis.',
  keywords: ['technology blog', 'programming tutorials', 'IT insights', 'software development', 'tech news', 'web development', 'cybersecurity', 'cloud computing'],
  type: 'website',
});

export default function Home() {
  const featuredPosts = [
    {
      title: "The Future of AI in Software Development",
      description: "Exploring how artificial intelligence is revolutionizing the way we write, test, and deploy code.",
      category: "AI & Machine Learning",
      date: "Dec 15, 2024",
      author: "Sarah Chen",
      readTime: "8 min read",
      tags: ["AI", "Development", "Future Tech"]
    },
    {
      title: "Microservices Architecture: Best Practices",
      description: "A comprehensive guide to designing scalable microservices with real-world examples and patterns.",
      category: "Architecture",
      date: "Dec 12, 2024",
      author: "Michael Rodriguez",
      readTime: "12 min read",
      tags: ["Microservices", "Architecture", "Scalability"]
    },
    {
      title: "Cybersecurity Trends for 2025",
      description: "What IT professionals need to know about emerging security threats and defense strategies.",
      category: "Security",
      date: "Dec 10, 2024",
      author: "Alex Johnson",
      readTime: "6 min read",
      tags: ["Security", "Trends", "Best Practices"]
    }
  ];

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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Welcome to my{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    IT Blog
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                  <Button variant="outline" size="lg" className="px-8">
                    Browse Categories
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Explore Categories</h2>
              <p className="text-muted-foreground text-lg">Find content tailored to your interests</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link key={category.name} href={`/blog?tag=${encodeURIComponent(category.name.toLowerCase())}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.count} articles</p>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Featured Articles</h2>
              <p className="text-muted-foreground text-lg">Latest insights from industry experts</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button variant="outline" size="lg" className="px-8">
                  View All Articles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
              <p className="text-xl text-blue-100">
                Get the latest tech insights and tutorials delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TechInsights</span>
              </div>
              <p className="text-slate-400 mb-6">
                Empowering IT professionals with knowledge and insights
              </p>
              <div className="flex justify-center space-x-6 text-sm text-slate-400">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 text-slate-500 text-sm">
                © 2024 TechInsights. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}