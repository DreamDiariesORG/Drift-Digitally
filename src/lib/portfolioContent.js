/**
 * src/lib/portfolioContent.js
 *
 * Mock project case study data for the Portfolio page modal in FormHandler.js.
 */

export const PORTFOLIO_CONTENT = {
  // BRANDING PROJECTS
  "High-Growth E-Commerce Rebrand": {
    client: "Luminary Gold & Co.",
    service: "Branding & E-Commerce Web",
    year: "2026",
    deliverables: ["Brand Identity", "Shopify Store", "Packaging", "Meta Ad Creatives"],
    results: "+240% Sales Increase • 3.8x ROI on Ads • 45% Repeat Customer Rate",
    intro: "Transforming a traditional offline jewellery brand into a high-converting digital storefront with bespoke visual identity and seamless Shopify checkout.",
    overview: "Luminary Gold came to us with a 20-year retail heritage but zero digital presence. They needed a complete visual brand refresh and a custom digital store built for high-trust, high-ticket conversions.",
    challenge: "High-ticket luxury jewellery requires intense consumer trust. Standard e-commerce templates failed to communicate the hand-crafted value of their items, resulting in high bounce rates and low conversion.",
    solution: "We designed a bespoke brand identity system featuring rich velvet emerald & gold accents, paired with a custom Shopify site equipped with macro zoom, insured shipping badges, and virtual video consultations.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>240% Revenue Surge:</strong> Achieved in the first quarter post-launch through optimized conversion paths.</li>
  <li><strong>3.8x Return on Ad Spend:</strong> Designed high-performing social ad creative suites that lowered CAC by 32%.</li>
  <li><strong>Enhanced Customer Retention:</strong> Unboxed luxury packaging design increased social sharing and repeat orders.</li>
</ul>`
  },

  "Aesthetic Botanical Brand Kit": {
    client: "Verdant Alchemy",
    service: "Brand Identity & Package Design",
    year: "2026",
    deliverables: ["Hand-Drawn Logos", "Custom Pattern System", "Product Boxes", "Social Kit"],
    results: "Featured on Mindful Packaging • 5,000+ First Month Orders",
    intro: "Crafting a hand-illustrated, organic brand identity for an eco-conscious luxury skincare line.",
    overview: "Verdant Alchemy creates organic, botanical skincare formulas. They wanted a visual identity that felt authentic, soothing, and distinct from sterile corporate cosmetic brands.",
    challenge: "Standing out in the saturated skincare market required a visual identity that felt artisan and earth-connected without looking homemade.",
    solution: "Our studio developed a series of custom botanical line illustrations, paired with soft earthy typography and eco-friendly foil-stamped packaging.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Instant Market Distinction:</strong> Hand-drawn illustrations created an instantly recognizable aesthetic across Instagram and retail shelves.</li>
  <li><strong>Sold Out Initial Batch:</strong> Product packaging design helped sell out their 5,000-unit launch batch in under 30 days.</li>
  <li><strong>Featured Industry Pick:</strong> Recognized in top packaging design publications for sustainable luxury design.</li>
</ul>`
  },

  "Artisan Artisan Coffee Co. Identity": {
    client: "Roast & Origin Co.",
    service: "Brand Identity & Packaging",
    year: "2026",
    deliverables: ["Logo Suite", "Coffee Bag Packaging", "Merchandise", "Brand Guidelines"],
    results: "Distributed in 120+ Specialty Cafes • +180% Wholesale Revenue",
    intro: "Creating a bold typographic and illustrated identity for a specialty coffee roastery celebrating bean provenance.",
    overview: "Roast & Origin sources single-origin coffee beans directly from small-batch farmers. They required a visual system that conveyed craftsmanship, earthy tones, and premium positioning.",
    challenge: "Communicating complex coffee tasting notes and origin stories on compact retail coffee bags without cluttering the aesthetic.",
    solution: "We engineered a modular label system using minimalist typography, color-coded origin badges, and custom topographical foil prints.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>120+ Cafe Partnerships:</strong> Premium brand presentation unlocked wholesale accounts across major metro cities.</li>
  <li><strong>High Shelf Appeal:</strong> Distinctive tactile pouch materials won Packaging Design of the Year honors.</li>
</ul>`
  },

  "Minimalist Architecture Studio Branding": {
    client: "Spatial Atelier",
    service: "Visual Identity & Print Collateral",
    year: "2026",
    deliverables: ["Corporate Identity", "Monograph Book Design", "Business Cards", "Digital Guidelines"],
    results: "Attracted $15M+ Commercial Projects • Featured in Architectural Digest",
    intro: "Designing an ultra-clean, grid-driven visual identity for a high-end luxury architectural firm.",
    overview: "Spatial Atelier designs ultra-modern residential villas and boutique hotels. They needed branding that matched their architectural philosophy: precision, light, and minimal restraint.",
    challenge: "Creating a brand identity that steps back and lets the architectural photography shine while maintaining a strong luxury presence.",
    solution: "We constructed a monogram logo and monochrome print collateral with blind-embossed cardstock and architectural grid layouts.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>High-Net-Worth Client Attraction:</strong> Rebrand directly contributed to closing three multimillion-dollar villa commissions.</li>
  <li><strong>Architectural Digest Feature:</strong> Monograph portfolio book was highlighted in global design editorials.</li>
</ul>`
  },

  // WEB PROJECTS
  "Luxury Hospitality Website": {
    client: "Aura Resort & Spa",
    service: "Custom Next.js Web Development",
    year: "2026",
    deliverables: ["UX/UI Design", "Next.js Web App", "Booking Engine Integration", "Video Motion"],
    results: "+310% Direct Bookings • -40% OTA Commission Costs",
    intro: "Designing a fluid, immersive web portal for a luxury beach resort that turns visitors into direct bookings.",
    overview: "Aura Resort was relying heavily on third-party OTAs (Booking.com, Expedia) with high commission fees. They needed a high-speed, interactive direct booking engine.",
    challenge: "Combining high-resolution drone videos and 360-degree suite tours with sub-second page loading speeds and seamless mobile checkout.",
    solution: "Built a custom Next.js web experience featuring video background preloading, interactive room configurators, and instant WhatsApp concierge chat.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>310% Direct Booking Growth:</strong> Shifted guest acquisition away from commission-heavy OTA platforms.</li>
  <li><strong>Sub-Second Speed:</strong> Achieved a 99/100 Google Lighthouse Performance Score despite rich video assets.</li>
</ul>`
  },

  "Fintech SaaS Dashboard & Portal": {
    client: "Vanguard Pay",
    service: "Web Platform Development & UI",
    year: "2026",
    deliverables: ["Web Application", "Design System", "Interactive Analytics", "API Docs Portal"],
    results: "Processed $50M+ Transactions • 99.99% Uptime",
    intro: "Building a sleek, dark-mode financial dashboard for real-time payment tracking and merchant analytics.",
    overview: "Vanguard Pay offers cross-border transaction APIs for B2B enterprises. They needed a powerful, low-latency dashboard for finance teams.",
    challenge: "Displaying dense financial charts, live transaction streams, and multi-currency balances in a clean, stress-free user interface.",
    solution: "We designed a high-contrast dark glassmorphism web platform built on React, Tailwind, and WebSockets for zero-lag live data feeds.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Enterprise Customer Retention:</strong> High-speed UI reduced support tickets by 55% among merchant ops teams.</li>
  <li><strong>Flawless Scale:</strong> Processed over $50 Million in volume during high-traffic promotional periods.</li>
</ul>`
  },

  "Custom Shopify D2C Apparel Store": {
    client: "Velvet & Thread",
    service: "Shopify Plus Development",
    year: "2026",
    deliverables: ["Custom Liquid Theme", "Size Recommender Tool", "Cart Upsell System", "Mobile UX"],
    results: "+4.2% Conversion Rate • +35% Average Order Value",
    intro: "Developing an ultra-fast Shopify Plus store for a luxury streetwear label with custom sizing AI.",
    overview: "Velvet & Thread needed a modern e-commerce platform capable of handling flash-sale drops with thousands of concurrent checkout requests.",
    challenge: "High return rates due to sizing confusion on unisex apparel garments.",
    solution: "Integrated an interactive fit predictor tool and a one-click slide-out cart featuring dynamic free shipping progress bars.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Conversion Rate Spike:</strong> Pushed store conversion rate from 1.8% to a benchmark 4.2%.</li>
  <li><strong>Reduced Sizing Returns:</strong> AI size recommendation reduced fit-related garment returns by 60%.</li>
</ul>`
  },

  "Interactive Creative Agency Site": {
    client: "Nexus Digital Studio",
    service: "WebGL & 3D Web Development",
    year: "2026",
    deliverables: ["3D WebGL Interactions", "Custom Cursor Motion", "Case Study Engine", "CMS"],
    results: "Awwwards Site of the Day • +500k Organic Visitors",
    intro: "Crafting a WebGL-powered interactive web experience that showcases high-end motion design and interactive 3D elements.",
    overview: "Nexus Digital Studio wanted a flagship website that demonstrated their cutting-edge interactive capabilities to prospective Fortune 500 clients.",
    challenge: "Running 3D canvas shaders smoothly across mobile browsers without draining battery or causing lag.",
    solution: "Developed custom Three.js GPU shaders paired with smooth scroll physics and responsive layout containers.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Industry Recognition:</strong> Awarded Site of the Day on Awwwards and FWA.</li>
  <li><strong>Inbound Enterprise Leads:</strong> Generated 40+ high-budget enterprise RFPs in the first quarter post-launch.</li>
</ul>`
  },

  // ADS PROJECTS
  "Performance Ad Campaign & Funnel": {
    client: "Kira Fashion House",
    service: "Digital Growth & Performance Marketing",
    year: "2026",
    deliverables: ["Meta Ads", "Google Shopping", "Landing Pages", "Email Automation"],
    results: "$180k Generated in 60 Days • 4.2x ROAS",
    intro: "Scaling a direct-to-consumer fashion label using multi-channel performance ads and dynamic funnel optimization.",
    overview: "Kira Fashion House needed to scale their online customer acquisition while keeping their customer acquisition cost (CAC) manageable during seasonal launches.",
    challenge: "Ad fatigue and rising CPM costs on Meta platforms were eating into profit margins.",
    solution: "We built a multi-stage funnel featuring high-energy short-form video ads, retargeting testimonials, and dedicated fast-loading product landing pages.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>$180,000 Revenue:</strong> Generated across Meta and Google Search campaigns within 60 days of launch.</li>
  <li><strong>4.2x ROAS:</strong> Consistently maintained high return on ad spend across cold and warm audience segments.</li>
  <li><strong>+65% Email Signups:</strong> Integrated lead capture funnels that built a high-intent subscriber list of over 12,000 buyers.</li>
</ul>`
  },

  "Meta & TikTok Ad Scaling Strategy": {
    client: "GlowLab Beauty",
    service: "Paid Social & UGC Video Ads",
    year: "2026",
    deliverables: ["UGC Creator Management", "TikTok Spark Ads", "Meta Advantage+", "Creative Testing Matrix"],
    results: "3.5M Impressions • 4.6x Return on Ad Spend",
    intro: "Driving viral D2C acquisition through creator-led UGC video ads and rapid creative iteration.",
    overview: "GlowLab Beauty launched a revolutionary lip treatment oil and needed to reach Gen-Z and Millennial buyers on TikTok and Instagram Reels.",
    challenge: "Standard polished corporate ads were getting scrolled past instantly by younger demographics.",
    solution: "We produced a matrix of 30+ creator hook variations, problem-solution skits, and unboxing videos optimized for vertical feed formats.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Viral Scale:</strong> Generated over 3.5 million video views with a 24% click-through rate to checkout.</li>
  <li><strong>4.6x ROAS:</strong> Maintained high profitability across scale budgets exceeding $50k/month.</li>
</ul>`
  },

  "Omnichannel Multi-Platform Paid Campaign": {
    client: "Zenith Activewear",
    service: "Omnichannel Paid Media Strategy",
    year: "2026",
    deliverables: ["Google Search & PMax", "Meta Retargeting", "YouTube Shorts Ads", "Attribution Modeling"],
    results: "+165% New Customer Acquisition • 3.9x Blended ROAS",
    intro: "Unifying Meta, Google, and YouTube ad channels to capture high-intent activewear shoppers globally.",
    overview: "Zenith Activewear was running fragmented ad accounts across agencies with zero unified attribution data.",
    challenge: "Overlapping ad targeting was driving up customer acquisition costs and causing internal channel cannibalization.",
    solution: "Implemented a full-funnel media plan separating prospecting (YouTube/TikTok) from high-intent capture (Google PMax/Search) and bottom-funnel social retargeting.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>165% Customer Growth:</strong> Expanded net new buyer base while reducing overall CAC by 28%.</li>
  <li><strong>Clear Channel Attribution:</strong> Built real-time analytics dashboards for accurate ROAS tracking.</li>
</ul>`
  },

  "High-ROAS Google Shopping Campaign": {
    client: "Nordic Home Decor",
    service: "Google Shopping & Search Ads",
    year: "2026",
    deliverables: ["Google Shopping Feed Optimization", "Negative Keyword Strategy", "Brand Protection Ads"],
    results: "5.1x Shopping ROAS • +210% Search Revenue",
    intro: "Optimizing Google Shopping product feeds to capture high-intent home decor buyers.",
    overview: "Nordic Home Decor had a catalog of 2,000+ SKU items but was losing money on broad, non-converting Google Shopping search terms.",
    challenge: "Low feed quality scores and poor product title optimization were suppressing high-margin items.",
    solution: "Re-engineered product title schemas, added structured custom labels for profit margins, and built segmented Performance Max campaigns.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>5.1x Return on Ad Spend:</strong> Maximized ad spend efficiency on high-margin furniture lines.</li>
  <li><strong>Double Revenue Output:</strong> Increased monthly search ad revenue by 210% within 90 days.</li>
</ul>`
  },

  // SEO PROJECTS
  "Organic SEO Growth & Content Strategy": {
    client: "Apex Health & Wellness",
    service: "Technical SEO & Content Strategy",
    year: "2026",
    deliverables: ["Technical SEO Audit", "Cluster Content Strategy", "Schema Markup", "Link Building"],
    results: "+450% Organic Traffic • #1 Rankings for 85+ Keywords",
    intro: "Propelling an online wellness brand from page 5 to rank #1 on Google for high-intent health search terms.",
    overview: "Apex Health was struggling with low organic search visibility despite publishing dozens of generic blog posts.",
    challenge: "Google's EEAT (Experience, Expertise, Authoritativeness, Trustworthiness) updates downgraded low-quality health content.",
    solution: "Re-architected site architecture into medical topic clusters, added medical reviewer schemas, and built authoritative backlinks.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>450% Organic Traffic Surge:</strong> Grew monthly organic visits from 15,000 to over 82,000.</li>
  <li><strong>85+ Page 1 Google Rankings:</strong> Secured top positions for primary money-making search terms.</li>
</ul>`
  },

  "E-Commerce SEO Overhaul & Technical Fixes": {
    client: "Bespoke Leather Co.",
    service: "E-Commerce Technical SEO",
    year: "2026",
    deliverables: ["Faceted Navigation Fixes", "Page Speed Optimization", "Canonical Tagging", "Structured Data"],
    results: "+280% Organic Sales Revenue • -60% Crawl Waste",
    intro: "Eliminating duplicate content issues and optimizing faceted navigation for a 10,000 SKU leather goods store.",
    overview: "Bespoke Leather Co. suffered from severe indexation bloat caused by dynamic product filtering URLs.",
    challenge: "Googlebot was wasting crawl budget indexing millions of filter combinations instead of core product pages.",
    solution: "Implemented canonical URL rules, AJAX filter rendering, and clean XML sitemap indexing hierarchies.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>280% Organic Revenue Growth:</strong> Core category pages jumped to top 3 search positions.</li>
  <li><strong>Crawl Efficiency:</strong> Reduced crawl waste by 60%, ensuring new products rank within 24 hours.</li>
</ul>`
  },

  "Local SEO & Google Business Profile Campaign": {
    client: "Elite Dental Care Network",
    service: "Local SEO & Reputation Management",
    year: "2026",
    deliverables: ["Google Business Profile Optimization", "Local Citation Building", "Review Automation"],
    results: "+520% Local Map Pack Views • +190% Monthly Phone Leads",
    intro: "Dominating local Google Map Pack rankings for a multi-clinic dental healthcare network.",
    overview: "Elite Dental wanted to capture local patients searching for 'best cosmetic dentist near me' across 8 clinic locations.",
    challenge: "Inconsistent NAP (Name, Address, Phone) citations and dormant Google Business Profiles.",
    solution: "Optimized 8 Google Business Profiles with sub-categories, weekly Google posts, automated review requests, and localized landing pages.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>520% Local Visibility Growth:</strong> Secured top 3 Map Pack rankings across all 8 clinic territories.</li>
  <li><strong>190% Phone Call Surge:</strong> Directly generated over 450 new patient consultation calls monthly.</li>
</ul>`
  },

  "Global Enterprise SEO Scaled Engine": {
    client: "CloudScale B2B Platform",
    service: "International B2B Enterprise SEO",
    year: "2026",
    deliverables: ["Hreflang Internationalization", "Programmatic SEO Engine", "Core Web Vitals Fixes"],
    results: "+320% Enterprise Pipeline • Top 3 Rankings in US, UK, and APAC",
    intro: "Scaling global enterprise search visibility across 14 international market regions.",
    overview: "CloudScale needed a scalable SEO framework to expand their cloud management software into European and Asian markets.",
    challenge: "Managing complex hreflang language tags and localized search intent across different regions.",
    solution: "Engineered a programmatic SEO landing page system with dynamic language routing and localized case study content.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>320% Qualified Pipeline:</strong> Organic search became the #1 enterprise lead generation channel globally.</li>
  <li><strong>Global Domination:</strong> Achieved top rank positions in Google US, UK, Australia, and Singapore simultaneously.</li>
</ul>`
  },

  // STUDIO & WEDDING PROJECTS
  "Royalty & Heritage Wedding Suite": {
    client: "Ananya & Devraj",
    service: "Bespoke Art & Wedding Stationery",
    year: "2026",
    deliverables: ["Animated Video Invites", "Physical Boxed Suite", "RSVP Website", "Event Signage"],
    results: "500+ RSVPs Managed • 100% On-time Global Delivery",
    intro: "Creating a royal royal-blue and gold wedding suite featuring custom venue watercolor illustrations and an interactive guest portal.",
    overview: "Ananya & Devraj planned a destination wedding in Rajasthan and wanted an invitation experience that reflected the royal grandeur of the venue for international guests.",
    challenge: "Coordinating paper invitations, travel itineraries, and real-time RSVPs across 12 countries with complex dietary and accommodation requests.",
    solution: "We crafted custom hand-painted venue artwork, created a luxury 3D animated WhatsApp video invitation, and built an interactive guest management website.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Seamless Guest Portal:</strong> Collected 500+ guest RSVPs, dietary needs, and flight details automatically.</li>
  <li><strong>Tactile Craftsmanship:</strong> Hand-embossed letterpress cardstock with gold wax seals delivered globally.</li>
  <li><strong>Zero Loss Rate:</strong> Hybrid digital & physical delivery ensured every guest received their invite seamlessly.</li>
</ul>`
  },

  "Bespoke Hand-Illustrated Wedding Suite": {
    client: "Meera & Rohan",
    service: "Hand-Painted Fine Art & Boxed Invites",
    year: "2026",
    deliverables: ["Hand-Painted Maps", "Boxed Invitation", "Foil Stamping", "Monogram Seals"],
    results: "Featured in WedMeGood • 100% Delivery Success",
    intro: "Crafting bespoke artisan boxed wedding invitations with hand-drawn venue maps and gold leaf detailing.",
    overview: "Meera & Rohan wanted a physical keepsake invitation box for their palace wedding in Udaipur.",
    challenge: "Ensuring delicate foil-stamped acrylic inserts and custom wax seals survived international postal shipping.",
    solution: "We engineered custom rigid velvet boxes with padded interior slots and protective wax seal guards.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Flawless Physical Delivery:</strong> Shipped 350 luxury invitation boxes across 4 continents with zero breakage.</li>
  <li><strong>Social Media Buzz:</strong> Unboxing videos shared widely by wedding guests on Instagram.</li>
</ul>`
  },

  "Royal Destination Wedding & Guest Portal": {
    client: "Kavya & Siddharth",
    service: "Digital Video Invites & Concierge Portal",
    year: "2026",
    deliverables: ["3D Animated Video", "Concierge Web App", "Flight Tracking", "WhatsApp Bot"],
    results: "350+ Guest Schedules Managed • 99.8% Guest Satisfaction",
    intro: "Building a high-end digital invitation suite with 3D venue fly-through video and guest flight concierge.",
    overview: "Kavya & Siddharth hosted a 3-day destination wedding in Bali and needed real-time guest schedule coordination.",
    challenge: "Managing last-minute flight delay updates and dietary preferences for guests arriving across 15 flight routes.",
    solution: "Created an automated WhatsApp concierge integrated with a custom Next.js guest web app.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Automated Concierge:</strong> Handled over 1,200 guest itinerary queries automatically without manual delay.</li>
  <li><strong>Interactive Experience:</strong> 98% of guests completed RSVP and hotel preferences online within 7 days.</li>
</ul>`
  },

  "Fine Art Botanical Calligraphy Suite": {
    client: "Sophia & Julian",
    service: "Calligraphy & Cotton Paper Print",
    year: "2026",
    deliverables: ["Hand Calligraphy", "Handmade Cotton Paper", "Botanical Press", "Ribbon Ties"],
    results: "Featured in Vogue Weddings",
    intro: "Designing vintage-inspired organic cotton paper stationery with botanical press flowers and hand calligraphy.",
    overview: "Sophia & Julian held a vineyard wedding in Tuscany and required eco-friendly, artisan handcrafted stationery.",
    challenge: "Maintaining consistency across 250 individually hand-lettered calligraphy envelope suites.",
    solution: "Utilized custom ink mixing matching Italian cypress green and handmade deckle-edge rag paper.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Vogue Weddings Feature:</strong> Recognized in global wedding editorials for botanical print craftsmanship.</li>
  <li><strong>100% Eco-Friendly Materials:</strong> Sourced recycled cotton fibers and organic vegetable inks.</li>
</ul>`
  },

  "Luxe Velvet Gold Foil Event Stationery": {
    client: "Zoya & Armaan",
    service: "High-End Event Branding & Signage",
    year: "2026",
    deliverables: ["Acrylic Signage", "Menu Cards", "Seating Charts", "Monogram Wax Seals"],
    results: "1000+ Guest Gala • Flawless Execution",
    intro: "Creating dramatic black-and-gold acrylic event signage and velvet embossed dinner menus for a luxury reception gala.",
    overview: "Zoya & Armaan required full event branding for a 1,000-guest grand wedding reception.",
    challenge: "Guiding 1,000 guests smoothly to assigned banquet tables without bottleneck delays at reception entrances.",
    solution: "Designed illuminated laser-cut acrylic seating chart pillars paired with QR code seat finder kiosks.",
    impact: `<h3>Key Project Achievements</h3>
<ul>
  <li><strong>Seamless Crowd Flow:</strong> Reduced reception entry wait time by 75% for 1,000 attendees.</li>
  <li><strong>Elevated Aesthetic:</strong> Gold foil velvet menus added a memorable tactile touch to dinner tables.</li>
</ul>`
  }
};

export const PORTFOLIO_CONTENT_FALLBACK = {
  client: "Drift Client Partner",
  service: "Branding & Digital Growth",
  year: "2026",
  deliverables: ["Brand Identity", "Digital Strategy", "Web Development", "Growth Marketing"],
  results: "High ROI • Exceptional Engagement",
  intro: "A showcase of custom craft, strategic performance, and elevated digital experience built by Drift Digitally.",
  overview: "This project reflects our end-to-end approach to brand building — combining premium aesthetic design with data-driven growth strategies.",
  challenge: "Overcoming competitive noise and establishing strong market positioning through clear brand narrative and user-centric design.",
  solution: "We delivered a cohesive digital solution tailored to the client's growth goals, combining custom visual design with robust web architecture.",
  impact: `<h3>Project Highlights</h3>
<ul>
  <li><strong>Elevated Brand Value:</strong> Built a premium visual identity that resonates with high-intent customers.</li>
  <li><strong>Streamlined Digital Flow:</strong> Designed smooth, intuitive user journeys optimized for conversions.</li>
</ul>`
};
