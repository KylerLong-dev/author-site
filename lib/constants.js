// Site configuration constants
export const SITE_CONFIG = {
  name: "Doug's Portfolio",
  author: "Doug Long", // Update with actual author name
  description: "A professional author portfolio showcasing travels, blog posts, and literary work",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  social: {
    twitter: "@authorhandle",
    instagram: "@authorhandle", 
    facebook: "authorpage",
    linkedin: "authorprofile",
    goodreads: "authorprofile"
  },
  contact: {
    email: "author@example.com",
    phone: "(555) 123-4567"
  }
};

export const GHOST_CONFIG = {
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v5.0"
};

// ISR revalidation times (in seconds)
export const REVALIDATION = {
  posts: 60,        // 1 minute for blog posts
  pages: 300,       // 5 minutes for pages
  site: 3600        // 1 hour for site settings
};

// Pagination settings
export const PAGINATION = {
  postsPerPage: 9,
  relatedPosts: 3
};

// Featured works data (placeholder content)
export const FEATURED_WORKS = [
  {
    id: 1,
    title: "The Coffee House Chronicles",
    description: "A heartwarming tale of community, love, and the perfect cup of coffee that brings people together in a small mountain town.",
    image: "/images/book-1.jpg", // Placeholder image
    type: "Novel",
    year: "2023",
    status: "Published",
    links: {
      amazon: "#",
      goodreads: "#",
      bookshop: "#"
    }
  },
  {
    id: 2,
    title: "Autumn Leaves & Second Chances",
    description: "A collection of short stories exploring themes of redemption, forgiveness, and new beginnings set against autumn landscapes.",
    image: "/images/book-2.jpg", // Placeholder image
    type: "Short Story Collection", 
    year: "2022",
    status: "Published",
    links: {
      amazon: "#",
      goodreads: "#",
      bookshop: "#"
    }
  },
  {
    id: 3,
    title: "Whispers in the Garden",
    description: "An upcoming mystery novel about a garden that holds secrets from generations past, coming Spring 2024.",
    image: "/images/book-3.jpg", // Placeholder image
    type: "Mystery Novel",
    year: "2024",
    status: "Coming Soon",
    links: {
      preorder: "#",
      goodreads: "#"
    }
  }
];

// Default meta tags
export const DEFAULT_META = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  keywords: "author, books, writing, literature, blog, fiction, traveling, publications, short stories",
  ogImage: "/images/og-default.jpg"
}; 