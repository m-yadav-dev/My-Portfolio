/**
 * @file components/project/DiagramShowcase.jsx
 * @description Full-width diagram/GIF showcase for a project detail page.
 *
 * Renders each item in the diagramShowcase[] array as a labelled, full-width
 * image block. Uses loading="lazy" + decoding="async" to prevent CLS.
 * Conditionally renders nothing when the array is empty or missing.
 *
 * Props:
 *   diagrams  {{ label: string, url: string }[]}  — diagramShowcase from projectsData
 */

export default function DiagramShowcase({ diagrams }) {
  if (!diagrams?.length) return null;

  return (
    <section aria-labelledby="diagrams-heading" className="mt-14 pt-10 border-t border-border">
      <p
        id="diagrams-heading"
        className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-6"
      >
        Visual Evidence
      </p>

      <div className="space-y-8">
        {diagrams.map(({ label, url }, i) => (
          <figure key={i} className="space-y-3">
            {/* Full-width image — lazy loaded, 16:9 CLS-safe container */}
            <div
              className="relative w-full overflow-hidden rounded-xl border border-border bg-secondary"
              style={{ aspectRatio: "16 / 9" }}
            >
              <img
                src={url}
                alt={label}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>

            {/* Caption */}
            <figcaption className="text-xs font-mono text-muted-foreground text-center">
              {label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
