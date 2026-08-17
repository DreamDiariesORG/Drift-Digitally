'use client';

import React, { useEffect } from 'react';

// ─── Constants ──────────────────────────────────────────────────────────────

const ACTIVE_TAB_CLASSES   = ['bg-cream', 'text-ink', 'border-cream'];
const INACTIVE_TAB_CLASSES = ['border-white/15', 'text-cream/60', 'hover:border-cream/40'];

const CTA_TESTIDS = new Set([
  'hero-primary-cta',
  'final-cta-button',
  'about-cta',
  'process-cta',
  'services-cta',
]);

const BLOG_CONTENT = {
  "Why Your Google Business Profile Matters More Than Your Ad Budget": {
    intro: "Most businesses pour thousands of dollars into paid search ads while completely ignoring their most powerful organic asset: Google Business Profile (GBP). Here is the guide to optimizing your profile to outrank competitors.",
    content: `<h3>The Power of Proximity and Relevance</h3>
<p>Google prioritizes local search results based on three criteria: relevance, distance, and prominence. While you can't control distance, you can absolutely weaponize relevance and prominence through deep profile optimization.</p>
<h3>Step 1: Focus on Specific Sub-categories</h3>
<p>Do not just choose a primary category and leave it. Add every relevant secondary category that matches your services. If you are a digital agency, add "marketing consultant", "website designer", and "advertising agency". This multiplies your search query surface area by up to 4x.</p>
<h3>Step 2: Treat Reviews as Keyword Opportunities</h3>
<p>Google parses the text inside user reviews to understand what services you actually deliver. Encourage clients to mention specific services in their reviews (e.g., "best SEO services in Mumbai"). When replying to reviews, echo those keywords naturally.</p>
<h3>Step 3: Update Google Updates (Posts) Weekly</h3>
<p>Treat your GBP profile like a micro-blog. Post weekly updates about case studies, new hires, or design tips. This signals active management to Google's ranking algorithms and improves conversion rates.</p>`,
    author: "Growth & Performance Team",
    date: "August 12, 2026"
  },
  "How We Use AI to Cut Content Production Time in Half": {
    intro: "AI content tools are often used as lazy shortcuts. At Drift Digitally, we treat AI as a force multiplier to move faster without sacrificing our premium quality guidelines. Here is our process.",
    content: `<h3>AI as a Draft Generator, Not a Final Polish</h3>
<p>The biggest mistake content teams make is copy-pasting raw output from ChatGPT or Claude. AI outputs are generic, lack brand voice, and sound robotic. Instead, we use custom-trained prompts to generate structural outlines and initial research drafts.</p>
<h3>Human-in-the-Loop Refinement</h3>
<p>Every piece of copy generated with AI assistance goes through a rigorous human editor. The editor's job is to inject voice, humor, specific local examples, and format it for readability. This hybrid flow saves 50% of production time while keeping quality high.</p>
<h3>Automating Asset Generation</h3>
<p>We use automated pipelines to resize, optimize, and organize visual assets. By script-automating file conversions and tagging, we free up designers to focus on creative conceptualization rather than pixel-pushing layouts.</p>`,
    author: "AI & Automation Team",
    date: "August 10, 2026"
  },
  "The Case for Hand-Illustrated Branding in a Templated World": {
    intro: "In a digital landscape dominated by Canva templates and generic vector art, custom hand-illustration stands out as a powerful branding differentiator. Here is why bespoke craft is worth the investment.",
    content: `<h3>Breaking Through Visual Fatigue</h3>
<p>Consumers are visually fatigued by stock illustrations and repetitive corporate designs. Hand-drawn branding elements signal warmth, authenticity, and premium attention to detail. It shows that a brand isn't cut from the same template.</p>
<h3>Creating Intellectual Property</h3>
<p>When you license or draw bespoke illustrations, you own that visual identity. Competitors cannot replicate it, creating a unique visual trademark that strengthens brand recall and protects your intellectual property.</p>
<h3>Bespoke vs. Scaled Illustration</h3>
<p>While templated designs are fast, they lack soul. Hand-drawn lettering, custom patterns, and organic textures speak to high-end clientele who value craftsmanship and exclusivity.</p>`,
    author: "Branding & Design Team",
    date: "July 28, 2026"
  },
  "Shopify vs. Meesho vs. Amazon: Where Should Your Brand Actually Sell?": {
    intro: "Choosing the right digital shelf determines your margin, customer relationship, and scaling limits. We break down the trade-offs between hosting your own store vs. leveraging marketplaces.",
    content: `<h3>Shopify: Ultimate Margin & Customer Control</h3>
<p>Shopify allows you to build an independent brand destination. You own all customer data, control the experience, and enjoy the highest margins. The trade-off is that you must drive all traffic yourself via ads or organic channels.</p>
<h3>Amazon: The High-Volume Discovery Engine</h3>
<p>Amazon offers massive built-in search intent and friction-free logistics via FBA. However, you do not own the customer relationship, margins are lower due to platform fees, and you face intense price competition from duplicates.</p>
<h3>Meesho: Mass-Market Volume & Social Commerce</h3>
<p>Meesho is excellent for tier-2/tier-3 mass volume, but it operates on low average order values and slim margins. It's a volume play rather than a premium brand building platform.</p>`,
    author: "E-Commerce Strategy",
    date: "July 15, 2026"
  },
  "Inside a Luxury Wedding Suite: From Concept to Animated RSVP": {
    intro: "Luxury wedding invitations have evolved beyond traditional print. We walk behind the scenes of creating a digital wedding suite that blends tactile design with custom motion graphics.",
    content: `<h3>Blending Traditional Letterpress with Motion</h3>
<p>For high-end invites, the experience starts before the paper arrives. We design matching animated invitations that introduce the wedding theme with custom music and fluid motion graphics, sent via WhatsApp or email.</p>
<h3>Custom Monograms & Illustration</h3>
<p>Every wedding suite begins with custom watercolor art or pencil sketches of the venue. These hand-drawn elements are digitized and woven into print invitations, websites, and animated countdowns.</p>
<h3>The Digital Guest Experience</h3>
<p>An elegant interactive RSVP site simplifies guest management while keeping the aesthetic premium. We build customized forms that gather dietary requirements, music requests, and travel details in a secure database.</p>`,
    author: "Wedding & Bespoke Art",
    date: "June 30, 2026"
  },
  "The Anatomy of a High-Converting Jewellery Store": {
    intro: "Selling high-ticket items online requires intense trust and visual clarity. Here is how we design e-commerce stores for luxury jewellery brands to maximize average order value.",
    content: `<h3>High-Resolution Zoom & 3D Interactive Mockups</h3>
<p>Jewellery purchases are detail-driven. We implement macro zoom viewports and 3D rotational previewers so customers can inspect metal textures, stone cuts, and clasp designs from home.</p>
<h3>Building Trust with Safe Shipping Badges</h3>
<p>High-value orders require explicit guarantees. We place insured shipping, cash on delivery (COD) verification, and lifetime buyback policy badges prominently near the checkout buttons to reduce cart abandonment.</p>
<h3>The Virtual Concierge Experience</h3>
<p>Buying fine jewellery is personal. We integrate direct video-call consultation links and dedicated WhatsApp concierge buttons so buyers can connect with real product experts during their purchase journey.</p>`,
    author: "Web Development Team",
    date: "June 12, 2026"
  }
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function setTabActive(buttons, activeBtn) {
  buttons.forEach((btn) => {
    btn.classList.remove(...ACTIVE_TAB_CLASSES);
    btn.classList.add(...INACTIVE_TAB_CLASSES);
  });
  activeBtn.classList.remove(...INACTIVE_TAB_CLASSES);
  activeBtn.classList.add(...ACTIVE_TAB_CLASSES);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FormHandler() {

  // ── 1. Scroll-Reveal ────────────────────────────────────────────────────
  useEffect(() => {
    const els = document.querySelectorAll('[style*="opacity:0"][style*="translateY"]');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          const delay = (i % 4) * 80;
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── 2. Contact Form Submission ──────────────────────────────────────────
  useEffect(() => {
    const contactForm = document.querySelector('[data-testid="contact-form"]');
    if (!contactForm) return;

    const originalHTML = contactForm.innerHTML;

    // ── Prefill form fields from URL Query Parameters ─────────────────────
    const prefillFormFromURL = (form) => {
      if (!form) return;
      const params = new URLSearchParams(window.location.search);
      const rawServiceParam = params.get('service') || params.get('plan') || params.get('package') || params.get('interest');

      if (rawServiceParam) {
        const decodedParam = decodeURIComponent(rawServiceParam).trim();
        const selectEl = form.querySelector('[data-testid="contact-interest"]');
        const detailsInput = form.querySelector('[data-testid="contact-details"]');

        // Map specific package names (e.g. "Branding - Growth", "SEO - Starter") to the main dropdown categories
        let matchedOptionValue = '';
        const lowerParam = decodedParam.toLowerCase();

        if (lowerParam.includes('branding') || lowerParam.includes('logo')) {
          matchedOptionValue = 'Branding & Creative Studio';
        } else if (lowerParam.includes('website') || lowerParam.includes('web')) {
          matchedOptionValue = 'Web Development';
        } else if (lowerParam.includes('video') || lowerParam.includes('reel') || lowerParam.includes('ai content')) {
          matchedOptionValue = 'AI Content';
        } else if (lowerParam.includes('seo') || lowerParam.includes('growth') || lowerParam.includes('ugc')) {
          matchedOptionValue = 'Digital Growth & Performance';
        } else if (lowerParam.includes('wedding')) {
          matchedOptionValue = 'Wedding Stationery';
        }

        // 1. Prefill the Select Dropdown
        if (selectEl) {
          if (matchedOptionValue) {
            selectEl.value = matchedOptionValue;
          } else {
            // Try exact option match
            Array.from(selectEl.options).forEach((opt) => {
              if (opt.value.toLowerCase() === lowerParam || opt.text.toLowerCase() === lowerParam) {
                selectEl.value = opt.value;
              }
            });
          }
        }

        // 2. Prefill Project Details Textarea with Package Info
        if (detailsInput && !detailsInput.value) {
          detailsInput.value = `Hi Drift team,\n\nI am interested in getting started with the [ ${decodedParam} ] package.\n\nPlease share the next steps and timeline for this project.`;
        }
      }
    };

    prefillFormFromURL(contactForm);

    const bindFormEvents = () => {
      const form = document.querySelector('[data-testid="contact-form"]');
      if (!form) return;

      const handleSubmit = async (e) => {
        e.preventDefault();

        const nameInput    = form.querySelector('[data-testid="contact-name"]');
        const emailInput   = form.querySelector('[data-testid="contact-email"]');
        const phoneInput   = form.querySelector('[data-testid="contact-phone"]');
        const companyInput = form.querySelector('[data-testid="contact-company"]');
        const selectEl     = form.querySelector('[data-testid="contact-interest"]');
        const comboboxBtn  = form.querySelector('button[role="combobox"]');
        const detailsInput = form.querySelector('[data-testid="contact-details"]');
        const submitBtn    = form.querySelector('[data-testid="contact-submit"]');

        // Clear previous error states
        [nameInput, emailInput, phoneInput].forEach((el) => el?.classList.remove('input-error'));

        const name    = nameInput?.value.trim()    ?? '';
        const email   = emailInput?.value.trim()   ?? '';
        const phone   = phoneInput?.value.trim()   ?? '';
        const company = companyInput?.value.trim()  ?? '';
        const details = detailsInput?.value.trim()  ?? '';
        const service = selectEl?.value || comboboxBtn?.textContent?.trim() || 'Not Specified';

        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+0-9\s\-()]{7,20}$/;
        const errors = [];

        if (!name || name.length < 2) {
          nameInput?.classList.add('input-error');
          errors.push('Please enter a valid name (at least 2 characters).');
        }
        if (!email || !emailRegex.test(email)) {
          emailInput?.classList.add('input-error');
          errors.push('Please enter a valid email address.');
        }
        if (phone && !phoneRegex.test(phone)) {
          phoneInput?.classList.add('input-error');
          errors.push('Please enter a valid phone number.');
        }

        if (errors.length) { alert(errors.join('\n')); return; }

        const originalText = submitBtn?.innerHTML ?? 'Submit';
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending…'; }

        try {
          const res    = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, company, service, details }),
          });
          const result = await res.json();

          if (res.ok && result.success) {
            form.innerHTML = `
              <div class="contact-success-card">
                <svg class="contact-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 class="contact-success-title">Message Sent Successfully!</h3>
                <p class="contact-success-desc">Thank you for reaching out. We have received your inquiry and our team will get back to you within 24 hours.</p>
                <button type="button" class="contact-success-reset-btn" id="reset-contact-form">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Send Another Message
                </button>
              </div>`;

            document.getElementById('reset-contact-form')?.addEventListener('click', () => {
              form.innerHTML = originalHTML;
              bindFormEvents();
            });
          } else {
            alert(result.message || 'Something went wrong. Please try again.');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalText; }
          }
        } catch (err) {
          console.error(err);
          alert('Failed to send message. Please check your network connection.');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalText; }
        }
      };

      form.addEventListener('submit', handleSubmit);
    };

    bindFormEvents();
  }, []);

  // ── 3. Newsletter Form Submission ──────────────────────────────────────
  useEffect(() => {
    const form = document.querySelector('[data-testid="newsletter-form"]');
    if (!form) return;

    const handleSubmit = async (e) => {
      e.preventDefault();

      const emailInput = document.querySelector('[data-testid="newsletter-input"]');
      const submitBtn  = document.querySelector('[data-testid="newsletter-submit"]');
      const email      = emailInput?.value ?? '';

      if (!email) { alert('Please enter a valid email address.'); return; }

      const originalText = submitBtn?.innerHTML ?? 'Join';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Joining…'; }

      try {
        const res    = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const result = await res.json();

        if (res.ok && result.success) {
          form.innerHTML = `
            <div class="text-left py-4">
              <p class="text-cream font-medium">✓ Subscribed successfully! Check your inbox soon.</p>
            </div>`;
        } else {
          alert(result.message || 'Subscription failed. Please try again.');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalText; }
        }
      } catch (err) {
        console.error(err);
        alert('Failed to subscribe. Please check your connection.');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalText; }
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => form.removeEventListener('submit', handleSubmit);
  }, []);

  // ── 4. Category Filter Tabs (Insights blog cards + Portfolio cards) ─────
  // Merged from two formerly-identical effects; works for whichever page is active.
  useEffect(() => {
    const categoryFilter = document.querySelector('[data-testid="category-filter"]');
    if (!categoryFilter) return;

    // Detect which card type is on this page
    const isBlog      = document.querySelectorAll('[data-testid="blog-card"]').length > 0;
    const isPortfolio = document.querySelectorAll('[data-testid="portfolio-card"]').length > 0;
    if (!isBlog && !isPortfolio) return;

    const cardSelector = isBlog ? '[data-testid="blog-card"]' : '[data-testid="portfolio-card"]';
    const buttons      = categoryFilter.querySelectorAll('button');

    const handleFilter = (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const category = btn.textContent.trim();
      setTabActive(buttons, btn);

      document.querySelectorAll(cardSelector).forEach((card) => {
        const target = isPortfolio ? card.parentElement : card;
        if (category === 'All') {
          target.style.display = '';
        } else {
          const badge    = card.querySelector('[class*="text-royal"]');
          const badgeText = badge?.textContent.trim() ?? '';
          target.style.display = badgeText === category ? '' : 'none';
        }
      });
    };

    categoryFilter.addEventListener('click', handleFilter);
    return () => categoryFilter.removeEventListener('click', handleFilter);
  }, []);

  // ── 5. Before/After Slider (Portfolio page) ────────────────────────────
  useEffect(() => {
    const slider = document.querySelector('[data-testid="before-after-slider"]');
    if (!slider) return;

    const beforeWrapper = slider.querySelector('[style*="width:"]');
    if (!beforeWrapper) return;

    const beforeImg = beforeWrapper.querySelector('img');

    // Build drag handle if not already present
    let handle = slider.querySelector('[data-testid="slider-handle"]');
    if (!handle) {
      handle = document.createElement('div');
      handle.setAttribute('data-testid', 'slider-handle');
      handle.style.cssText = `
        position: absolute; top: 0; bottom: 0; width: 3px;
        background: #ffffff; left: 50%; transform: translateX(-50%);
        cursor: ew-resize; z-index: 30;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      `;
      const circle = document.createElement('div');
      circle.style.cssText = `
        width: 38px; height: 38px; border-radius: 50%;
        background: #ffffff; position: absolute;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 16px rgba(0,0,0,0.6); cursor: ew-resize;
      `;
      circle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18-6-6 6-6"/><path d="m15 6 6 6-6 6"/></svg>`;
      handle.appendChild(circle);
      slider.style.position = 'relative';
      slider.appendChild(handle);
    }

    // Keep the clipped before-image the full slider width so it clips without squishing
    const syncImageWidth = () => {
      const w = slider.offsetWidth;
      if (beforeImg && w > 0) {
        beforeImg.style.cssText += `width:${w}px;min-width:${w}px;max-width:none;height:100%;object-fit:cover;`;
      }
    };
    syncImageWidth();
    window.addEventListener('resize', syncImageWidth, { passive: true });

    let dragging = false;

    const updateSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const pct  = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      beforeWrapper.style.width = `${pct}%`;
      handle.style.left         = `${pct}%`;
    };

    // Named handlers so removeEventListener can match them exactly (fixes the previous leak)
    const onMouseMove  = (e) => { if (dragging) updateSlider(e.clientX); };
    const onTouchMove  = (e) => { if (dragging) updateSlider(e.touches[0].clientX); };
    const stopDragging = () => { dragging = false; };

    slider.addEventListener('mousedown',  (e) => { dragging = true; updateSlider(e.clientX); });
    slider.addEventListener('touchstart', (e) => { dragging = true; updateSlider(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('touchmove',  onTouchMove, { passive: true });
    window.addEventListener('mouseup',    stopDragging);
    window.addEventListener('touchend',   stopDragging);

    return () => {
      window.removeEventListener('resize',    syncImageWidth);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup',   stopDragging);
      window.removeEventListener('touchend',  stopDragging);
    };
  }, []);

  // ── 6. Insights Card Modal ─────────────────────────────────────────────
  useEffect(() => {
    const blogCards = document.querySelectorAll('[data-testid="blog-card"]');
    if (!blogCards.length) return;

    let modal = document.getElementById('insight-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id        = 'insight-modal';
      modal.className = 'global-modal';
      modal.style.display = 'none';
      document.body.appendChild(modal);
    }

    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    const handleCardClick = (e) => {
      const card = e.target.closest('[data-testid="blog-card"]');
      if (!card) return;

      const title    = card.querySelector('h3')?.textContent.trim()               ?? '';
      const category = card.querySelector('[class*="text-royal"]')?.textContent.trim() ?? 'Insights';
      const readTime = card.querySelector('span')?.textContent.trim()              ?? '5 min read';
      const imgUrl   = card.querySelector('img')?.src                             ?? '';

      const article = BLOG_CONTENT[title] ?? {
        intro:   "Here is a detailed guide on this topic. Discover best practices and strategic approaches in modern branding, performance marketing, and digital growth.",
        content: "<p>Detailed article content is currently being finalized. Check back soon for the full breakdown of actionable tips and insights from our team.</p>",
        author:  "Drift Digitally Editor",
        date:    "August 2026"
      };

      modal.innerHTML = `
        <div class="global-modal-content">
          <button class="global-modal-close" id="close-insight-modal" aria-label="Close modal">&times;</button>
          <div class="global-modal-scroll-area">
            <div class="global-modal-header-image">
              <img src="${imgUrl}" alt="${title}" class="global-modal-image-element" />
              <div class="global-modal-image-overlay"></div>
              <span class="global-modal-badge">${category}</span>
            </div>
            <div class="global-modal-body">
              <h2 class="global-modal-title">${title}</h2>
              <div class="global-modal-meta">By <strong>${article.author}</strong> &bull; ${article.date} &bull; ${readTime}</div>
              <p class="global-modal-intro">${article.intro}</p>
              <div class="global-modal-rich-text">${article.content}</div>
            </div>
          </div>
        </div>`;

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.getElementById('close-insight-modal')?.addEventListener('click', closeModal);
    };

    const handleOutsideClick = (e) => { if (e.target === modal) closeModal(); };
    const handleEscKey       = (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') closeModal(); };

    blogCards.forEach((card) => card.addEventListener('click', handleCardClick));
    modal.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleEscKey);

    return () => {
      blogCards.forEach((card) => card.removeEventListener('click', handleCardClick));
      modal.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // ── 7. Portfolio Growth vs Studio Toggle ───────────────────────────────
  useEffect(() => {
    const toggleGrowth = document.querySelector('[data-testid="toggle-growth"]');
    const toggleStudio = document.querySelector('[data-testid="toggle-studio"]');
    if (!toggleGrowth || !toggleStudio) return;

    const pill = toggleGrowth.querySelector('span.bg-royal');

    const BASE_CLASS     = 'relative px-5 py-3 rounded-full text-sm transition-colors duration-300';
    const ACTIVE_CLASS   = `${BASE_CLASS} text-white font-medium`;
    const INACTIVE_CLASS = `${BASE_CLASS} text-cream/60 hover:text-cream`;

    const applyToggle = (activeBtn, inactiveBtn) => {
      if (pill && !activeBtn.contains(pill)) activeBtn.insertBefore(pill, activeBtn.firstChild);
      activeBtn.className   = ACTIVE_CLASS;
      inactiveBtn.className = INACTIVE_CLASS;

      const activeText   = activeBtn.querySelector('.relative');
      const inactiveText = inactiveBtn.querySelector('.relative');
      if (activeText)   activeText.style.cssText   = 'position:relative;z-index:10;color:#ffffff;';
      if (inactiveText) inactiveText.style.cssText = 'position:relative;z-index:10;color:rgba(244,223,198,0.6);';
    };

    const handleGrowthClick = () => applyToggle(toggleGrowth, toggleStudio);
    const handleStudioClick = () => applyToggle(toggleStudio, toggleGrowth);

    toggleGrowth.addEventListener('click', handleGrowthClick);
    toggleStudio.addEventListener('click', handleStudioClick);

    return () => {
      toggleGrowth.removeEventListener('click', handleGrowthClick);
      toggleStudio.removeEventListener('click', handleStudioClick);
    };
  }, []);

  // ── 8. Global CTA Click Interceptor ───────────────────────────────────
  useEffect(() => {
    const handleClick = (e) => {
      const btn  = e.target.closest('button, a, [role="button"]');
      if (!btn) return;

      const href = btn.getAttribute('href');

      if (href === '#' || href === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (CTA_TESTIDS.has(btn.dataset?.testid) && !href) {
        e.preventDefault();
        window.location.href = '/contact';
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // ── 9. Services Page Package Category Switcher ──────────────────────────
  useEffect(() => {
    const switcher = document.querySelector('[data-testid="package-category-switcher"]');
    if (!switcher) return;

    const buttons = switcher.querySelectorAll('button');

    const handleClick = (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const category = btn.dataset.category;
      if (!category) return;

      // Use dedicated CSS class names — Tailwind purges utility strings not
      // present in static HTML/JSX, so they disappear from production builds.
      buttons.forEach((b) => {
        b.classList.remove('tab-btn-active');
        b.classList.add('tab-btn-inactive');
      });
      btn.classList.remove('tab-btn-inactive');
      btn.classList.add('tab-btn-active');

      const panels = document.querySelectorAll('[data-package-panel]');
      panels.forEach((panel) => {
        if (panel.dataset.packagePanel === category) {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      });
    };

    switcher.addEventListener('click', handleClick);
    return () => switcher.removeEventListener('click', handleClick);
  }, []);

  return null;
}


