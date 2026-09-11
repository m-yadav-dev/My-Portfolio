/**
 * @file components/layout/Footer.jsx
 * @description Minimal site footer.
 * Credit strip, social links, and copyright. Zero business logic.
 */

import { Terminal, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-obsidian" role="contentinfo" id="footer">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Brand mark */}
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-primary" aria-hidden="true" />
          <span className="text-sm text-muted-foreground font-mono">
            manish<span className="text-primary">.</span>dev
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xs text-muted-foreground text-center">
          MERN Stack · AI Integrations · Google Gemini RAG
        </p>

        {/* Social + copyright */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            id="footer-github"
            href="https://github.com/m-yadav-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground transition-colors duration-200"
          >
            <GithubIcon size={15} />
          </a>
          <a
            id="footer-linkedin"
            href="https://linkedin.com/in/manish-yadav"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-foreground transition-colors duration-200"
          >
            <LinkedinIcon size={15} />
          </a>
          <a
            id="footer-email"
            href="#contact"
            aria-label="Contact"
            className="hover:text-foreground transition-colors duration-200"
          >
            <Mail size={15} aria-hidden="true" />
          </a>
          <span className="text-xs pl-3 border-l border-border">© {year}</span>
        </div>

      </div>
    </footer>
  );
}
