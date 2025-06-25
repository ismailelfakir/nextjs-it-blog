import { NextResponse } from 'next/server';

export function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  const robotsTxt = `User-agent: *
Allow: /
Allow: /blog
Allow: /blog/*

# Disallow admin pages
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}