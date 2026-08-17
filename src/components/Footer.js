/**
 * Footer component — Server Component (no client hooks needed).
 *
 * Renders the site-wide footer with:
 *  - Hero CTA section ("Something worth talking about")
 *  - Newsletter signup form
 *  - Navigation link grid
 *  - Bottom bar: logo, tagline, social links, copyright
 */

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

/** Lucide ArrowUpRight icon (18×18) */
function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

/** Lucide Instagram icon (16×16) */
function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.42 13.924c.057-.594-.038-1.536-.708-2.317-.791-.918-2.071-1.156-3.08-1.156-1.558 0-2.836.877-3.411 2.378-.292.766-.356 1.635-.356 2.361 0 1.258.261 2.215.77 2.915.65.892 1.624 1.353 2.827 1.353 1.272 0 2.247-.514 2.812-1.464.385-.648.544-1.516.544-2.261h-3.491v-1.127h4.093v-.682zM11.66 12.35c.421 0 1.053.114 1.436.689.288.432.363 1.053.363 1.571h-3.351c0-.497.057-1.107.363-1.551.403-.574.901-.709 1.189-.709zm3.504-6.309h-3.235v1.282h3.235v-1.282zM5.38 7.378v8.625h3.409c1.685 0 3.064-.67 3.064-2.585 0-1.168-.766-1.992-1.838-2.317 1.072-.421 1.646-1.34 1.646-2.374 0-1.742-1.34-2.508-3.045-2.508H5.38v1.159zm3.045 4.386H7.16V8.537h1.436c.996 0 1.551.345 1.551 1.398 0 1.072-.67 1.528-1.722 1.528v.301zm.268 4.251H7.16v-3.274h1.704c1.11 0 1.838.402 1.838 1.647 0 1.283-.785 1.627-2.009 1.627v.001z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/10 bg-black overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-royal/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="site-footer-inner">
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          {/* ── Left: Hero CTA ─────────────────────────────────────── */}
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-royal mb-6">
              Let&apos;s build
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] font-serif text-cream">
              Something worth
              <br />
              <span className="italic text-cream/70">talking about.</span>
            </h2>
            <div className="mt-10">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-300 select-none px-9 py-4 text-sm bg-royal text-white hover:bg-cream hover:text-ink"
                data-testid="footer-cta"
                href="/contact"
              >
                Book a Free Strategy Call <ArrowUpRight />
              </a>
            </div>
          </div>

          {/* ── Right: Newsletter + Nav Grid ───────────────────────── */}
          <div className="lg:justify-self-end w-full max-w-md">
            {/* Drift Digitally Socials */}
            <div className="flex items-center gap-4 text-cream/60 mb-6">
              <a href="https://www.linkedin.com/company/drift-digitally/" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors"><LinkedInIcon /></a>
              <a href="https://www.facebook.com/share/19DFkZ1pGA/" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors"><FacebookIcon /></a>
              <a href="https://www.instagram.com/driftdigitally" target="_blank" rel="noreferrer" className="hover:text-cream transition-colors"><InstagramIcon /></a>
              <a href="mailto:Infodriftdigitally@gmail.com" className="hover:text-cream transition-colors"><MailIcon /></a>
            </div>

            {/* Newsletter form */}
            <form className="mb-10" data-testid="newsletter-form">
              <label className="text-sm text-cream/60">
                Follow the build-in-public journey
              </label>
              <div className="mt-3 flex gap-2 glass rounded-full p-1.5">
                <input
                  data-testid="newsletter-input"
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-5 py-2.5 text-sm text-cream outline-none placeholder:text-cream/30"
                  type="email"
                />
                <button
                  data-testid="newsletter-submit"
                  className="bg-royal text-white rounded-full px-5 py-2.5 text-sm hover:bg-cream hover:text-ink transition-colors"
                  type="submit"
                >
                  Join
                </button>
              </div>
            </form>

            {/* Navigation link grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  className="text-sm text-cream/50 hover:text-cream transition-colors"
                  href={href}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="site-footer-bottom-bar flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-28 overflow-hidden shrink-0">
              <img
                alt="Drift Digitally"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-[280%] max-w-none"
                src="/logo.webp"
              />
            </div>
            <p className="text-sm text-cream/40 max-w-xs">
              Growth strategy and creative craft, under one roof.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="text-sm text-cream/30">&copy; 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
