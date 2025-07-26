'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterSignup({ 
  title = "Join the Story Circle",
  description = "Get early access to new stories, writing tips, and exclusive behind-the-scenes content delivered to your inbox.",
  inline = false,
  size = "default" // "default" | "compact" | "large"
}) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);

    try {
      // In a real implementation, this would connect to Ghost's Members API
      // For now, we'll simulate the subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Newsletter subscription:', email);
      
      toast.success('Welcome! You\'ve been subscribed to our newsletter.');
      setIsSubscribed(true);
      setEmail('');
      
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`${inline ? 'inline-flex items-center gap-3' : 'text-center'}`}>
        <div className="flex items-center gap-2 text-sage-700 dark:text-sage-400">
          <Check className="h-5 w-5" />
          <span className="font-medium">Thanks for subscribing!</span>
        </div>
      </div>
    );
  }

  const content = (
    <form onSubmit={handleSubmit}>
      <div className={`${inline ? 'flex gap-3 items-end' : 'space-y-4'}`}>
        <div className={inline ? 'flex-1' : ''}>
          {!inline && (
            <label htmlFor="newsletter-email" className="block text-sm font-medium text-coffee-800 dark:text-cream-200 mb-2">
              Email Address
            </label>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500 dark:text-cream-500" />
            <Input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={isSubscribing}
              className={`pl-10 input ${inline ? 'text-center sm:text-left' : ''}`}
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubscribing}
          className={`btn-primary group ${inline ? 'whitespace-nowrap' : 'w-full'}`}
          size={size === "compact" ? "sm" : "default"}
        >
          {isSubscribing ? (
            'Subscribing...'
          ) : (
            <>
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
      
      {!inline && (
        <p className="text-xs text-coffee-500 dark:text-cream-500 mt-3 text-center">
          No spam, ever. Unsubscribe with one click anytime.
        </p>
      )}
    </form>
  );

  if (inline) {
    return content;
  }

  return (
    <Card className="border-coffee-200 dark:border-coffee-700 bg-card/80 backdrop-blur-sm">
      <CardContent className={`${size === "large" ? "p-8" : size === "compact" ? "p-4" : "p-6"}`}>
        {title && (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Mail className="h-6 w-6 text-amber-700 dark:text-amber-400" />
              </div>
            </div>
            
            <h3 className={`font-serif font-semibold text-coffee-900 dark:text-cream-100 mb-2 ${
              size === "large" ? "text-2xl" : size === "compact" ? "text-lg" : "text-xl"
            }`}>
              {title}
            </h3>
            
            {description && (
              <p className={`text-coffee-600 dark:text-cream-300 ${
                size === "large" ? "text-base" : "text-sm"
              }`}>
                {description}
              </p>
            )}
          </div>
        )}
        
        {content}
      </CardContent>
    </Card>
  );
} 