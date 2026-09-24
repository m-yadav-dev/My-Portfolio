import { Link } from "react-router-dom";
import { Terminal, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectDetailHeader = ({ projectName, backUrl = "/#projects" }) => {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 glass-surface border-b border-border/50 h-16 transition-all duration-300 bg-background/80 backdrop-blur-md"
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <nav aria-label="Breadcrumb" className="flex-1 min-w-0">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 group"
                aria-label="Home"
              >
                <div className="w-7 h-7 rounded border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors duration-200">
                  <Terminal size={13} className="text-primary" aria-hidden="true" />
                </div>
              </Link>
            </li>
            <li>
              <ChevronRight size={14} className="text-muted-foreground/60 flex-shrink-0" aria-hidden="true" />
            </li>
            <li className="hidden sm:block">
              <Link
                to={backUrl}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                Projects
              </Link>
            </li>
            <li className="hidden sm:block">
              <ChevronRight size={14} className="text-muted-foreground/60 flex-shrink-0" aria-hidden="true" />
            </li>
            <li className="min-w-0 flex-1">
              <span className="text-foreground/80 font-medium truncate block max-w-[120px] md:max-w-xs lg:max-w-md" aria-current="page">
                {projectName}
              </span>
            </li>
          </ol>
        </nav>

        <div className="flex items-center ml-4">
          <a
            href="/#contact"
            className="px-4 py-1.5 rounded border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all duration-200 whitespace-nowrap"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default ProjectDetailHeader;