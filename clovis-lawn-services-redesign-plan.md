# Clovis Lawn Services — Website Redesign Plan
## Competitive Audit + Multi-Step Execution Plan for Claude Code

---

## PART 1: DEEP COMPETITIVE AUDIT

### Current Site: clovislawnservices.com

**What exists today:**
- Single-page site with anchor links: Hero → Services → Pricing → Gallery → Contact
- Owner: Tyler Shaw
- Service areas: Clovis, Fresno, Madera Ranchos
- 5 services: Mowing, Aeration/Overseeding, Leaf Removal, Irrigation Check, Artificial Turf Cleaning
- Transparent pricing listed (Weekly $65, Biweekly $80, Monthly $110)
- Before/After gallery (6 images)
- Contact form + phone/email
- Refer-a-friend $20 bonus

**Critical SEO gaps:**
- No meta title/description optimization
- No structured data (LocalBusiness, Service schema)
- No H1/H2 hierarchy optimized for search intent
- No location-specific content targeting "lawn care Clovis CA", "lawn mowing Fresno", etc.
- No blog/content strategy
- No FAQ section (huge missed opportunity for featured snippets)
- No Google Reviews integration or trust signals
- No about/story section (Tyler Shaw's story is a competitive advantage)
- Missing: sitemap.xml, robots.txt, canonical tags, Open Graph tags

---

### Competitor 1: Cal Turf & Landscaping (calturfandlandscaping.com)

**Strengths (steal these ideas):**
- ✅ Strong hero with immediate lead capture form on homepage
- ✅ Google Guaranteed badge prominently displayed
- ✅ Google Reviews embedded with Trustindex widget (38 reviews, real names)
- ✅ Clear process section: "Contact → Consult → Construction" (3-step)
- ✅ Dedicated service subpages (Synthetic Turf, Residential, Commercial, Athletic)
- ✅ FAQ section with 12 questions (great for SEO featured snippets)
- ✅ About page with founder story (Jeff Finley & Mitch Menzes)
- ✅ Stats counters (Projects Completed, Happy Clients, Expert Employees)
- ✅ Platform trust logos (Google, Angi, Yelp, Facebook)
- ✅ Values/Mission/Vision statements
- ✅ Photo gallery with real project images

**Weaknesses (where Tyler can win):**
- ❌ No transparent pricing (Tyler has this — HUGE advantage)
- ❌ Bloated WordPress/Elementor site (slow load times, heavy DOM)
- ❌ Lazy-loaded images with base64 placeholders hurt LCP
- ❌ No blog content for organic SEO
- ❌ Repetitive content across pages
- ❌ "Do not submit if you are a marketer" on the form (unprofessional)
- ❌ No mobile-first scroll experience

---

### Competitor 2: Anderson Landscape by Design (andersonlandscapebydesign.com)

**Strengths (steal these ideas):**
- ✅ Heritage/legacy positioning: "Landscaping since 1970" (55 years)
- ✅ Blog with local SEO content (drought-tolerant landscaping Fresno, outdoor living Fresno)
- ✅ Dedicated testimonials page with location-tagged reviews
- ✅ Team member profiles with photos and bios
- ✅ Contractor's license number displayed prominently (#517223)
- ✅ Financing option (Acorn) — removes price objection
- ✅ "Budget Friendly Specials" section with fixed prices ($4,999, $4,499)
- ✅ 10 distinct services with icons (Design, Drought Tolerant, Shade Structures, Concrete, Water Features, Artificial Turf, Masonry, Lighting, Softscape, Irrigation)
- ✅ Before/After images on about page
- ✅ Persistent CTA: "We've Transformed Hundreds of Yards" on every page
- ✅ Service area boundaries clearly defined

**Weaknesses (where Tyler can win):**
- ❌ Blog posts are from July 2023 — stale, not updated
- ❌ Website feels dated (WordPress theme, basic design)
- ❌ No scroll animations or modern interactions
- ❌ No video content
- ❌ No Google Reviews widget (only manual testimonials)
- ❌ Accessibility widget (UserWay) but no actual accessibility implementation
- ❌ No schema markup visible

---

### KEY COMPETITIVE INSIGHTS — What Tyler's Site MUST Have

| Section | Cal Turf | Anderson | Tyler (Current) | Tyler (Redesign) |
|---------|----------|----------|-----------------|------------------|
| Hero + Lead Form | ✅ | ✅ | ⚠️ (form at bottom) | ✅ Hero with embedded form |
| Trust Signals | ✅ Google Guaranteed | ✅ License # | ❌ None | ✅ Reviews + badges |
| Transparent Pricing | ❌ | ⚠️ Specials only | ✅ | ✅ Keep & enhance |
| Process Steps | ✅ 3-step | ❌ | ❌ | ✅ "How It Works" |
| FAQ | ✅ 12 questions | ❌ | ❌ | ✅ 8-10 questions |
| About/Story | ✅ | ✅ Heritage | ❌ | ✅ Tyler's story |
| Reviews/Social Proof | ✅ Google widget | ✅ Manual | ❌ | ✅ Google Reviews |
| Before/After Gallery | ✅ Photos | ✅ Photos | ✅ 6 images | ✅ Scroll-driven reveals |
| Blog/Content | ❌ | ✅ (stale) | ❌ | ✅ Plan for future |
| Schema/SEO | ❌ | ❌ | ❌ | ✅ Full implementation |
| Scroll Animations | ❌ | ❌ | ❌ | ✅ GSAP ScrollTrigger |
| Mobile Experience | ⚠️ | ⚠️ | ⚠️ | ✅ Mobile-first |

---

## PART 2: RECOMMENDED SITE SECTIONS (Priority Order)

### Section 1: Navigation (Sticky)
- Logo left, nav links center, "Get a Quote" CTA button right
- Phone number (559-389-2620) visible on desktop
- Transparent on hero, solid on scroll (GSAP ScrollTrigger class toggle)
- Mobile hamburger menu

### Section 2: Hero (Full-viewport, background image #1)
- Full-bleed lawn/landscape hero image (fixed background)
- H1: "Premium Lawn Care in Clovis, Fresno & Madera Ranchos"
- Subheading: "Locally owned by Tyler Shaw — mowing, aeration, cleanups & more, done right and on schedule."
- Two CTAs: "Get a Free Quote" (primary) + "See Pricing" (secondary/ghost)
- Subtle scroll indicator arrow at bottom

### Section 3: Trust Bar (Scrolls over hero image)
- Horizontal strip: "⭐ 5-Star Rated" | "Locally Owned & Operated" | "Same-Day Replies" | "No Contracts"
- Platform logos if applicable (Google, Nextdoor, etc.)

### Section 4: Services (Background image #2 revealed)
- H2: "Our Lawn Care Services"
- 5 service cards with icons, each with:
  - Service name, 2-3 sentence description
  - "Starting at $XX" where applicable
  - Subtle hover animation
- Content scrolls over a fixed background image of a freshly-mowed striped lawn

### Section 5: How It Works (3-step process)
- H2: "How It Works"
- Step 1: "Text or Call" → Step 2: "We Quote Same Day" → Step 3: "Your Lawn, Handled"
- Horizontal timeline with GSAP scroll-scrub animation
- Each step animates in as user scrolls

### Section 6: Pricing (Background image #3 revealed)
- H2: "Simple, Transparent Pricing"
- Pricing cards: Weekly / Biweekly / Monthly
- Add-ons listed below
- Refer-a-Friend callout box
- Content scrolls over fixed background of a beautiful Clovis backyard

### Section 7: Before & After Gallery (Scroll-driven)
- H2: "See the Difference"
- Before/After slider or stacked reveal with GSAP pin + scrub
- Each pair pins while user scrolls, revealing the transformation
- This is the showstopper scroll section

### Section 8: About Tyler (Background image #4 revealed)
- H2: "Meet Tyler Shaw"
- Photo of Tyler + brief story
- "Born and raised in the Central Valley" narrative
- Why he started the business, what he stands for
- Builds trust and personal connection (competitors have this, Tyler doesn't)

### Section 9: Testimonials / Reviews
- H2: "What Our Customers Say"
- Google Reviews embed or styled review cards
- Star ratings, customer names, locations
- Rotating/carousel or stacked scroll reveal

### Section 10: FAQ (SEO Gold Mine)
- H2: "Frequently Asked Questions"
- 8-10 questions with FAQ schema markup
- Questions to target:
  1. "How much does lawn mowing cost in Clovis?"
  2. "How often should I mow my lawn in Fresno?"
  3. "What does aeration and overseeding do?"
  4. "Do you offer one-time yard cleanups?"
  5. "What areas do you serve?"
  6. "Do I need a contract?"
  7. "How do I get a quote?"
  8. "What's included in a standard mowing visit?"

### Section 11: Service Areas
- H2: "Proudly Serving the Central Valley"
- Map or styled area list: Clovis, Fresno, Madera Ranchos
- Short paragraph with geo-targeted keywords

### Section 12: Contact / Quote Form (Background image #5 revealed)
- H2: "Get Your Free Quote Today"
- Form fields: Name, Phone, Email, Service Address, Service Interested In (dropdown), Message
- Honeypot spam field
- Phone number + email displayed prominently
- "We usually reply same day" trust line

### Section 13: Footer
- Business name, phone, email
- Service areas
- Quick links
- © 2026 Clovis Lawn Services
- "Proudly serving our neighbors in the Central Valley"

---

## PART 3: SEO IMPLEMENTATION CHECKLIST

### On-Page SEO
- [ ] Title tag: "Clovis Lawn Services | Premium Lawn Mowing & Care in Clovis, Fresno & Madera Ranchos"
- [ ] Meta description: "Locally owned lawn care by Tyler Shaw. Weekly mowing from $65, aeration, cleanups & more. Serving Clovis, Fresno & Madera Ranchos. Get a same-day quote!"
- [ ] H1: One per page, keyword-targeted
- [ ] H2s: Each section, semantically structured
- [ ] Alt tags on ALL images (descriptive, keyword-rich)
- [ ] Internal anchor links for navigation
- [ ] Canonical URL set
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags

### Structured Data (JSON-LD)
- [ ] LocalBusiness schema (name, address, phone, hours, geo, service area)
- [ ] Service schema for each service
- [ ] FAQPage schema for FAQ section
- [ ] AggregateRating schema (when reviews are available)
- [ ] BreadcrumbList schema

### Technical SEO
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] All images optimized (WebP format, compressed, lazy-loaded below fold)
- [ ] Hero image eager-loaded for LCP
- [ ] Preconnect to Google Fonts CDN
- [ ] Preload critical CSS
- [ ] Minified CSS/JS
- [ ] GZIP/Brotli compression
- [ ] Mobile-responsive (test at 320px, 375px, 768px, 1024px, 1440px)
- [ ] Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms

---

## PART 4: MULTI-STEP EXECUTION PLAN FOR CLAUDE CODE

### Prerequisites
- Tech stack: **Single-page HTML + CSS + JS** (easiest for Tyler to deploy anywhere — Netlify, Vercel, shared hosting)
- GSAP 3.14+ via CDN (free for standard use)
- ScrollTrigger plugin via CDN
- Google Fonts for typography
- All images as placeholders initially (Tyler swaps in real photos)

---

### STEP 1: Project Setup & File Structure
```
clovis-lawn-services/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── hero.jpg (placeholder)
│   │   ├── bg-services.jpg (placeholder)
│   │   ├── bg-pricing.jpg (placeholder)
│   │   ├── bg-about.jpg (placeholder)
│   │   ├── bg-contact.jpg (placeholder)
│   │   ├── gallery/ (before-after pairs)
│   │   └── tyler-headshot.jpg (placeholder)
│   ├── logo.png
│   └── icons/ (service icons as inline SVG)
├── robots.txt
└── sitemap.xml
```

**Instructions for Claude Code:**
1. Create this folder structure
2. Generate placeholder images using solid color blocks with text labels (e.g., "HERO IMAGE — Replace with lawn photo 1920x1080")
3. Create a `README.md` with image replacement instructions for Tyler

---

### STEP 2: HTML Skeleton with Full SEO Markup
Build `index.html` with:
1. Complete `<head>` section:
   - Meta charset, viewport
   - SEO title and meta description
   - Open Graph tags
   - Twitter Card tags
   - Canonical URL
   - Preconnect to fonts.googleapis.com and cdnjs.cloudflare.com
   - Google Fonts link (choose 2: one display/heading font, one body font — NO Inter, Roboto, or Arial)
   - CSS link
   - JSON-LD structured data scripts (LocalBusiness, FAQPage, Service schemas)

2. Semantic HTML structure:
   ```
   <header> — sticky nav
   <main>
     <section id="hero"> — full-viewport, background-image fixed
     <section id="trust-bar">
     <section id="services"> — background-image #2 container
     <section id="how-it-works">
     <section id="pricing"> — background-image #3 container
     <section id="gallery">
     <section id="about"> — background-image #4 container
     <section id="testimonials">
     <section id="faq">
     <section id="service-areas">
     <section id="contact"> — background-image #5 container
   </main>
   <footer>
   ```

3. Each "background image" section uses this pattern:
   ```html
   <div class="bg-panel" data-bg="assets/images/bg-services.jpg">
     <div class="bg-panel__image"></div>
     <div class="bg-panel__content">
       <!-- Actual section content here -->
     </div>
   </div>
   ```

---

### STEP 3: CSS — Design System & Layout
Build `css/styles.css` with:

1. **CSS Custom Properties** (design tokens):
   - Colors: primary green, dark green, cream/off-white, charcoal text, white
   - Font families: heading + body
   - Spacing scale (8px base)
   - Border radius, shadows, transitions

2. **Global resets and base typography**

3. **Background panel system:**
   ```css
   .bg-panel {
     position: relative;
   }
   .bg-panel__image {
     position: fixed; /* or sticky depending on GSAP approach */
     top: 0;
     left: 0;
     width: 100%;
     height: 100vh;
     background-size: cover;
     background-position: center;
     z-index: -1;
   }
   .bg-panel__content {
     position: relative;
     z-index: 1;
     background: rgba(255,255,255,0.95); /* content panels */
   }
   ```

4. **Component styles:** nav, hero, service cards, pricing cards, gallery, form, FAQ accordion, footer

5. **Responsive breakpoints:** 375px, 768px, 1024px, 1440px

6. **Animations:** Define initial states for GSAP (opacity: 0, transform offsets)

---

### STEP 4: GSAP ScrollTrigger Implementation
Build `js/main.js` with:

1. **Register GSAP + ScrollTrigger:**
   ```js
   gsap.registerPlugin(ScrollTrigger);
   ```

2. **Sticky Nav transform:**
   ```js
   ScrollTrigger.create({
     start: "top -80",
     toggleClass: { className: "nav--scrolled", targets: ".nav" }
   });
   ```

3. **Background Image Reveal System (THE KEY EFFECT):**
   For each `.bg-panel` section, use ScrollTrigger pin + scrub to:
   - Pin the background image in place
   - Let content scroll over it
   - Crossfade to next background image when content passes

   ```js
   // Pin each background image while its content section scrolls over it
   gsap.utils.toArray('.bg-panel').forEach((panel) => {
     ScrollTrigger.create({
       trigger: panel,
       start: "top top",
       end: "bottom top",
       pin: panel.querySelector('.bg-panel__image'),
       pinSpacing: false,
     });
   });
   ```

4. **Section content animations:**
   - Service cards: staggered fade-up on scroll enter
   - How It Works steps: sequential reveal with scrub
   - Pricing cards: scale-up entrance
   - Gallery before/after: horizontal wipe reveal pinned
   - Testimonials: fade-rotate carousel
   - FAQ: accordion with smooth height animation

5. **Smooth scroll for anchor links**

6. **Performance:**
   - Use `ScrollTrigger.batch()` for repeated elements
   - Use `will-change: transform` sparingly
   - Debounce resize handlers
   - Use `matchMedia` for mobile-specific animations (simpler on mobile)

---

### STEP 5: Content Population
Fill in all actual content:

1. **Services** — use the 5 services from current site with expanded descriptions
2. **Pricing** — exact pricing from current site
3. **FAQ** — write 8-10 SEO-optimized Q&A pairs
4. **About Tyler** — placeholder bio text (Tyler fills in real story)
5. **Testimonials** — placeholder cards (Tyler adds real reviews)
6. **Contact form** — working form with honeypot (can use Formspree, Netlify Forms, or custom endpoint)

---

### STEP 6: Structured Data & SEO Files
1. **JSON-LD in `<head>`:**
   - LocalBusiness schema with all Tyler's info
   - FAQPage schema matching the FAQ section
   - Service schema for each service offered

2. **robots.txt:**
   ```
   User-agent: *
   Allow: /
   Sitemap: https://www.clovislawnservices.com/sitemap.xml
   ```

3. **sitemap.xml:**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.clovislawnservices.com/</loc>
       <lastmod>2026-02-14</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

---

### STEP 7: Performance Optimization & Testing
1. Optimize all images (WebP with JPEG fallback)
2. Lazy-load below-fold images (`loading="lazy"`)
3. Eager-load hero image
4. Minify CSS and JS
5. Test all ScrollTrigger animations on:
   - Chrome, Firefox, Safari, Edge
   - iPhone SE, iPhone 14, iPad, Android
6. Validate HTML (W3C validator)
7. Test structured data (Google Rich Results Test)
8. Run Lighthouse audit (target 90+ on all metrics)
9. Test form submission

---

### STEP 8: Deployment Prep
1. Create `README.md` with:
   - How to replace placeholder images
   - How to update pricing
   - How to connect form to email (Formspree setup instructions)
   - How to deploy to Netlify/Vercel (drag-and-drop)
2. Zip the project folder for delivery

---

## PART 5: DESIGN DIRECTION NOTES

### Aesthetic: "Bold & Earthy Premium"
- **Primary green:** Deep, rich lawn green (#2D5016 range)
- **Accent:** Warm gold/amber (#D4A843 range)
- **Background:** Cream/warm white (#FAF8F5)
- **Text:** Rich charcoal (#1A1A1A)
- **Typography:** A strong serif or slab-serif for headings (e.g., "DM Serif Display", "Playfair Display", or "Fraunces") paired with a clean sans-serif body (e.g., "DM Sans", "Outfit", or "Plus Jakarta Sans")

### The Scroll Experience
The signature effect: as users scroll down, content panels (white/cream backgrounds with text) slide UP and OVER full-bleed landscape photography. Between sections, the background images are revealed — creating a "window" effect where each section break shows a stunning lawn/landscape photo.

Think of it like layers of paper sliding over a series of photographs laid underneath.

This creates visual drama, showcases Tyler's work, and keeps users scrolling — all while being buttery smooth with GSAP ScrollTrigger's optimized rendering.

---

## NOTES FOR CLAUDE CODE

- Start by reading this entire document before writing any code
- Build iteratively: HTML structure first, then CSS, then JS animations
- Test the scroll effect with placeholder colored backgrounds before adding real images
- The GSAP CDN links to use:
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  ```
- Every image must have descriptive alt text
- Every section must have a semantic heading (H2)
- Form must include honeypot field for spam prevention
- All animations must respect `prefers-reduced-motion` media query
- Mobile: simplify animations (no pinning on small screens — it causes jank)
