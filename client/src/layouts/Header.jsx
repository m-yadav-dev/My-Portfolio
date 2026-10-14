/**
 * @file components/layout/Header.jsx
 * @description Fixed top navigation bar.
 *
 * SPEC RULES:
 *  - Anchor links (#about, #skills, #projects, #contact) trigger smooth scroll
 *    on the LandingPage. When clicked from a detail page, navigates to / first.
 *  - Glassmorphism background activates after 20px scroll.
 *  - Mobile hamburger collapses the nav for small viewports.
 *  - "Hire Me" CTA scrolls to #contact — primary conversion action.
 */

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Terminal, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import HeaderListItems from "./HeaderListItems";
import "@/styles/Header.css";

const NAV_LINKS = [
  { id: 1, label: "About", href: "#about" },
  { id: 2, label: "Skills", href: "#skills" },
  { id: 3, label: "Projects", href: "#case-studies" },
  { id: 4, label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, href) => {
    const id = href.replace("#", "");
    setMobileOpen(false);
    if (location.pathname !== "/") {
      // Cross-page: navigate home first, then scroll after mount
      e.preventDefault();
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
    }
    // On landing page: let native <a href="#id"> + scroll-smooth handle it
  };

  return (
    <header
      className={cn(
        "portfolio-header fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "glass-surface border-b border-border" : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="portfolio-header__nav max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link to="/" id="nav-logo" className="portfolio-header__brand flex items-center gap-2 group" aria-label="Home">
          <div className="w-8 h-8 rounded border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors duration-200">
            <Terminal size={15} className="text-primary" aria-hidden="true" />
          </div>
          <span className="font-semibold text-sm tracking-wide text-foreground/90 group-hover:text-foreground transition-colors duration-200">
            Manish<span className="text-primary">.</span>dev
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="portfolio-header__desktop hidden items-center gap-8" role="list">
          {NAV_LINKS.map(({ id, label, href }) => (
            <HeaderListItems key={id} label={label} href={href} scrollTo={handleNavClick} />
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="portfolio-header__desktop hidden items-center gap-3">
          <a id="nav-github" href="https://github.com/m-yadav-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            <GithubIcon size={17} />
          </a>
          <a id="nav-linkedin" href="https://linkedin.com/in/manish-yadav" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            <LinkedinIcon size={17} />
          </a>
          <a id="nav-hire-cta" href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="ml-2 px-4 py-1.5 rounded border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-200">
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          id="nav-mobile-toggle"
          type="button"
          className="portfolio-header__toggle text-muted-foreground hover:text-foreground p-1 transition-colors"
          onClick={() => setMobileOpen((p) => !p)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div id="mobile-menu" className="portfolio-header__mobile-menu glass-surface border-b border-border px-6 pb-5" role="navigation" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-4 pt-3" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} id={`mobile-nav-${label.toLowerCase()}`} onClick={(e) => handleNavClick(e, href)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-1">
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-3 border-t border-border flex gap-4">
              <a href="https://github.com/m-yadav-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground"><GithubIcon size={17} /></a>
              <a href="https://linkedin.com/in/manish-yadav" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground"><LinkedinIcon size={17} /></a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
