import Link from 'next/link';
import { BookOpen, Mail, Twitter, Instagram, Facebook, Linkedin, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SITE_CONFIG } from '@/lib/constants';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Twitter',
      href: `https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}`,
      icon: Twitter,
    },
    {
      name: 'Instagram', 
      href: `https://instagram.com/${SITE_CONFIG.social.instagram.replace('@', '')}`,
      icon: Instagram,
    },
    {
      name: 'Facebook',
      href: `https://facebook.com/${SITE_CONFIG.social.facebook}`,
      icon: Facebook,
    },
    {
      name: 'LinkedIn',
      href: `https://linkedin.com/in/${SITE_CONFIG.social.linkedin}`,
      icon: Linkedin,
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-coffee-50 dark:bg-coffee-900 border-t border-coffee-200 dark:border-coffee-700">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-coffee-700 dark:text-amber-400" />
              <span className="text-xl font-serif font-bold text-coffee-900 dark:text-cream-100">
                {SITE_CONFIG.author}
              </span>
            </div>
            <p className="text-coffee-600 dark:text-cream-400 text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-coffee-900 dark:text-cream-100 font-serif font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-coffee-600 hover:text-coffee-800 dark:text-cream-400 
                             dark:hover:text-cream-200 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-coffee-900 dark:text-cream-100 font-serif font-semibold mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-coffee-600 dark:text-cream-400" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-coffee-600 hover:text-coffee-800 dark:text-cream-400 
                           dark:hover:text-cream-200 text-sm transition-colors duration-200"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <p className="text-coffee-600 dark:text-cream-400 text-sm">
                {SITE_CONFIG.contact.phone}
              </p>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="col-span-1">
            <h3 className="text-coffee-900 dark:text-cream-100 font-serif font-semibold mb-4">
              Stay Connected
            </h3>
            <p className="text-coffee-600 dark:text-cream-400 text-sm mb-4">
              Follow for updates on new books and blog posts.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-coffee-600 hover:text-coffee-800 dark:text-cream-400 
                           dark:hover:text-cream-200 transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8 bg-coffee-200 dark:bg-coffee-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-1 text-coffee-600 dark:text-cream-400 text-sm">
            <span>&copy; {currentYear} {SITE_CONFIG.author}. All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-1 text-coffee-600 dark:text-cream-400 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-amber-500 fill-current" />
            <span>and lots of coffee</span>
          </div>
        </div>

        {/* Additional Footer Note */}
        <div className="mt-6 pt-6 border-t border-coffee-200 dark:border-coffee-700">
          <p className="text-center text-coffee-500 dark:text-cream-500 text-xs">
            Powered by{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-coffee-700 dark:hover:text-cream-300 transition-colors duration-200"
            >
              Next.js
            </a>
            {' '}and{' '}
            <a 
              href="https://ghost.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-coffee-700 dark:hover:text-cream-300 transition-colors duration-200"
            >
              Ghost CMS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
} 