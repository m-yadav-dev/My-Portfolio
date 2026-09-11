/**
 * @file components/project/VisualEvidenceSection.jsx
 * @description Renders the Cloudinary architecture diagram and demo GIF.
 *
 * SPEC RULES (Asset Management section):
 *  1. loading="lazy"  on all Cloudinary <img> tags.
 *  2. Strict aspect-ratio containers prevent Cumulative Layout Shift (CLS).
 *  3. Skeleton displayed while the Cloudinary URL is resolving (or null).
 *  4. All URLs must be https://res.cloudinary.com/... — never local paths.
 *
 * Props:
 *   architectureDiagram {string|null}  Cloudinary URL for the diagram
 *   demoGif             {string|null}  Cloudinary URL for the demo GIF
 */

export default function VisualEvidenceSection({ architectureDiagram, demoGif }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10"
      aria-label="Visual project evidence"
    >
      {/* Architecture Diagram — 4:3 */}
      <div>
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-3">
          System Architecture
        </p>
        <div
          id="project-architecture-diagram"
          className="relative w-full rounded-lg border border-border overflow-hidden bg-secondary"
          style={{ aspectRatio: "4 / 3" }}
        >
          {architectureDiagram ? (
            <img
              src={architectureDiagram}
              alt="System architecture diagram"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="skeleton absolute inset-0 w-full h-full flex items-center justify-center" aria-hidden="true">
              <span className="text-[10px] font-mono text-muted-foreground/40">Architecture diagram via Cloudinary</span>
            </div>
          )}
        </div>
      </div>

      {/* Demo GIF — 16:9 */}
      <div>
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-3">
          UI Demonstration
        </p>
        <div
          id="project-demo-gif"
          className="relative w-full rounded-lg border border-border overflow-hidden bg-secondary"
          style={{ aspectRatio: "16 / 9" }}
        >
          {demoGif ? (
            <img
              src={demoGif}
              alt="Live UI demonstration"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="skeleton absolute inset-0 w-full h-full flex items-center justify-center" aria-hidden="true">
              <span className="text-[10px] font-mono text-muted-foreground/40">Demo GIF via Cloudinary</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
