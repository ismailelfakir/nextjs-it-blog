import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Mail, 
  Check, 
  Bell,
  BookOpen,
  Users,
  Zap,
  Code
} from 'lucide-react';
import { generateMetadata } from '@/lib/seo-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Subscribe to TechInsights Newsletter',
  description: 'Stay updated with the latest technology insights, programming tutorials, and IT industry news. Join thousands of professionals who trust TechInsights.',
  keywords: ['subscribe newsletter', 'tech news', 'programming updates', 'IT insights', 'technology newsletter'],
  type: 'website',
});

export default function SubscribePage() {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Weekly Tech Insights',
      description: 'Get the latest articles and tutorials delivered to your inbox every week'
    },
    {
      icon: Zap,
      title: 'Breaking News',
      description: 'Be the first to know about major technology announcements and trends'
    },
    {
      icon: Users,
      title: 'Exclusive Content',
      description: 'Access subscriber-only content, guides, and early previews'
    },
    {
      icon: Bell,
      title: 'Curated Updates',
      description: 'Handpicked articles and resources tailored to your interests'
    }
  ];

  const features = [
    'Weekly newsletter with latest articles',
    'Exclusive subscriber-only content',
    'Early access to new tutorials',
    'Curated tech news and trends',
    'No spam, unsubscribe anytime',
    'Mobile-friendly format'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Subscribe to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                TechInsights
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of IT professionals who stay ahead of the curve with our weekly 
              newsletter featuring the latest technology insights and tutorials.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                10,000+ subscribers
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Weekly updates
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                No spam
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Subscription Card */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Get Weekly Tech Insights
                </CardTitle>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter and never miss an important update in the tech world.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      required 
                      className="text-lg py-3"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Your name" 
                      className="text-lg py-3"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Subscribe Now
                  </Button>
                </form>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    By subscribing, you agree to our{' '}
                    <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                    . Unsubscribe at any time.
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-foreground mb-3">What you'll get:</h3>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Why Subscribe?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Stay informed about the rapidly evolving technology landscape with curated 
                  content that matters to your professional growth.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Testimonial */}
              <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <blockquote className="text-muted-foreground italic mb-3">
                    "TechInsights newsletter has become an essential part of my weekly reading. 
                    The content is always relevant and helps me stay current with technology trends."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">JS</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">John Smith</p>
                      <p className="text-sm text-muted-foreground">Senior Developer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our newsletter
            </p>
          </div>
          
          <div className="space-y-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How often will I receive emails?
                </h3>
                <p className="text-muted-foreground">
                  We send one newsletter per week, typically on Wednesdays. You'll also receive 
                  occasional special announcements about major tech developments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I unsubscribe at any time?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! Every email includes an unsubscribe link. You can also manage 
                  your subscription preferences or pause emails temporarily.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Do you share email addresses with third parties?
                </h3>
                <p className="text-muted-foreground">
                  Never. We respect your privacy and will never share, sell, or rent your 
                  email address to third parties. Read our{' '}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  for more details.
                </p>
              </CardContent>
            </Card>
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
  );
}