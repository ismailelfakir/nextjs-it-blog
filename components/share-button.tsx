'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ShareButton({ 
  title, 
  url, 
  variant = "outline", 
  size = "sm",
  className = ""
}: ShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this article: ${title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        // You could show a toast notification here
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      className={`hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 ${className}`}
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </Button>
  );
}