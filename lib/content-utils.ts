/**
 * Utility functions for content processing and formatting
 */

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function extractExcerpt(content: string, maxLength: number = 150): string {
  const plainText = stripHtmlTags(content);
  return truncateText(plainText, maxLength);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function estimateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const wordCount = getWordCount(stripHtmlTags(content));
  return Math.ceil(wordCount / wordsPerMinute);
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return 'Less than 1 min read';
  return `${minutes} min read`;
}

export function highlightSearchTerms(text: string, searchTerm: string): string {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

export function generateMetaDescription(content: string, maxLength: number = 160): string {
  const plainText = stripHtmlTags(content);
  const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  let description = '';
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (description.length + trimmedSentence.length + 1 <= maxLength) {
      description += (description ? ' ' : '') + trimmedSentence + '.';
    } else {
      break;
    }
  }
  
  return description || truncateText(plainText, maxLength);
}

export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}