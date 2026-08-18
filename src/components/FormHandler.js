"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BLOG_CONTENT, BLOG_CONTENT_FALLBACK } from "@/lib/blogContent";
import { PORTFOLIO_CONTENT, PORTFOLIO_CONTENT_FALLBACK } from "@/lib/portfolioContent";

// ─── Constants ───────────────────────────────────────────────────────────────

const ACTIVE_TAB_CLASSES = ["bg-royal", "text-white", "border-royal"];
const INACTIVE_TAB_CLASSES = ["border-white/15", "text-cream/60", "hover:border-cream/40"];
const CTA_TESTIDS = new Set([
  "hero-primary-cta",
  "final-cta-button",
  "about-cta",
  "process-cta",
  "services-cta",
]);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function setTabActive(buttons, activeBtn) {
  buttons.forEach((btn) => {
    btn.classList.remove(...ACTIVE_TAB_CLASSES);
    btn.classList.add(...INACTIVE_TAB_CLASSES);
  });
  activeBtn.classList.remove(...INACTIVE_TAB_CLASSES);
  activeBtn.classList.add(...ACTIVE_TAB_CLASSES);
}

function prefillFormFromURL(form) {
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const rawServiceParam =
    params.get("service") || params.get("plan") || params.get("package") || params.get("interest");
  if (!rawServiceParam) return;

  const decodedParam = decodeURIComponent(rawServiceParam).trim();
  const selectEl = form.querySelector('[data-testid="contact-interest"]');
  const detailsInput = form.querySelector('[data-testid="contact-details"]');
  const lowerParam = decodedParam.toLowerCase();

  let matchedOptionValue = "";
  if (lowerParam.includes("branding") || lowerParam.includes("logo"))
    matchedOptionValue = "Branding & Creative Studio";
  else if (lowerParam.includes("website") || lowerParam.includes("web"))
    matchedOptionValue = "Web Development";
  else if (lowerParam.includes("video") || lowerParam.includes("reel") || lowerParam.includes("ai content"))
    matchedOptionValue = "AI Content";
  else if (lowerParam.includes("seo") || lowerParam.includes("growth") || lowerParam.includes("ugc"))
    matchedOptionValue = "Digital Growth & Performance";
  else if (lowerParam.includes("wedding"))
    matchedOptionValue = "Wedding Stationery";

  if (selectEl) {
    if (matchedOptionValue) {
      selectEl.value = matchedOptionValue;
    } else {
      Array.from(selectEl.options).forEach((opt) => {
        if (opt.value.toLowerCase() === lowerParam || opt.text.toLowerCase() === lowerParam) {
          selectEl.value = opt.value;
        }
      });
    }
  }

  if (detailsInput && !detailsInput.value) {
    detailsInput.value = `Hi Drift team,\n\nI am interested in getting started with the [ ${decodedParam} ] package.\n\nPlease share the next steps and timeline for this project.`;
  }
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[style*="opacity:0"][style*="translateY"]');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => {
            entry.target.style.transition = "opacity 0.55s ease, transform 0.55s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
          }, (i % 4) * 80);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useContactForm() {
  const [success, setSuccess] = useState(false);
  const [formNode, setFormNode] = useState(null);

  useEffect(() => {
    const form = document.querySelector('[data-testid="contact-form"]');
    if (!form) return;
    setFormNode(form);
    prefillFormFromURL(form);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[data-testid="contact-name"]');
      const emailInput = form.querySelector('[data-testid="contact-email"]');
      const phoneInput = form.querySelector('[data-testid="contact-phone"]');
      const companyInput = form.querySelector('[data-testid="contact-company"]');
      const selectEl = form.querySelector('[data-testid="contact-interest"]');
      const detailsInput = form.querySelector('[data-testid="contact-details"]');
      const submitBtn = form.querySelector('[data-testid="contact-submit"]');

      [nameInput, emailInput, phoneInput].forEach((el) => el?.classList.remove("input-error"));

      const name = nameInput?.value.trim() ?? "";
      const email = emailInput?.value.trim() ?? "";
      const phone = phoneInput?.value.trim() ?? "";
      const company = companyInput?.value.trim() ?? "";
      const details = detailsInput?.value.trim() ?? "";
      const service = selectEl?.value || "Not Specified";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errors = [];

      if (!name || name.length < 2) {
        nameInput?.classList.add("input-error");
        errors.push("Please enter your name (at least 2 characters).");
      }
      if (!email || !emailRegex.test(email)) {
        emailInput?.classList.add("input-error");
        errors.push("Please enter a valid email address.");
      }
      // Forgiving phone validation (allow empty, or at least 7 digits)
      if (phone) {
        const digits = phone.replace(/\D/g, "");
        if (digits.length < 7) {
          phoneInput?.classList.add("input-error");
          errors.push("Please enter a valid phone number (at least 7 digits).");
        }
      }

      if (errors.length) {
        alert(errors.join("\n"));
        return;
      }

      const originalText = submitBtn?.innerHTML ?? "Submit";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending…";
      }

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, company, service, details }),
        });
        const result = await res.json();

        if (res.ok && result.success) {
          // Hide children
          Array.from(form.children).forEach(c => c.style.display = 'none');
          setSuccess(true);
        } else {
          alert(result.message || "Something went wrong. Please try again.");
        }
      } catch (err) {
        console.error("Contact form error:", err);
        alert("Failed to send message. Please check your network connection.");
      } finally {
        if (submitBtn && !success) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [success]);

  if (!success || !formNode) return null;

  return createPortal(
    <div className="contact-success-card">
      <svg className="contact-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <h3 className="contact-success-title">Message Sent Successfully!</h3>
      <p className="contact-success-desc">Thank you for reaching out. We have received your inquiry and our team will get back to you within 24 hours.</p>
      <button 
        type="button" 
        className="contact-success-reset-btn" 
        onClick={() => {
          setSuccess(false);
          Array.from(formNode.children).forEach(c => c.style.display = '');
          formNode.reset();
          const submitBtn = formNode.querySelector('[data-testid="contact-submit"]');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Submit";
          }
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
        Send Another Message
      </button>
    </div>,
    formNode
  );
}

