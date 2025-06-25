import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import { stripHtmlTags, truncateText } from '@/lib/content-utils';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get latest 50 posts for RSS feed
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const buildDate = new Date().toUTCString();

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>TechInsights - IT Blog &amp; Technology News</title>
    <description>Explore the latest in technology, programming, and IT insights. Your go-to source for tech trends, tutorials, and industry analysis.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/favicon.ico</url>
      <title>TechInsights</title>
      <link>${baseUrl}</link>
    </image>
    ${posts.map(post => {
      const plainTextContent = stripHtmlTags(post.content);
      const description = truncateText(plainTextContent, 300);
      const pubDate = new Date(post.createdAt).toUTCString();
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>admin@techinsights.com (TechInsights Admin)</author>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>`;
    }).join('')}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}