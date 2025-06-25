'use client';

import React from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  Shield, 
  Eye, 
  Lock, 
  Mail,
  Code,
  FileText,
  Users,
  Globe,
  Calendar,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const PrivacyPolicyPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const lastUpdated = 'December 25, 2024';
  const effectiveDate = 'January 1, 2024';

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: Eye,
      color: 'bg-blue-500 dark:bg-blue-600'
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FileText,
      color: 'bg-green-500 dark:bg-green-600'
    },
    {
      id: 'information-use',
      title: 'How We Use Information',
      icon: Users,
      color: 'bg-purple-500 dark:bg-purple-600'
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Globe,
      color: 'bg-orange-500 dark:bg-orange-600'
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      color: 'bg-red-500 dark:bg-red-600'
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: CheckCircle,
      color: 'bg-indigo-500 dark:bg-indigo-600'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Mail,
      color: 'bg-teal-500 dark:bg-teal-600'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header />

      {/* Theme Toggle Button */}
      <div className="fixed top-20 right-4 z-40">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 dark:text-blue-200 max-w-2xl mx-auto mb-6">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-blue-100 dark:text-blue-200">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Last updated: {lastUpdated}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Effective: {effectiveDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white/50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-foreground dark:text-white mb-4 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Button
                  key={section.id}
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection(section.id)}
                  className="flex flex-col items-center p-3 h-auto hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-200 dark:hover:border-blue-600 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                >
                  <div className={`w-8 h-8 rounded-lg ${section.color} flex items-center justify-center mb-2`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-center leading-tight text-foreground dark:text-white">{section.title}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Overview */}
          <Card id="overview" className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg dark:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-foreground dark:text-white">
                <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span>Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
                At TechInsights, we are committed to protecting your privacy and ensuring the security 
                of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you visit our website or use our services.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Important Notice</p>
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      By accessing or using our website, you agree to the collection and use of information 
                      in accordance with this policy. If you do not agree with our policies and practices, 
                      please do not use our services.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card id="information-collection" className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg dark:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-foreground dark:text-white">
                <div className="w-10 h-10 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground dark:text-white mb-3 flex items-center">
                  <Badge variant="outline" className="mr-2 border-gray-300 dark:border-gray-600 text-foreground dark:text-white">Personal Information</Badge>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground dark:text-white">Contact Details</h4>
                    <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-1">
                      <li>• Name and email address</li>
                      <li>• Phone number (if provided)</li>
                      <li>• Mailing address (if provided)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground dark:text-white">Account Information</h4>
                    <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-1">
                      <li>• Username and password</li>
                      <li>• Profile information</li>
                      <li>• Subscription preferences</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground dark:text-white mb-3 flex items-center">
                  <Badge variant="outline" className="mr-2 border-gray-300 dark:border-gray-600 text-foreground dark:text-white">Automatically Collected</Badge>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground dark:text-white">Usage Data</h4>
                    <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-1">
                      <li>• Pages visited and time spent</li>
                      <li>• Click patterns and navigation</li>
                      <li>• Search queries and interactions</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground dark:text-white">Technical Data</h4>
                    <ul className="text-sm text-muted-foreground dark:text-gray-300 space-y-1">
                      <li>• IP address and location data</li>
                      <li>• Browser type and version</li>
                      <li>• Device and operating system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card id="information-use" className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg dark:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-foreground dark:text-white">
                <div className="w-10 h-10 bg-purple-500 dark:bg-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span>How We Use Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Service Provision</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Provide, maintain, and improve our website and services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Communication</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Send newsletters, updates, and respond to inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Personalization</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Customize content and improve user experience</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Analytics</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Understand usage patterns and improve our content</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Security</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Protect against fraud, abuse, and security threats</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Legal Compliance</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Comply with applicable laws and regulations</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card id="information-sharing" className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg dark:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-foreground dark:text-white">
                <div className="w-10 h-10 bg-orange-500 dark:bg-orange-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span>Information Sharing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="font-semibold text-green-900 dark:text-green-200">We do not sell your personal information</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground dark:text-white mb-2">Limited Sharing Circumstances:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium text-foreground dark:text-white">Service Providers:</span>
                        <span className="text-muted-foreground dark:text-gray-300 ml-1">Trusted third parties who assist in website operations</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium text-foreground dark:text-white">Legal Requirements:</span>
                        <span className="text-muted-foreground dark:text-gray-300 ml-1">When required by law or to protect rights and safety</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium text-foreground dark:text-white">Business Transfers:</span>
                        <span className="text-muted-foreground dark:text-gray-300 ml-1">In connection with mergers, acquisitions, or asset sales</span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium text-foreground dark:text-white">Your Consent:</span>
                        <span className="text-muted-foreground dark:text-gray-300 ml-1">With your explicit permission for specific purposes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card id="data-security" className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg dark:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-foreground dark:text-white">
                <div className="w-10 h-10 bg-red-500 dark:bg-red-600 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <span>Data Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-gray-300 mb-6">
                We implement comprehensive security measures to protect your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Encryption</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Data encrypted in transit and at rest</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Access Controls</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Strict authentication and authorization</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Monitoring</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Continuous security monitoring and updates</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Staff Training</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Regular security awareness training</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-yellow-900 dark:text-yellow-200 mb-1">Security Disclaimer</p>
                    <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                      While we implement industry-standard security measures, no method of transmission 
                      over the internet is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card id="your-rights" className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg dark:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-foreground dark:text-white">
                <div className="w-10 h-10 bg-indigo-500 dark:bg-indigo-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span>Your Rights and Choices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-gray-300 mb-6">
                You have the following rights regarding your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Access</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Request access to your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Correction</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Request correction of inaccurate information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Deletion</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Request deletion of your personal information</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Portability</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Request a copy of your data in portable format</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Opt-out</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Unsubscribe from marketing communications</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground dark:text-white">Objection</h4>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Object to certain processing activities</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg">
                <p className="text-sm text-indigo-800 dark:text-indigo-300">
                  <strong>How to Exercise Your Rights:</strong> Contact us using the information below. 
                  We will respond to your request within 30 days and may require verification of your identity.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card id="contact" className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl text-white">
                <div className="w-10 h-10 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span>Contact Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 dark:text-blue-200 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-200" />
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-blue-100 dark:text-blue-200">privacy@techinsights.dev</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-blue-200" />
                    <div>
                      <p className="font-medium text-white">Website</p>
                      <Link href="/contact" className="text-blue-100 dark:text-blue-200 hover:text-white underline">
                        Contact Form
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-200" />
                    <div>
                      <p className="font-medium text-white">Response Time</p>
                      <p className="text-blue-100 dark:text-blue-200">Within 30 days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-blue-200" />
                    <div>
                      <p className="font-medium text-white">Data Protection Officer</p>
                      <p className="text-blue-100 dark:text-blue-200">dpo@techinsights.dev</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-white dark:text-blue-700 dark:hover:bg-gray-200">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 dark:hover:text-blue-700">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Back to Blog
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg dark:shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-foreground dark:text-white">Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground dark:text-white mb-2">Changes to This Privacy Policy</h4>
                  <p className="text-muted-foreground dark:text-gray-300 text-sm leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices 
                    or applicable laws. We will notify you of any material changes by posting the updated 
                    policy on our website and updating the "Last updated" date. Your continued use of our 
                    website after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 border-t border-slate-800 dark:border-slate-700">
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
              © 2024 TechInsights. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;