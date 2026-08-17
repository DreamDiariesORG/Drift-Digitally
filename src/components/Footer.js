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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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

          {/* Social + copyright */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-cream/60 hover:text-cream transition-colors"
            >
              <InstagramIcon /> @driftdigitally
            </a>
            <span className="text-sm text-cream/30">&copy; 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
