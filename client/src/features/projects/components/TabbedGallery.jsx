/**
 * @file components/project/TabbedGallery.jsx
 * @description Tabbed image gallery — fixed 16:9 viewer with pill tab controls.
 *
 * Solves the "excessive scrolling" problem of stacked image blocks by
 * collapsing all visual evidence into one fixed-height container.
 *
 * BEHAVIOUR:
 *   - Defaults to tab 0 (demo/result first — highest recruiter impact)
 *   - Tab switch triggers a 300ms opacity fade on the viewer
 *   - object-contain ensures architecture diagrams are never cropped
 *
 * ACCESSIBILITY:
 *   - role="tablist" / role="tab" / role="tabpanel" ARIA pattern
 *   - aria-selected + aria-controls wired correctly
 *
 * Props:
 *   media  {{ title: string, url: string }[]}  — ordered media items
 *                                                 (show final demo first)
 */

import { useState, useRef, useEffect } from "react";

export default function TabbedGallery({ media }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  // Clean up any pending fade timer on unmount
  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (!media?.length) return null;

  const active = media[activeIndex];

  function handleTabClick(i) {
    if (i === activeIndex) return;
    // Fade out → swap image → fade in
    setVisible(false);
    timerRef.current = setTimeout(() => {
      setActiveIndex(i);
      setVisible(true);
    }, 150);
  }

  return (
    <div className="space-y-3">
      {/* ── Pill Tab Controls ──────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Visual evidence tabs"
        className="flex items-center gap-1 pt-1"
      >
        {media.map(({ title }, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              id={`gallery-tab-${i}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`gallery-panel-${i}`}
              type="button"
              onClick={() => handleTabClick(i)}
              className={[
                "px-3 py-1.5 text-[11px] font-mono rounded-md",
                "transition-colors duration-150",
                "border-b-2",
                isActive
                  ? "text-white border-cyan-500"
                  : "text-gray-500 border-transparent hover:text-gray-300",
              ].join(" ")}
            >
              {title}
            </button>
          );
        })}
      </div>
      {/* ── 16:9 Viewer ────────────────────────────────────── */}
      <div
        role="tabpanel"
        id={`gallery-panel-${activeIndex}`}
        aria-labelledby={`gallery-tab-${activeIndex}`}
        className="aspect-video w-full rounded-lg overflow-hidden
                   flex items-center justify-center
                   bg-[rgba(255,255,255,0.02)]
                   border border-[rgba(255,255,255,0.05)]"
      >
        <img
          key={activeIndex} /* key forces re-mount → clean fade */
          src={active.url}
          alt={active.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
