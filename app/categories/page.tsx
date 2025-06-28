'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tag, 
  Search, 
  ArrowRight,
  BookOpen,
  Loader2,
  Code
} from 'lucide-react';

interface CategoryData {
  name: string;
  count: number;
  description?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts?limit=1000');
        const data = await response.json();
        
        if (data.success) {
          // Count posts by tag
          const tagCounts = new Map<string, number>();
          data.data.forEach((post: any) => {
            post.tags.forEach((tag: string) => {
              tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
            });
          });

          // Convert to array and sort by count
          const categoriesArray = Array.from(tagCounts.entries())
            .map(([name, count]) => ({
              name,
              count,
              description: getCategoryDescription(name)
            }))
            .sort((a, b) => b.count - a.count);

          setCategories(categoriesArray);
          setFilteredCategories(categoriesArray);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  const getCategoryDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      'javascript': 'Modern JavaScript development, frameworks, and best practices',
      'react': 'React.js tutorials, hooks, and component patterns',
      'nodejs': 'Node.js backend development and server-side JavaScript',
      'python': 'Python programming, data science, and web development',
      'typescript': 'TypeScript development and type-safe programming',
      'css': 'CSS styling, animations, and modern layout techniques',
      'html': 'HTML markup, semantic web, and accessibility',
      'database': 'Database design, SQL, and data management',
      'security': 'Cybersecurity, best practices, and threat prevention',
      'cloud': 'Cloud computing, AWS, Azure, and deployment strategies',
      'devops': 'DevOps practices, CI/CD, and infrastructure automation',
      'mobile': 'Mobile app development for iOS and Android',
      'ai': 'Artificial Intelligence and Machine Learning concepts',
      'web development': 'Full-stack web development and modern frameworks',
      'programming': 'General programming concepts and best practices',
      'tutorial': 'Step-by-step guides and learning resources',
      'best practices': 'Industry standards and recommended approaches',
      'performance': 'Optimization techniques and performance tuning',
      'testing': 'Software testing strategies and frameworks',
      'architecture': 'Software architecture and system design patterns'
    };

    return descriptions[category.toLowerCase()] || `Articles and tutorials about ${category}`;
  };

  const getCategoryColor = (index: number): string => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-red-500',
      'bg-orange-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-teal-500',
      'bg-yellow-500',
      'bg-gray-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Browse{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-700 dark:to-purple-700 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive collection of technology topics and find articles 
              that match your interests and expertise level.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {filteredCategories.length} categories
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-gray-600 dark:text-gray-300">Loading categories...</span>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <Tag className="w-16 h-16 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No categories found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {searchTerm 
                  ? 'Try adjusting your search criteria.' 
                  : 'No categories are available at the moment.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <Link key={category.name} href={`/blog?tag=${encodeURIComponent(category.name)}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm dark:border-gray-700 overflow-hidden h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl ${getCategoryColor(index)} dark:brightness-90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Tag className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
                          {category.count} article{category.count !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Explore articles
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Can't find what you're looking for?</h2>
            <p className="text-xl text-blue-100 dark:text-blue-200">
              Browse all our articles or get in touch with suggestions for new topics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-200 px-8">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View All Articles
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 dark:hover:text-blue-700 dark:hover:bg-gray-200 px-8">
                  Suggest a Topic
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-400 to-purple-400 dark:from-blue-500 dark:to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TechInsights</span>
            </div>
            <p className="text-slate-400 dark:text-slate-500 mb-6">
              Empowering IT professionals with knowledge and insights
            </p>
            <div className="flex justify-center space-x-6 text-sm text-slate-400 dark:text-slate-500">
              <Link href="/privacy-policy" className="hover:text-white dark:hover:text-gray-200 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-white dark:hover:text-gray-200 transition-colors">Contact</Link>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-600 text-sm">
              © 2025 TechInsights. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}