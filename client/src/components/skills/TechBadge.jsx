/**
 * @file components/skills/TechBadge.jsx
 * @description Single tech-stack icon tile — PNG/SVG/WebP from Cloudinary.
 *
 * PERFORMANCE (Phase 6 fix):
 *   - Framer Motion whileHover removed — replaced with pure CSS transitions.
 *   - transform-gpu + will-change-transform → browser pre-allocates a
 *     compositor layer, eliminating main-thread jank on hover.
 *   - hover:-translate-y-1 hover:scale-105 are CSS-only, zero JS overhead.
 *
 * VISIBILITY FIX:
 *   - bg-gradient-to-br from-white/5 to-transparent lifts dark logos
 *     (Express, GitHub, ShadCn) off the obsidian background cleanly.
 *   - border border-white/10 gives a crisp edge without heavy chrome.
 *   - backdrop-blur-sm keeps the glassmorphism premium on transparent surfaces.
 *
 * Props:
 *   name  {string}  — display name (e.g. "ReactJS")
 *   url   {string}  — Cloudinary delivery URL
 */

export default function TechBadge({ name, url }) {
  return (
    <div
      className="
        flex flex-col items-center gap-2.5 p-3.5 rounded-xl
        bg-gradient-to-br from-white/5 to-transparent
        border border-white/10
        backdrop-blur-sm
        cursor-default
        transform-gpu will-change-transform
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-105
        hover:shadow-lg hover:border-white/20
      "
      aria-label={name}
      title={name}
    >
      {/* Icon container — fixed 48×48 prevents CLS */}
      <div className="w-12 h-12 flex items-center justify-center shrink-0">
        <img
          src={url}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />
        {/* Initials fallback — hidden until onError fires */}
        <span
          aria-hidden="true"
          className="hidden w-full h-full items-center justify-center text-sm font-bold text-primary font-mono"
        >
          {name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Name label */}
      <span className="text-[10px] font-mono text-muted-foreground/80 text-center leading-tight">
        {name}
      </span>
    </div>
  );
}
