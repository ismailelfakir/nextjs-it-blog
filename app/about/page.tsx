import { Header } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  BookOpen, 
  Code, 
  Users, 
  Target, 
  Award,
  ArrowRight,
  Mail,
  Calendar
} from 'lucide-react';
import { generateMetadata } from '@/lib/seo-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'About TechInsights - IT Blog & Technology News',
  description: 'Learn about TechInsights, your go-to source for technology insights, programming tutorials, and IT industry analysis. Discover our mission and expertise.',
  keywords: ['about techinsights', 'technology blog', 'IT expertise', 'programming tutorials', 'tech insights'],
  type: 'website',
});

export default function AboutPage() {
  const stats = [
    { label: 'Articles Published', value: '200+', icon: BookOpen },
    { label: 'Technologies Covered', value: '50+', icon: Code },
    { label: 'Monthly Readers', value: '10K+', icon: Users },
    { label: 'Years of Experience', value: '5+', icon: Award },
  ];

  const expertise = [
    'Web Development',
    'Cloud Computing',
    'Cybersecurity',
    'Database Management',
    'DevOps',
    'Mobile Development',
    'AI & Machine Learning',
    'Software Architecture'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                TechInsights
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your trusted source for cutting-edge technology insights, practical programming tutorials, 
              and comprehensive IT industry analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At TechInsights, we believe that technology should be accessible to everyone. Our mission is to 
                bridge the gap between complex technical concepts and practical implementation, providing clear, 
                actionable insights that help IT professionals and enthusiasts stay ahead of the curve.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We're committed to delivering high-quality content that not only informs but also inspires 
                innovation and continuous learning in the ever-evolving world of technology.
              </p>
            </div>
            <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl dark:border-gray-700">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Expertise</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We cover a wide range of technology topics, ensuring comprehensive coverage 
              of the IT landscape.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {expertise.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-center py-3 px-4 text-sm font-medium bg-white/80 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What We Stand For</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our core values guide everything we do, from content creation to community engagement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:shadow-lg dark:border-gray-700 transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quality Content</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We prioritize accuracy, depth, and practical value in every article we publish.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:shadow-lg dark:border-gray-700 transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Community Focus</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe in fostering a supportive community of learners and professionals.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:shadow-lg dark:border-gray-700 transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Practical Focus</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our content is designed to be immediately applicable to real-world scenarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Join Our Community</h2>
            <p className="text-xl text-blue-100 dark:text-blue-200">
              Stay updated with the latest tech insights and connect with fellow professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-200 px-8">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read Our Articles
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 dark:hover:text-blue-700 dark:hover:bg-gray-200 px-8">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
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