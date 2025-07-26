import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, MessageCircle, Coffee, Heart } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${SITE_CONFIG.author} for inquiries, collaborations, speaking engagements, or just to say hello.`,
  openGraph: {
    title: `Contact | ${SITE_CONFIG.author}`,
    description: `Get in touch with ${SITE_CONFIG.author} for inquiries, collaborations, speaking engagements, or just to say hello.`,
    url: `${SITE_CONFIG.url}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact | ${SITE_CONFIG.author}`,
    description: `Get in touch with ${SITE_CONFIG.author} for inquiries, collaborations, speaking engagements, or just to say hello.`,
  },
};

const contactReasons = [
  {
    icon: MessageCircle,
    title: 'General Inquiries',
    description: 'Questions about my books, writing process, or just want to say hello',
    color: 'coffee'
  },
  {
    icon: Coffee,
    title: 'Speaking Events',
    description: 'Book clubs, workshops, literary events, and author readings',
    color: 'sage'
  },
  {
    icon: Heart,
    title: 'Collaborations',
    description: 'Writing projects, interviews, podcasts, and partnership opportunities',
    color: 'amber'
  }
];

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 
                      dark:from-coffee-950 dark:via-coffee-900 dark:to-coffee-800">
        <div className="section-padding">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Mail className="h-12 w-12 text-coffee-700 dark:text-amber-400" />
              </div>
              
              <h1 className="text-display-xl font-serif font-bold text-coffee-900 dark:text-cream-100 mb-6">
                Let's Start a Conversation
              </h1>
              
              <p className="text-xl text-coffee-600 dark:text-cream-300 leading-relaxed max-w-3xl mx-auto">
                I believe the best stories come from meaningful connections. Whether you're a reader, 
                fellow writer, or someone with a story to share, I'd love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Reasons */}
      <div className="section-padding bg-sage-50 dark:bg-sage-900/20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-display-md font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
                Why People Reach Out
              </h2>
              <p className="text-coffee-600 dark:text-cream-300 max-w-2xl mx-auto">
                Here are some of the most common reasons people get in touch. 
                Whatever your reason, I'm here to listen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactReasons.map((reason, index) => (
                <Card key={index} className="border-coffee-200 dark:border-coffee-700 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className={`p-4 rounded-full inline-flex items-center justify-center mb-6 mx-auto
                      ${reason.color === 'coffee' ? 'bg-coffee-100 dark:bg-coffee-900/30' : ''}
                      ${reason.color === 'sage' ? 'bg-sage-100 dark:bg-sage-900/30' : ''}
                      ${reason.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' : ''}
                    `}>
                      <reason.icon className={`h-8 w-8
                        ${reason.color === 'coffee' ? 'text-coffee-700 dark:text-coffee-400' : ''}
                        ${reason.color === 'sage' ? 'text-sage-700 dark:text-sage-400' : ''}
                        ${reason.color === 'amber' ? 'text-amber-700 dark:text-amber-400' : ''}
                      `} />
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-coffee-900 dark:text-cream-100 mb-3">
                      {reason.title}
                    </h3>
                    
                    <p className="text-coffee-600 dark:text-cream-400 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="section-padding">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Form */}
              <div>
                <h2 className="text-display-md font-serif font-bold text-coffee-900 dark:text-cream-100 mb-6">
                  Send a Message
                </h2>
                <p className="text-coffee-600 dark:text-cream-400 mb-8">
                  Fill out the form below and I'll get back to you as soon as possible. 
                  I read every message personally.
                </p>
                
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-display-md font-serif font-bold text-coffee-900 dark:text-cream-100 mb-6">
                  Other Ways to Connect
                </h2>
                
                <div className="space-y-6 mb-8">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-coffee-100 dark:bg-coffee-900/30 rounded-full">
                      <Mail className="h-6 w-6 text-coffee-700 dark:text-coffee-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-coffee-900 dark:text-cream-100 mb-1">
                        Email
                      </h3>
                      <p className="text-coffee-600 dark:text-cream-400 text-sm mb-2">
                        For inquiries, collaborations, or just to say hello
                      </p>
                      <a 
                        href={`mailto:${SITE_CONFIG.contact.email}`}
                        className="text-coffee-700 dark:text-amber-400 hover:underline font-medium"
                      >
                        {SITE_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-sage-100 dark:bg-sage-900/30 rounded-full">
                      <Phone className="h-6 w-6 text-sage-700 dark:text-sage-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-coffee-900 dark:text-cream-100 mb-1">
                        Phone
                      </h3>
                      <p className="text-coffee-600 dark:text-cream-400 text-sm mb-2">
                        For urgent matters or interview requests
                      </p>
                      <a 
                        href={`tel:${SITE_CONFIG.contact.phone}`}
                        className="text-coffee-700 dark:text-amber-400 hover:underline font-medium"
                      >
                        {SITE_CONFIG.contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                      <Clock className="h-6 w-6 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-coffee-900 dark:text-cream-100 mb-1">
                        Response Time
                      </h3>
                      <p className="text-coffee-600 dark:text-cream-400 text-sm">
                        I typically respond within 24-48 hours. Thank you for your patience!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6 border-t border-coffee-200 dark:border-coffee-700">
                  <h3 className="font-semibold text-coffee-900 dark:text-cream-100 mb-4">
                    Follow the Journey
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="sm" className="btn-outline">
                      <a href={`https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                        Twitter
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="btn-outline">
                      <a href={`https://instagram.com/${SITE_CONFIG.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="btn-outline">
                      <a href={`https://facebook.com/${SITE_CONFIG.social.facebook}`} target="_blank" rel="noopener noreferrer">
                        Facebook
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="btn-outline">
                      <a href={`https://goodreads.com/${SITE_CONFIG.social.goodreads}`} target="_blank" rel="noopener noreferrer">
                        Goodreads
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="section-padding bg-amber-50 dark:bg-amber-900/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-display-md font-serif font-bold text-coffee-900 dark:text-cream-100 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-coffee-600 dark:text-cream-300">
                Quick answers to common questions I receive.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-coffee-200 dark:border-coffee-700">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-coffee-900 dark:text-cream-100 mb-3">
                    Do you accept unsolicited manuscripts for review?
                  </h3>
                  <p className="text-coffee-600 dark:text-cream-400 text-sm">
                    While I appreciate fellow writers sharing their work, I'm unable to review unsolicited manuscripts 
                    due to time constraints and legal considerations. I encourage you to seek feedback through 
                    writing groups, beta readers, or professional editing services.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-coffee-200 dark:border-coffee-700">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-coffee-900 dark:text-cream-100 mb-3">
                    Are you available for speaking events?
                  </h3>
                  <p className="text-coffee-600 dark:text-cream-400 text-sm">
                    Yes! I love connecting with readers and fellow writers. I'm available for book clubs, 
                    library events, writing workshops, and literary festivals. Please use the contact form 
                    above with details about your event.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-coffee-200 dark:border-coffee-700">
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-coffee-900 dark:text-cream-100 mb-3">
                    How can I stay updated on your latest work?
                  </h3>
                  <p className="text-coffee-600 dark:text-cream-400 text-sm">
                    The best way is to subscribe to my newsletter! You'll get updates on new releases, 
                    behind-the-scenes content, and exclusive stories. You can also follow me on social media 
                    for more frequent updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 