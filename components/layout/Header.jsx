'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, Home, User, Mail, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Blog', href: '/blog', icon: PenTool },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container section-padding">
        <div className="flex items-center justify-between">
          {/* Logo / Site Name */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-coffee-700" />
              <span className="text-xl font-serif font-bold text-coffee-900 dark:text-cream-100">
                {SITE_CONFIG.author}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-coffee-700 hover:text-coffee-900 dark:text-cream-300 dark:hover:text-cream-100 
                         font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Newsletter CTA - Desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/#newsletter">
              <Button variant="outline" size="sm" className="btn-outline">
                Newsletter
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-coffee-700 dark:text-cream-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                  <BookOpen className="h-8 w-8 text-coffee-700" />
                  <span className="text-xl font-serif font-bold text-coffee-900 dark:text-cream-100">
                    {SITE_CONFIG.author}
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-coffee-700 dark:text-cream-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-coffee-700 hover:bg-cream-100 
                                 dark:text-cream-300 dark:hover:bg-coffee-800 font-medium transition-colors 
                                 duration-200 flex items-center space-x-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="/#newsletter"
                      className="-mx-3 block rounded-lg px-3 py-2.5 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full btn-primary">
                        Subscribe to Newsletter
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 