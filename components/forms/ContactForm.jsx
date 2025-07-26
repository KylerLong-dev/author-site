'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User, Mail, MessageSquare, Tag } from 'lucide-react';
import { toast } from 'sonner';

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'speaking', label: 'Speaking Event' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'media', label: 'Media/Interview' },
  { value: 'book-club', label: 'Book Club' },
  { value: 'other', label: 'Other' }
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!formData.subject.trim()) {
      toast.error('Please select a subject');
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, you would send this to your backend API
      // For now, we'll simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the form data (in production, this would be sent to your server)
      console.log('Contact form submission:', formData);
      
      toast.success('Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      toast.error('Something went wrong. Please try again or send an email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-coffee-200 dark:border-coffee-700 shadow-lg">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-coffee-800 dark:text-cream-200 mb-2">
              Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500 dark:text-cream-500" />
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={isSubmitting}
                className="pl-10 input"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-coffee-800 dark:text-cream-200 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500 dark:text-cream-500" />
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
                className="pl-10 input"
                required
              />
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-coffee-800 dark:text-cream-200 mb-2">
              Subject *
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-coffee-500 dark:text-cream-500" />
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground 
                         placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring 
                         transition-colors appearance-none"
                required
              >
                <option value="">Select a subject</option>
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-coffee-800 dark:text-cream-200 mb-2">
              Message *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-coffee-500 dark:text-cream-500" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your inquiry, project, or just say hello..."
                disabled={isSubmitting}
                rows={6}
                className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground 
                         placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring 
                         transition-colors resize-vertical"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary group"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="pt-4 border-t border-coffee-200 dark:border-coffee-700">
            <p className="text-xs text-coffee-500 dark:text-cream-500 text-center">
              Your information will be kept private and only used to respond to your inquiry. 
              I typically respond within 24-48 hours.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 