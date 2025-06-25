'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  BookOpen, 
  Menu, 
  Search, 
  ChevronDown,
  X,
  Tag,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories from posts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/posts?limit=100');
        const data = await response.json();
        
        if (data.success) {
          const tags = new Set<string>();
          data.data.forEach((post: any) => {
            post.tags.forEach((tag: string) => tags.add(tag));
          });
          setCategories(Array.from(tags).slice(0, 10)); // Limit to 10 categories
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  const handleCategoryClick = (category: string) => {
    window.location.href = `/blog?tag=${encodeURIComponent(category)}`;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Articles' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <header className={`border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechInsights
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">IT Blog & Technology News</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  Categories
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100"
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      {category}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled className="text-gray-500 dark:text-gray-400">
                    No categories available
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/categories" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100">
                    <Tag className="w-4 h-4 mr-2" />
                    View All Categories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Search, Theme Toggle and Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : theme === 'light' ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Monitor className="w-4 h-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                <DropdownMenuItem 
                  onClick={() => setTheme('light')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100"
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('dark')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100"
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('system')}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-gray-100"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <div className="hidden md:block">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    autoFocus
                  />
                  <Button type="submit" size="sm" variant="ghost" className="text-gray-700 dark:text-gray-300">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Subscribe Button */}
            <Link href="/subscribe" className="hidden md:block">
              <Button 
                size="sm" 
                className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
              >
                Subscribe
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden text-gray-700 dark:text-gray-300">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    />
                    <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800">
                      <Search className="w-4 h-4" />
                    </Button>
                  </form>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-medium transition-colors ${
                          isActiveLink(link.href)
                            ? 'text-purple-600 dark:text-purple-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Categories */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.slice(0, 8).map((category) => (
                        <Button
                          key={category}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleCategoryClick(category);
                            setIsMobileMenuOpen(false);
                          }}
                          className="justify-start text-xs bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {category}
                        </Button>
                      ))}
                    </div>
                    <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700 dark:text-gray-300">
                        View All Categories
                      </Button>
                    </Link>
                  </div>

                  {/* Mobile Subscribe */}
                  <Link href="/subscribe" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                    >
                      Subscribe
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}