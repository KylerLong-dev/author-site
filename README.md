# Author Portfolio - Next.js & Ghost CMS

A modern, professional author portfolio website built with Next.js 14, designed to work with Ghost CMS as a headless backend. Features a warm, earthy design system perfect for authors and storytellers.

## 🌟 Features

- **Professional Design**: Warm, earthy color palette with typography optimized for readability
- **Ghost CMS Integration**: Headless CMS setup with ISR (Incremental Static Regeneration)
- **Mobile-First Responsive**: Optimized for all devices with Tailwind CSS
- **SEO Optimized**: Proper meta tags, Open Graph, and structured data
- **Performance**: Next.js 14 with App Router, optimized images, and static generation
- **Accessibility**: shadcn/ui components with proper ARIA labels

## 🏠 Pages & Features

### Homepage
- **Hero Section**: Author introduction with newsletter signup
- **About Summary**: Preview of author bio with link to full about page
- **Featured Works**: Showcase of published books and upcoming releases
- **Recent Blog Posts**: Latest 6 blog posts from Ghost CMS
- **Contact CTA**: Encouraging visitors to get in touch

### Blog System
- **Blog Listing**: Paginated posts with search and tag filtering
- **Individual Posts**: Full post pages with related posts and social sharing
- **Tag Filtering**: Browse posts by category
- **Reading Time**: Automatic calculation based on content

### About Page
- **Author Bio**: Pulls content from Ghost CMS
- **Professional Photo**: Author headshot with elegant styling
- **Writing Journey**: Timeline and philosophy sections
- **Call to Action**: Links to contact and newsletter

### Contact Page
- **Contact Form**: Functional form with validation and toast notifications
- **Contact Information**: Email, phone, and response time details
- **FAQ Section**: Answers to common questions
- **Social Media**: Links to all author platforms

## 🎨 Design System

### Color Palette (Earthy Theme)
- **Coffee/Brown**: Primary brand colors (50-950 scale)
- **Sage Green**: Secondary colors for accents
- **Amber/Honey**: Warm accent colors
- **Cream/Beige**: Neutral backgrounds and text

### Typography
- **Inter**: Clean, modern sans-serif for UI elements
- **Merriweather**: Elegant serif for headings and content
- **JetBrains Mono**: Monospace for code (if needed)

### Components
- **shadcn/ui**: Accessible, customizable component library
- **Custom Utility Classes**: `.btn-primary`, `.btn-secondary`, `.card`, `.section-padding`
- **Mobile-First**: Responsive grid system with careful attention to mobile UX

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- (Optional) Ghost CMS account

### Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd author-site
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3001](http://localhost:3001) to see the site.

3. **View with Mock Data**
   The site works immediately with realistic mock data. You'll see:
   - 3 sample blog posts
   - Complete author bio
   - Featured books showcase
   - Fully functional forms

### Ghost CMS Setup (Optional)

The site works perfectly with mock data, but you can connect Ghost CMS for content management:

1. **Create Ghost Site**
   - Sign up at [ghost.org](https://ghost.org) ($9/month)
   - Or self-host Ghost on your server

2. **Get API Credentials**
   - Ghost Admin → Settings → Integrations
   - Create "Author Portfolio Website" integration
   - Copy Content API Key and API URL

3. **Add Environment Variables**
   Create `.env.local`:
   ```env
   GHOST_API_URL=https://your-site.ghost.io
   GHOST_CONTENT_API_KEY=your_content_api_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. **Restart Development**
   ```bash
   npm run dev
   ```

See `GHOST_SETUP.md` for detailed instructions.

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & design tokens
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Homepage sections
│   ├── blog/              # Blog-specific components
│   └── forms/             # Contact & newsletter forms
├── lib/
│   ├── ghost.js           # Ghost CMS API functions
│   ├── constants.js       # Site configuration
│   └── utils.js           # Utility functions
└── public/                # Static assets
```

## 🛠 Customization

### Update Site Information
Edit `lib/constants.js`:
```javascript
export const SITE_CONFIG = {
  name: "Your Name",
  author: "Your Author Name",
  description: "Your description",
  contact: {
    email: "your@email.com",
    phone: "Your phone"
  },
  social: {
    twitter: "@yourhandle",
    // ... other social media
  }
};
```

### Modify Featured Books
Update `FEATURED_WORKS` in `lib/constants.js` with your actual books.

### Customize Colors
The design system uses CSS custom properties in `app/globals.css`. Modify the color values to match your brand.

### Add Pages
Create new pages in the `app/` directory following Next.js 14 App Router conventions.

## 📱 Mobile Optimization

The site is built mobile-first with:
- **Responsive Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Flexible Typography**: Scales from mobile to desktop
- **Touch-Friendly**: Proper button sizes and spacing
- **Fast Loading**: Optimized images and minimal JavaScript

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub/GitLab
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The site works on any Node.js hosting:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance

- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component with WebP
- **Static Generation**: ISR for dynamic content with 60s revalidation
- **Minimal JavaScript**: Primarily server-rendered with selective hydration

## 🔍 SEO Features

- **Meta Tags**: Comprehensive title, description, keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: Rich snippets for blog posts
- **Sitemap**: Auto-generated for search engines
- **RSS Feed**: Available through Ghost CMS

## 🎯 Author Workflow

1. **Write in Ghost**: Use Ghost's beautiful editor
2. **Auto-Sync**: Changes appear on site within 60 seconds
3. **Newsletter**: Manage subscribers through Ghost
4. **Analytics**: Connect Ghost to your preferred analytics

## 📞 Support

- **Ghost CMS**: [ghost.org/docs](https://ghost.org/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)

## 📝 License

This project is available under the MIT License. Feel free to use it for your author portfolio!

---

Built with ❤️ for authors who believe in the power of storytelling.
