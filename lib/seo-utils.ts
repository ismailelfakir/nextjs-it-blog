import { Metadata } from 'next';
import { stripHtmlTags, truncateText } from './content-utils';

interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateMetadata(data: SEOData): Metadata {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const siteName = 'TechInsights';
  
  const metadata: Metadata = {
    title: data.title,
    description: data.description,
    keywords: data.keywords?.join(', '),
    authors: data.author ? [{ name: data.author }] : [{ name: 'TechInsights Team' }],
    creator: 'TechInsights',
    publisher: 'TechInsights',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: data.type || 'website',
      title: data.title,
      description: data.description,
      url: data.url || baseUrl,
      siteName,
      images: [
        {
          url: data.image || `${baseUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [data.image || `${baseUrl}/og-default.jpg`],
      creator: '@techinsights',
      site: '@techinsights',
    },
    alternates: {
      canonical: data.url || baseUrl,
      types: {
        'application/rss+xml': [
          {
            title: `${siteName} RSS Feed`,
            url: `${baseUrl}/rss.xml`,
          },
        ],
      },
    },
    other: {
      'article:author': data.author || 'TechInsights Team',
      'article:section': 'Technology',
    },
  };

  // Add article-specific metadata
  if (data.type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: data.publishedTime,
      modifiedTime: data.modifiedTime,
      authors: [data.author || 'TechInsights Team'],
      section: 'Technology',
      tags: data.tags,
    };
  }

  return metadata;
}

export function generateBlogPostMetadata(post: {
  title: string;
  content: string;
  slug: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}): Metadata {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const description = truncateText(stripHtmlTags(post.content), 160);
  
  return generateMetadata({
    title: `${post.title} | TechInsights`,
    description,
    keywords: [...post.tags, 'technology', 'programming', 'IT', 'tech news'],
    url: `${baseUrl}/blog/${post.slug}`,
    type: 'article',
    publishedTime: new Date(post.createdAt).toISOString(),
    modifiedTime: new Date(post.updatedAt).toISOString(),
    author: 'TechInsights Admin',
    tags: post.tags,
  });
}

export function generateStructuredData(data: {
  type: 'Article' | 'WebSite' | 'Organization';
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  tags?: string[];
}) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  const baseStructuredData = {
    '@context': 'https://schema.org',
  };

  switch (data.type) {
    case 'Article':
      return {
        ...baseStructuredData,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        url: data.url,
        image: data.image || `${baseUrl}/og-default.jpg`,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        author: {
          '@type': 'Person',
          name: data.author || 'TechInsights Admin',
        },
        publisher: {
          '@type': 'Organization',
          name: 'TechInsights',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        keywords: data.tags?.join(', '),
        articleSection: 'Technology',
        inLanguage: 'en-US',
      };

    case 'WebSite':
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        name: 'TechInsights',
        description: 'IT Blog & Technology News',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/blog?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

    case 'Organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: 'TechInsights',
        description: 'IT Blog & Technology News',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          'https://twitter.com/techinsights',
          'https://linkedin.com/company/techinsights',
        ],
      };

    default:
      return baseStructuredData;
  }
}