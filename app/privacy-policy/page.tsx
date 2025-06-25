import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Shield, 
  Eye, 
  Lock, 
  Mail,
  Code
} from 'lucide-react';
import { generateMetadata } from '@/lib/seo-utils';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy - TechInsights',
  description: 'Learn how TechInsights collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  keywords: ['privacy policy', 'data protection', 'techinsights privacy', 'personal information', 'data security'],
  type: 'website',
});

export default function PrivacyPolicyPage() {
  const lastUpdated = 'December 25, 2024';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Privacy{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, 
              and protect your personal information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Overview */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                  <span>Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  At TechInsights, we are committed to protecting your privacy and ensuring the security 
                  of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you visit our website or use our services.
                </p>
                <p>
                  By accessing or using our website, you agree to the collection and use of information 
                  in accordance with this policy. If you do not agree with our policies and practices, 
                  please do not use our services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-green-600" />
                  <span>Information We Collect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <h3>Personal Information</h3>
                <p>We may collect the following types of personal information:</p>
                <ul>
                  <li><strong>Contact Information:</strong> Name, email address, and other contact details when you subscribe to our newsletter or contact us</li>
                  <li><strong>Account Information:</strong> Username, password, and profile information if you create an account</li>
                  <li><strong>Communication Data:</strong> Messages, comments, and feedback you send to us</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you visit our website, we automatically collect certain information:</p>
                <ul>
                  <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and navigation patterns</li>
                  <li><strong>Device Information:</strong> Browser type, operating system, and device characteristics</li>
                  <li><strong>Log Data:</strong> IP address, access times, and referring URLs</li>
                  <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience</li>
                </ul>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <span>How We Use Your Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>We use the collected information for the following purposes:</p>
                <ul>
                  <li><strong>Service Provision:</strong> To provide, maintain, and improve our website and services</li>
                  <li><strong>Communication:</strong> To respond to your inquiries, send newsletters, and provide customer support</li>
                  <li><strong>Personalization:</strong> To customize your experience and provide relevant content</li>
                  <li><strong>Analytics:</strong> To understand how our website is used and improve our content</li>
                  <li><strong>Security:</strong> To protect against fraud, abuse, and security threats</li>
                  <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle>Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                <ul>
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction. 
                  These measures include:
                </p>
                <ul>
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection practices</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or electronic storage is 100% secure. 
                  While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle>Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>We use cookies and similar tracking technologies to enhance your experience:</p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences. However, disabling 
                  certain cookies may affect website functionality.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>You have the following rights regarding your personal information:</p>
                <ul>
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.</p>
                <p>We may also use third-party services for analytics, advertising, and other purposes. These services may collect information about your use of our website.</p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Our website is not intended for children under the age of 13. We do not knowingly 
                  collect personal information from children under 13. If we become aware that we have 
                  collected personal information from a child under 13, we will take steps to delete 
                  such information promptly.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or applicable laws. We will notify you of any material changes by posting the updated 
                  policy on our website and updating the "Last updated" date.
                </p>
                <p>
                  Your continued use of our website after any changes indicates your acceptance of the 
                  updated Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <Mail className="w-6 h-6" />
                  <span>Contact Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="space-y-2 text-blue-100">
                  <p><strong>Email:</strong> privacy@techinsights.dev</p>
                  <p><strong>Website:</strong> <Link href="/contact" className="text-white hover:underline">Contact Form</Link></p>
                </div>
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