function useNewsletterForm() {
  const [success, setSuccess] = useState(false);
  const [formNode, setFormNode] = useState(null);

  useEffect(() => {
    const form = document.querySelector('[data-testid="newsletter-form"]');
    if (!form) return;
    setFormNode(form);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const emailInput = document.querySelector('[data-testid="newsletter-input"]');
      const submitBtn = document.querySelector('[data-testid="newsletter-submit"]');
      const email = emailInput?.value ?? "";

      if (!email) {
        alert("Please enter a valid email address.");
        return;
      }

      const originalText = submitBtn?.innerHTML ?? "Join";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Joining…";
      }

      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const result = await res.json();

        if (res.ok && result.success) {
          Array.from(form.children).forEach(c => c.style.display = 'none');
          setSuccess(true);
        } else {
          alert(result.message || "Subscription failed. Please try again.");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }
      } catch (err) {
        console.error("Newsletter form error:", err);
        alert("Failed to subscribe. Please check your connection.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  if (!success || !formNode) return null;

  return createPortal(
    <div className="text-left py-4">
      <p className="text-cream font-medium">✓ Subscribed successfully! Check your inbox soon.</p>
    </div>,
    formNode
  );
}

function useCategoryFilter() {
  useEffect(() => {
    const categoryFilter = document.querySelector('[data-testid="category-filter"]') ||
                           document.querySelector('[data-testid="blog-categories"]');
    if (!categoryFilter) return;

    const buttons = categoryFilter.querySelectorAll("button");

    const handleFilter = (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const category = btn.textContent.trim();
      setTabActive(buttons, btn);

      const blogCards = document.querySelectorAll('[data-testid="blog-card"]');
      const portfolioCards = document.querySelectorAll('[data-testid="portfolio-card"]');

      if (blogCards.length > 0) {
        blogCards.forEach((card) => {
          if (category === "All") {
            card.style.display = "";
            return;
          }

          const cardText = card.textContent.trim().toLowerCase();
          const normCat = category.toLowerCase();

          let isMatch = false;
          if (normCat.includes("growth") || normCat.includes("performance")) {
            isMatch = cardText.includes("growth") || cardText.includes("performance") || cardText.includes("google business");
          } else if (normCat.includes("ai") || normCat.includes("automation")) {
            isMatch = cardText.includes("ai") || cardText.includes("automation");
          } else if (normCat.includes("branding") || normCat.includes("design")) {
            isMatch = cardText.includes("brand") || cardText.includes("design") || cardText.includes("illustrated");
          } else if (normCat.includes("wedding") || normCat.includes("bespoke")) {
            isMatch = cardText.includes("wedding") || cardText.includes("bespoke");
          } else if (normCat.includes("behind") || normCat.includes("build") || normCat.includes("ecommerce") || normCat.includes("e-commerce")) {
            isMatch = cardText.includes("build") || cardText.includes("jewellery") || cardText.includes("shopify") || cardText.includes("amazon");
          } else {
            isMatch = cardText.includes(normCat);
          }

          card.style.display = isMatch ? "" : "none";
        });
      }

      if (portfolioCards.length > 0) {
        portfolioCards.forEach((card) => {
          if (category === "All") {
            card.style.display = "";
            return;
          }

          const cardText = card.textContent.trim().toLowerCase();
          const normCat = category.toLowerCase();

          let isMatch = false;
          if (normCat === "branding") {
            isMatch = cardText.includes("brand") || cardText.includes("identity") || cardText.includes("kit");
          } else if (normCat === "web") {
            isMatch = cardText.includes("web") || cardText.includes("site") || cardText.includes("development") || cardText.includes("shopify") || cardText.includes("ui");
          } else if (normCat === "ads") {
            isMatch = cardText.includes("ad") || cardText.includes("campaign") || cardText.includes("meta") || cardText.includes("google");
          } else if (normCat === "seo") {
            isMatch = cardText.includes("seo") || cardText.includes("growth") || cardText.includes("search") || cardText.includes("ranking") || cardText.includes("performance");
          } else {
            isMatch = cardText.includes(normCat);
          }

          card.style.display = isMatch ? "" : "none";
        });
      }
    };

    categoryFilter.addEventListener("click", handleFilter);
    return () => categoryFilter.removeEventListener("click", handleFilter);
  }, []);
}

function useBeforeAfterSlider() {
  useEffect(() => {
    const slider = document.querySelector('[data-testid="before-after-slider"]');
    if (!slider) return;

    const beforeWrapper = slider.querySelector('[style*="width:"]');
    if (!beforeWrapper) return;
    const beforeImg = beforeWrapper.querySelector("img");

    let handle = slider.querySelector('[data-testid="slider-handle"]');
    if (!handle) {
      handle = document.createElement("div");
      handle.setAttribute("data-testid", "slider-handle");
      handle.style.cssText = `
        position:absolute; top:0; bottom:0; width:3px;
        background:#ffffff; left:50%; transform:translateX(-50%);
        cursor:ew-resize; z-index:30;
        display:flex; align-items:center; justify-content:center;
        box-shadow:0 0 10px rgba(0,0,0,0.5);
      `;
      const circle = document.createElement("div");
      circle.style.cssText = `
        width:38px; height:38px; border-radius:50%;
        background:#ffffff; position:absolute;
        display:flex; align-items:center; justify-content:center;
        box-shadow:0 4px 16px rgba(0,0,0,0.6); cursor:ew-resize;
      `;
      circle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18-6-6 6-6"/><path d="m15 6 6 6-6 6"/></svg>`;
      handle.appendChild(circle);
      slider.style.position = "relative";
      slider.appendChild(handle);
    }

    const syncImageWidth = () => {
      const w = slider.offsetWidth;
      if (beforeImg && w > 0) {
        beforeImg.style.cssText += `width:${w}px;min-width:${w}px;max-width:none;height:100%;object-fit:cover;`;
      }
    };
    syncImageWidth();
    
    let ticking = false;
    const onResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          syncImageWidth();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    let dragging = false;
    const updateSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      beforeWrapper.style.width = `${pct}%`;
      handle.style.left = `${pct}%`;
    };

    const onMouseMove = (e) => { if (dragging) updateSlider(e.clientX); };
    const onTouchMove = (e) => { if (dragging) updateSlider(e.touches[0].clientX); };
    const stopDragging = () => { dragging = false; };

    const onMouseDown = (e) => { dragging = true; updateSlider(e.clientX); };
    const onTouchStart = (e) => { dragging = true; updateSlider(e.touches[0].clientX); };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("resize", onResize);
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);
}

function useInsightsModal() {
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const blogCards = document.querySelectorAll('[data-testid="blog-card"]');
    if (!blogCards.length) return;

    const handleCardClick = (e) => {
      const card = e.target.closest('[data-testid="blog-card"]');
      if (!card) return;

      const title = card.querySelector("h3")?.textContent.trim() ?? "";
      const category = card.querySelector('[class*="text-royal"]')?.textContent.trim() ?? "Insights";
      const readTime = card.querySelector("span")?.textContent.trim() ?? "5 min read";
      const imgUrl = card.querySelector("img")?.src ?? "";
      const article = BLOG_CONTENT[title] ?? BLOG_CONTENT_FALLBACK;

      setModalData({ title, category, readTime, imgUrl, article });
      document.body.style.overflow = "hidden";
    };

    blogCards.forEach((card) => card.addEventListener("click", handleCardClick));
    
    return () => {
      blogCards.forEach((card) => card.removeEventListener("click", handleCardClick));
    };
  }, []);

  useEffect(() => {
    if (!modalData) return;
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setModalData(null);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [modalData]);

  if (!modalData) return null;

  return createPortal(
    <div className="global-modal" style={{ display: 'flex' }} onClick={(e) => {
      if (e.target.className === 'global-modal') {
        setModalData(null);
        document.body.style.overflow = "";
      }
    }}>
      <div className="global-modal-content">
        <button 
          className="global-modal-close" 
          aria-label="Close modal" 
          onClick={() => {
            setModalData(null);
            document.body.style.overflow = "";
          }}
        >
          &times;
        </button>
        <div className="global-modal-scroll-area">
          <div className="global-modal-header-image">
            <img src={modalData.imgUrl} alt={modalData.title} className="global-modal-image-element" />
            <div className="global-modal-image-overlay"></div>
            <span className="global-modal-badge">{modalData.category}</span>
          </div>
          <div className="global-modal-body">
            <h2 className="global-modal-title">{modalData.title}</h2>
            <div className="global-modal-meta">By <strong>{modalData.article.author}</strong> &bull; {modalData.article.date} &bull; {modalData.readTime}</div>
            <p className="global-modal-intro">{modalData.article.intro}</p>
            <div className="global-modal-rich-text" dangerouslySetInnerHTML={{ __html: modalData.article.content }} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function usePortfolioToggle() {
  useEffect(() => {
    const toggleGrowth = document.querySelector('[data-testid="toggle-growth"]');
    const toggleStudio = document.querySelector('[data-testid="toggle-studio"]');
    const categoryFilter = document.querySelector('[data-testid="category-filter"]');
    if (!toggleGrowth || !toggleStudio) return;

    const pill = toggleGrowth.querySelector("span.bg-royal");
    const BASE = "relative px-5 py-3 rounded-full text-sm transition-colors duration-300";
    const ACTIVE = `${BASE} text-white font-medium`;
    const INACTIVE = `${BASE} text-cream/60 hover:text-cream`;

    const updatePortfolioDisplay = (section) => {
      const portfolioCards = document.querySelectorAll('[data-testid="portfolio-card"]');
      portfolioCards.forEach((card) => {
        const cardSection = card.dataset.section ?? "growth";
        card.style.display = cardSection === section ? "" : "none";
      });

      if (categoryFilter) {
        // Show category filter bar only for Digital Growth section
        categoryFilter.style.display = section === "growth" ? "flex" : "none";
        
        // Reset category filter buttons state to "All" when switching back to Growth
        if (section === "growth") {
          const buttons = categoryFilter.querySelectorAll("button");
          buttons.forEach((btn, idx) => {
            if (idx === 0) {
              btn.className = "px-4 py-2 rounded-full text-xs tracking-wide border transition-colors duration-300 bg-cream text-ink border-cream";
            } else {
              btn.className = "px-4 py-2 rounded-full text-xs tracking-wide border transition-colors duration-300 border-white/15 text-cream/60 hover:border-cream/40";
            }
          });
        }
      }
    };

    const applyToggle = (activeBtn, inactiveBtn, section) => {
      if (pill && !activeBtn.contains(pill))
        activeBtn.insertBefore(pill, activeBtn.firstChild);
      activeBtn.className = ACTIVE;
      inactiveBtn.className = INACTIVE;
      const activeText = activeBtn.querySelector(".relative");
      const inactiveText = inactiveBtn.querySelector(".relative");
      if (activeText) activeText.style.cssText = "position:relative;z-index:10;color:#ffffff;";
      if (inactiveText) inactiveText.style.cssText = "position:relative;z-index:10;color:rgba(244,223,198,0.6);";

      updatePortfolioDisplay(section);
    };

    // Initial state setup (ensure growth section is active by default)
    updatePortfolioDisplay("growth");

    const handleGrowthClick = () => applyToggle(toggleGrowth, toggleStudio, "growth");
    const handleStudioClick = () => applyToggle(toggleStudio, toggleGrowth, "studio");

    toggleGrowth.addEventListener("click", handleGrowthClick);
    toggleStudio.addEventListener("click", handleStudioClick);

    return () => {
      toggleGrowth.removeEventListener("click", handleGrowthClick);
      toggleStudio.removeEventListener("click", handleStudioClick);
    };
  }, []);
}

function useGlobalCTA() {
  useEffect(() => {
    const handleClick = (e) => {
      const btn = e.target.closest('button, a, [role="button"]');
      if (!btn) return;

      const href = btn.getAttribute("href");
      if (href === "#" || href === "") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (CTA_TESTIDS.has(btn.dataset?.testid) && !href) {
        e.preventDefault();
        window.location.href = "/contact";
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

function useServicesSwitcher() {
  useEffect(() => {
    const switcher = document.querySelector('[data-testid="package-category-switcher"]');
    if (!switcher) return;

    const buttons = switcher.querySelectorAll("button");
    const handleClick = (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const category = btn.dataset.category;
      if (!category) return;

      buttons.forEach((b) => {
        b.classList.remove("tab-btn-active");
        b.classList.add("tab-btn-inactive");
      });
      btn.classList.remove("tab-btn-inactive");
      btn.classList.add("tab-btn-active");

      document.querySelectorAll("[data-package-panel]").forEach((panel) => {
        panel.style.display = panel.dataset.packagePanel === category ? "block" : "none";
      });
    };

    switcher.addEventListener("click", handleClick);
    return () => switcher.removeEventListener("click", handleClick);
  }, []);
}

function usePortfolioModal() {
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const handlePortfolioClick = (e) => {
      // Don't open modal if interacting with before-after slider handle or slider area
      if (e.target.closest('[data-testid="slider-handle"]') || e.target.closest('[data-testid="before-after-slider"]')) {
        return;
      }

      const card = e.target.closest('[data-testid="portfolio-card"]');
      if (!card) return;

      const title = card.querySelector("h3")?.textContent.trim() ?? "Featured Project";
      const category = card.querySelector('[class*="text-royal"]')?.textContent.trim() ?? "Case Study";
      const imgUrl = card.querySelector("img")?.src ?? "";
      const project = PORTFOLIO_CONTENT[title] ?? PORTFOLIO_CONTENT_FALLBACK;

      setModalData({ title, category, imgUrl, project });
      document.body.style.overflow = "hidden";
    };

    document.addEventListener("click", handlePortfolioClick);
    return () => document.removeEventListener("click", handlePortfolioClick);
  }, []);

  useEffect(() => {
    if (!modalData) return;
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setModalData(null);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [modalData]);

  if (!modalData) return null;

  return createPortal(
    <div className="global-modal" style={{ display: 'flex' }} onClick={(e) => {
      if (e.target.className === 'global-modal') {
        setModalData(null);
        document.body.style.overflow = "";
      }
    }}>
      <div className="global-modal-content">
        <button 
          className="global-modal-close" 
          aria-label="Close modal" 
          onClick={() => {
            setModalData(null);
            document.body.style.overflow = "";
          }}
        >
          &times;
        </button>
        <div className="global-modal-scroll-area">
          {modalData.imgUrl && (
            <div className="global-modal-header-image">
              <img src={modalData.imgUrl} alt={modalData.title} className="global-modal-image-element" />
              <div className="global-modal-image-overlay"></div>
              <span className="global-modal-badge">{modalData.category}</span>
            </div>
          )}
          <div className="global-modal-body">
            <h2 className="global-modal-title">{modalData.title}</h2>
            <p className="global-modal-intro">{modalData.project.intro}</p>

            <div className="portfolio-modal-grid">
              <div className="portfolio-meta-item">
                <label>Client</label>
                <span>{modalData.project.client}</span>
              </div>
              <div className="portfolio-meta-item">
                <label>Service</label>
                <span>{modalData.project.service}</span>
              </div>
              <div className="portfolio-meta-item">
                <label>Year</label>
                <span>{modalData.project.year}</span>
              </div>
              <div className="portfolio-meta-item" style={{ gridColumn: '1 / -1' }}>
                <label>Deliverables</label>
                <div className="portfolio-deliverables">
                  {modalData.project.deliverables.map((item, i) => (
                    <span key={i} className="portfolio-deliverable-tag">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="global-modal-rich-text">
              <h3>Overview</h3>
              <p>{modalData.project.overview}</p>

              <h3>The Challenge</h3>
              <p>{modalData.project.challenge}</p>

              <h3>The Solution</h3>
              <p>{modalData.project.solution}</p>

              <div dangerouslySetInnerHTML={{ __html: modalData.project.impact }} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FormHandler() {
  useScrollReveal();
  const contactPortal = useContactForm();
  const newsletterPortal = useNewsletterForm();
  useCategoryFilter();
  useBeforeAfterSlider();
  const modalPortal = useInsightsModal();
  const portfolioModalPortal = usePortfolioModal();
  usePortfolioToggle();
  useGlobalCTA();
  useServicesSwitcher();

  return (
    <>
      {contactPortal}
      {newsletterPortal}
      {modalPortal}
      {portfolioModalPortal}
    </>
  );
}
