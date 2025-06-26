import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { ThemeProvider } from '@/components/theme-provider';
import { generateMetadata, generateStructuredData } from '@/lib/seo-utils';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

// SEO metadata for the website
export const metadata: Metadata = generateMetadata({
  title: 'TechInsights - IT Blog & Technology News',
  description: 'Explore the latest in technology, programming, and IT insights. Your go-to source for tech trends, tutorials, and industry analysis.',
  keywords: ['technology', 'programming', 'IT', 'software development', 'tech news', 'tutorials', 'web development', 'cybersecurity'],
  type: 'website',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data for SEO
  const websiteStructuredData = generateStructuredData({
    type: 'WebSite',
  });

  const organizationStructuredData = generateStructuredData({
    type: 'Organization',
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href={process.env.NEXTAUTH_URL || 'http://localhost:3000'}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="TechInsights RSS Feed"
          href="/rss.xml"
        />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            {/* Toast notifications for user feedback */}
            <Toaster richColors position="top-right" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}