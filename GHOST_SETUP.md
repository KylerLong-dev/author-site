# Ghost CMS Setup Guide

This author portfolio is designed to work with Ghost CMS as a headless backend. The site currently runs with mock data for development purposes.

## Setting Up Ghost CMS

### 1. Create a Ghost Site

You have several options:

**Option A: Ghost(Pro) - Recommended for non-technical users**
- Visit [ghost.org](https://ghost.org/pricing/)
- Sign up for a Ghost(Pro) account
- Choose a plan (starts at $9/month)
- Set up your site at `https://your-site.ghost.io`

**Option B: Self-hosted Ghost**
- Install Ghost on your own server
- Follow the [Ghost installation guide](https://ghost.org/docs/install/)

### 2. Get Your API Credentials

1. Log into your Ghost Admin panel
2. Go to **Settings** → **Integrations**
3. Click **Add custom integration**
4. Name it "Author Portfolio Website"
5. Copy the **Content API Key** (you'll need this)
6. Note your **API URL** (e.g., `https://your-site.ghost.io`)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
# Ghost CMS Configuration
GHOST_API_URL=https://your-ghost-site.ghost.io
GHOST_CONTENT_API_KEY=your_content_api_key_here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Restart Your Development Server

After adding the environment variables:

```bash
npm run dev
```

The site will now fetch real content from your Ghost CMS instead of using mock data.

## Setting Up Content in Ghost

### Required Pages

1. **About Page**
   - Create a new page with slug: `about`
   - Write your author bio and story
   - Add a featured image (your author photo)

### Blog Posts

- All published blog posts will automatically appear on your site
- Use tags to categorize your posts
- Featured images will be displayed in post cards
- Custom excerpts will be used if provided

### Navigation

The site navigation is hardcoded but you can customize it in:
- `components/layout/Header.jsx`
- `components/layout/Footer.jsx`

## Content Guidelines

### Writing Blog Posts

1. **Title**: Clear, engaging headlines
2. **Featured Image**: High-quality images (1200x630px recommended)
3. **Excerpt**: Write custom excerpts for better display
4. **Tags**: Use consistent tags for categorization
5. **SEO**: Fill in meta descriptions for better SEO

### Author Bio (About Page)

1. **Professional tone**: Balance personality with professionalism
2. **Story arc**: Include your writing journey
3. **Call to action**: End with invitation to connect
4. **Photo**: High-quality, professional author photo

## Features That Work With Ghost

- ✅ Blog post listing with pagination
- ✅ Individual blog post pages
- ✅ Tag filtering and search
- ✅ Author bio page
- ✅ SEO meta tags
- ✅ Social sharing
- ✅ Related posts
- ✅ Reading time calculation
- ✅ Newsletter integration (Ghost's built-in)

## Deployment

When deploying to Vercel:

1. Add environment variables in Vercel dashboard
2. Set up webhooks (optional) for automatic rebuilds
3. Configure custom domain
4. Test all Ghost CMS features

## Troubleshooting

**Common Issues:**

1. **API Key Invalid**: Double-check your Content API key
2. **Wrong URL**: Ensure API URL includes protocol (https://)
3. **Content Not Updating**: Clear Next.js cache or restart dev server
4. **Images Not Loading**: Check Ghost image URLs and CORS settings

**Need Help?**

- [Ghost Documentation](https://ghost.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- Check browser console for error messages 