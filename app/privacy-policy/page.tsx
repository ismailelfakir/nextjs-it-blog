import { generateMetadata } from '@/lib/seo-utils';
import type { Metadata } from 'next';
import PrivacyPolicyPageClient from './client';

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy - TechInsights',
  description: 'Learn how TechInsights collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  keywords: ['privacy policy', 'data protection', 'techinsights privacy', 'personal information', 'data security'],
  type: 'website',
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />;
}
