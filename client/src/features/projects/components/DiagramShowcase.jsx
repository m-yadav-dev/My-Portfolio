/**
 * @file components/project/DiagramShowcase.jsx
 * @description Visual Evidence section — delegates to TabbedGallery.
 *
 * Props:
 *   media  {{ title: string, url: string }[]}  — from projectsData.mediaAssets[]
 *
 * Schema is now normalised — no field-name adapter needed.
 * Renders nothing when media[] is empty or missing (Jobby App case).
 */

import TabbedGallery from "./TabbedGallery";

export default function DiagramShowcase({ media }) {
  if (!media?.length) return null;

  return (
    <section
      aria-labelledby="diagrams-heading"
      className="mt-14 pt-10 border-t border-border"
    >
      <p
        id="diagrams-heading"
        className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-6"
      >
        Visual Evidence
      </p>

      <TabbedGallery media={media} />
    </section>
  );
}
