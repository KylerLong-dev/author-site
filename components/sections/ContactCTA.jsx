import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MessageCircle, Calendar, Coffee, Heart, PenTool } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function ContactCTA() {
  return (
    <section className="py-16 lg:py-24 bg-cream-100 dark:bg-coffee-800">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Newsletter signup */}
          <div className="mb-16">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-lg max-w-lg mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                  <PenTool className="h-6 w-6 text-amber-700 dark:text-amber-400" />
                </div>
              </div>
              
              <h3 className="text-xl font-serif font-semibold text-coffee-900 dark:text-cream-100 mb-2">
                Join the Story Circle
              </h3>
              <p className="text-coffee-600 dark:text-cream-300 text-sm mb-6">
                Get early access to new stories, writing tips, and exclusive content delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 border border-coffee-200 dark:border-coffee-600 rounded-lg
                           bg-background text-coffee-900 dark:text-cream-100 text-center sm:text-left
                           focus:outline-none focus:ring-2 focus:ring-coffee-500"
                />
                <Button className="btn-primary whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-xs text-coffee-500 dark:text-cream-500 mt-3">
                No spam, ever. Unsubscribe with one click anytime.
              </p>
            </div>
          </div>

          {/* Section header */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-coffee-100 dark:bg-coffee-900/30 rounded-full">
                <Heart className="h-6 w-6 text-coffee-700 dark:text-coffee-400" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-coffee-900 dark:text-cream-100 mb-6">
              Let's Connect
            </h2>
            <p className="text-coffee-600 dark:text-cream-300 max-w-2xl mx-auto text-lg leading-relaxed">
              I believe the best stories come from meaningful connections. 
              Whether you're a reader, fellow writer, or someone with a story to share, 
              I'd love to hear from you.
            </p>
          </div>

          {/* Main CTA */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-8 lg:p-12 shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
              Ready to Start a Conversation?
            </h3>
            
            <p className="text-coffee-600 dark:text-cream-300 mb-8 max-w-xl mx-auto">
              Whether you have a question about my books or want to discuss a collaboration, 
              I'm here to listen. Every great story starts with "Hello."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="btn-outline">
                <Link href={`mailto:${SITE_CONFIG.contact.email}`}>
                  <Coffee className="mr-2 h-5 w-5" />
                  Quick Email
                </Link>
              </Button>
            </div>
          </div>

          {/* Simple testimonial */}
          <div className="mt-12">
            <p className="text-coffee-500 dark:text-cream-500 text-sm italic">
              "The most beautiful stories are born from unexpected conversations over shared cups of coffee."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 