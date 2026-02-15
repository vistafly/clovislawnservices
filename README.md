# Clovis Lawn Services — Website

Premium single-page website for Clovis Lawn Services, built with HTML, CSS, and GSAP ScrollTrigger.

## Quick Start

Open `index.html` in a browser to preview. For the best experience (and to avoid CORS issues with images), use a local server:

```bash
# If you have Python installed:
python -m http.server 8000

# If you have Node.js installed:
npx serve .

# Then open http://localhost:8000
```

## Replacing Placeholder Images

Swap these files in `assets/images/` with your own photos:

| File | Recommended Size | Where It Shows |
|------|-----------------|----------------|
| `hero.jpg` | 1920x1080 | Hero section background |
| `bg-services.jpg` | 1920x1080 | Background revealed between hero and services |
| `bg-pricing.jpg` | 1920x1080 | Background revealed between services and pricing |
| `bg-about.jpg` | 1920x1080 | Background revealed between gallery and about |
| `bg-contact.jpg` | 1920x1080 | Background revealed between service areas and contact |

**Tips for best results:**
- Use landscape-oriented photos (wider than tall)
- Compress images before uploading — use [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/)
- WebP format is ideal, but JPEG works great too
- Keep file sizes under 500KB each for fast loading

## Updating Pricing

Open `index.html` and search for the pricing section (`id="pricing"`). Update the dollar amounts directly in the HTML. Also update the JSON-LD structured data in the `<head>` section to match.

## Connecting the Contact Form

The form is set up to work with [Formspree](https://formspree.io/):

1. Create a free account at [formspree.io](https://formspree.io/)
2. Create a new form and copy your form ID
3. In `index.html`, find the `<form>` tag and replace `YOUR_FORM_ID` in the action URL:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Form submissions will be emailed to your Formspree account email

**Alternative: Netlify Forms**
If deploying on Netlify, add `netlify` attribute to the form tag:
```html
<form name="contact" netlify>
```

## Deploying to Netlify (Easiest)

1. Go to [netlify.com](https://www.netlify.com/) and sign up
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the entire `clovis-lawn-services` folder
4. Your site will be live at a `.netlify.app` URL
5. Connect your custom domain `clovislawnservices.com` in Netlify settings

## Deploying to Vercel

1. Go to [vercel.com](https://vercel.com/) and sign up
2. Click "Add New Project" → "Import Git Repository" (or drag and drop)
3. Connect your domain in project settings

## File Structure

```
clovis-lawn-services/
├── index.html          ← Main website file
├── css/
│   └── styles.css      ← All styles
├── js/
│   └── main.js         ← GSAP animations & interactions
├── assets/
│   └── images/         ← All images (replace with your own)
├── robots.txt          ← SEO: tells search engines what to crawl
├── sitemap.xml         ← SEO: helps search engines find your pages
└── README.md           ← This file
```

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, flexbox, grid, responsive design
- **GSAP 3.12** — ScrollTrigger for scroll animations
- **Google Fonts** — DM Serif Display + Plus Jakarta Sans
- **Formspree** — contact form handling (no backend needed)

## SEO Features

- Full meta tags (title, description, Open Graph, Twitter Cards)
- JSON-LD structured data (LocalBusiness, Service, FAQPage schemas)
- Semantic HTML with proper heading hierarchy
- Alt text on all images
- robots.txt and sitemap.xml
- Canonical URL

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome for Android

---

© 2026 Clovis Lawn Services
