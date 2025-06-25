import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { 
  Mail, 
  MessageSquare, 
  Send,
  MapPin,
  Clock,
  Phone,
  Code
} from 'lucide-react';
import { generateMetadata } from '@/lib/seo-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Contact TechInsights - Get In Touch',
  description: 'Contact TechInsights for inquiries, collaborations, or feedback. We\'d love to hear from you and discuss technology topics.',
  keywords: ['contact techinsights', 'get in touch', 'technology inquiries', 'collaboration', 'feedback'],
  type: 'website',
});

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      value: 'hello@techinsights.dev',
      action: 'mailto:hello@techinsights.dev'
    },
    {
      icon: MessageSquare,
      title: 'Start a Discussion',
      description: 'Join our community discussions on various tech topics',
      value: 'Community Forum',
      action: '/blog'
    },
    {
      icon: Clock,
      title: 'Response Time',
      description: 'We typically respond to inquiries within',
      value: '24 hours',
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Get In{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have a question, suggestion, or want to collaborate? We'd love to hear from you. 
              Reach out and let's start a conversation about technology.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Send us a message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="What's this about?" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Let's Connect</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're looking to collaborate, have a technical question, or just want to 
                  share your thoughts on our content, we're here to listen and help.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-1">{info.title}</h3>
                            <p className="text-muted-foreground text-sm mb-2">{info.description}</p>
                            {info.action ? (
                              info.action.startsWith('mailto:') ? (
                                <a 
                                  href={info.action}
                                  className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                  {info.value}
                                </a>
                              ) : (
                                <Link 
                                  href={info.action}
                                  className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                  {info.value}
                                </Link>
                              )
                            ) : (
                              <span className="text-foreground font-medium">{info.value}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Additional Info */}
              <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Looking for something specific?</h3>
                  <p className="text-blue-100 mb-4">
                    Check out our comprehensive blog with articles on various technology topics.
                  </p>
                  <Link href="/blog">
                    <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                      Browse Articles
                    </Button>
                  </Link>
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
              Quick answers to common questions about TechInsights
            </p>
          </div>
          
          <div className="space-y-6">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Can I contribute articles to TechInsights?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We welcome guest contributions from experienced professionals. 
                  Please reach out with your article ideas and we'll discuss the submission process.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Do you offer consulting services?
                </h3>
                <p className="text-muted-foreground">
                  While our primary focus is content creation, we do consider consulting opportunities 
                  for interesting projects. Contact us to discuss your specific needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How often do you publish new content?
                </h3>
                <p className="text-muted-foreground">
                  We aim to publish new articles weekly, covering the latest trends and technologies 
                  in the IT industry. Subscribe to our newsletter to stay updated.
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