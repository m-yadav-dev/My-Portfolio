/**
 * @file components/project/CategoryFilter.jsx
 * @description Pill-style filter tabs for the projects grid.
 *
 * SPEC: Three categories + "All" — must match spec exactly:
 *   "All" | "MERN Stack" | "n8n Automations" | "NxtWave Frontend"
 *
 * Props:
 *   categories    {string[]}  — derived from API data (deduped)
 *   activeCategory {string}   — currently selected filter
 *   onSelect      {function}  — (category: string) => void
 */

import { cn } from "@/lib/utils";

const ALL = "All";

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  const tabs = [ALL, ...categories];

  return (
    <div
      id="projects-category-filter"
      className="flex flex-wrap gap-2 mb-10"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {tabs.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-mono tracking-wide border transition-all duration-200",
              isActive
                ? "bg-primary text-obsidian border-primary font-semibold"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
