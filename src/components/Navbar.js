'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',           label: 'Home'       },
  { href: '/services',   label: 'Services'   },
  { href: '/process',    label: 'Process'    },
  { href: '/portfolio',  label: 'Portfolio'  },
  { href: '/industries', label: 'Industries' },
  { href: '/about',      label: 'About'      },
  { href: '/insights',   label: 'Insights'   },
  { href: '/contact',    label: 'Contact'    },
];

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll(); // sync on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = () => setIsOpen((v) => !v);

  const linkClass = (href) =>
    `global-nav-link ${pathname === href ? 'global-nav-link-active' : 'global-nav-link-inactive'}`;

  const mobileLinkClass = (href) =>
    `global-mobile-link ${pathname === href ? 'global-mobile-link-active' : 'global-mobile-link-inactive'}`;

  return (
    <>
      <header
        data-testid="navbar"
        className={`global-header${isScrolled ? ' global-header-scrolled' : ''}`}
      >
        <nav className="global-nav">

          {/* Logo */}
          <a data-testid="logo-link" className="global-logo-link" href="/">
            <div className="global-logo-container">
              <img alt="Drift Digitally" className="global-logo-img" src="/logo.webp" />
            </div>
          </a>

          {/* Desktop nav links */}
          <div className="global-nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} data-testid={`nav-${label.toLowerCase()}`} className={linkClass(href)} href={href}>
                {label}
              </a>
            ))}
          </div>

          {/* CTA + mobile hamburger */}
          <div className="global-cta-container">
            <a className="global-cta-button" data-testid="nav-cta" href="/contact">
              Start Your Project
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
              </svg>
            </a>

            <button
              data-testid="mobile-menu-toggle"
              className="global-mobile-toggle"
              onClick={toggle}
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/>
              </svg>
            </button>
          </div>

        </nav>
      </header>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="global-mobile-menu" role="dialog" aria-label="Navigation menu">
          <button className="global-mobile-close" onClick={toggle} aria-label="Close Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="M6 6l12 12"/>
            </svg>
          </button>

          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} onClick={toggle} className={mobileLinkClass(href)} href={href}>
              {label}
            </a>
          ))}

          <a onClick={toggle} className="global-mobile-cta" href="/contact">
            Start Your Project
          </a>
        </div>
      )}
    </>
  );
}
