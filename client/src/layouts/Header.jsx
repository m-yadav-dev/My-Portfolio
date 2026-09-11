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

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
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

  const scrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    setMobileOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "glass-surface border-b border-border" : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link to="/" id="nav-logo" className="flex items-center gap-2 group" aria-label="Home">
          <div className="w-8 h-8 rounded border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors duration-200">
            <Terminal size={15} className="text-primary" aria-hidden="true" />
          </div>
          <span className="font-semibold text-sm tracking-wide text-foreground/90 group-hover:text-foreground transition-colors duration-200">
            Manish<span className="text-primary">.</span>dev
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                id={`nav-${label.toLowerCase()}`}
                onClick={(e) => scrollTo(e, href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a id="nav-github" href="https://github.com/m-yadav-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            <GithubIcon size={17} />
          </a>
          <a id="nav-linkedin" href="https://linkedin.com/in/manish-yadav" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            <LinkedinIcon size={17} />
          </a>
          <a id="nav-hire-cta" href="#contact" onClick={(e) => scrollTo(e, "#contact")} className="ml-2 px-4 py-1.5 rounded border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-200">
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          id="nav-mobile-toggle"
          type="button"
          className="md:hidden text-muted-foreground hover:text-foreground p-1 transition-colors"
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
        <div id="mobile-menu" className="md:hidden glass-surface border-b border-border px-6 pb-5" role="navigation" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-4 pt-3" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} id={`mobile-nav-${label.toLowerCase()}`} onClick={(e) => scrollTo(e, href)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-1">
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
