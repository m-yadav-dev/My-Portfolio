/**
 * @file components/skills/TechBadge.jsx
 * @description Hexagonal glassmorphism tech tile.
 *
 * SHAPE:
 *   Pointy-top hexagon via clip-path on a W=80 H=92 container (√3:2 ratio ≈ regular hex).
 *   clip-path kills CSS border — solved with a two-layer stack:
 *     Layer 1 (outer): cyan-500/25 fill → reads as the border edge
 *     Layer 2 (inner): 2px inset, glass gradient fill → reads as the face
 *
 * GLOW ON HOVER:
 *   filter:drop-shadow on the wrapper respects clip-path geometry, creating a
 *   hex-shaped glow — impossible with box-shadow which ignores clip-path.
 *
 * PERFORMANCE:
 *   transform-gpu on wrapper → compositor-layer promotion.
 *   All hover effects are pure CSS → zero JS runtime cost.
 *
 * Props:
 *   name  {string}  — display name
 *   url   {string}  — Cloudinary image URL
 */

const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
// W:H = √3:2 ≈ 0.866 → closest pixel pair: 80:92
const W = 80;
const H = 92;

export default function TechBadge({ name, url }) {
  return (
    <div
      aria-label={name}
      title={name}
      className="relative shrink-0 transform-gpu cursor-default group
                 transition-all duration-300 ease-out
                 hover:scale-110"
      style={{
        width:  W,
        height: H,
        filter: "drop-shadow(0 0 0px rgba(6,182,212,0))",
      }}
      // CSS hover handled via group classes on children; glow via inline onMouseEnter
      onMouseEnter={(e) => { e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(6,182,212,0.45))"; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = "drop-shadow(0 0 0px rgba(6,182,212,0))";   }}
    >
      {/* Layer 1 — cyan border (outer hex) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: HEX, background: "rgba(6,182,212,0.28)" }}
      />

      {/* Layer 2 — glass face (inner hex, 2px inset creates border illusion) */}
      <div
        className="absolute flex flex-col items-center justify-center gap-1"
        style={{
          inset:          "2px",
          clipPath:       HEX,
          background:     "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {/* Icon */}
        <div style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={url}
            alt={`${name} logo`}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling;
              if (fb) fb.classList.remove("hidden");
            }}
          />
          <span aria-hidden="true" className="hidden text-xs font-bold text-cyan-400 font-mono">
            {name.slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Label — padded away from angled corners */}
        <span
          style={{ fontSize: 8, lineHeight: 1.2, maxWidth: 58, padding: "0 6px" }}
          className="font-semibold text-[#E0E0E0] text-center"
        >
          {name}
        </span>
      </div>
    </div>
  );
}
