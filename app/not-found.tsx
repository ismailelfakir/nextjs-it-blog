'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechInsights
              </h1>
              <p className="text-sm text-muted-foreground">IT Blog & Technology News</p>
            </div>
          </Link>
        </div>
      </header>

      {/* 404 Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-md mx-auto px-4 text-center">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
                <p className="text-muted-foreground">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.history.back()} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Looking for something specific?
                </p>
                <Link href="/blog">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Articles
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}