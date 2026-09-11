/**
 * @file components/project/ProjectDetailSkeleton.jsx
 * @description Loading state for the ProjectDetail page.
 * Shown while GET /api/projects/:projectId is in-flight.
 * Uses the `skeleton` utility class from index.css (pulsing bg animation).
 * Mirrors the real layout so there is zero layout shift when data arrives.
 */

export default function ProjectDetailSkeleton() {
  return (
    <div
      className="max-w-4xl mx-auto px-6 py-12 animate-fade-in"
      role="status"
      aria-label="Loading project details"
      aria-busy="true"
    >
      {/* Back link */}
      <div className="skeleton h-4 w-24 mb-10 rounded" />

      {/* Category + Title */}
      <div className="skeleton h-3 w-20 mb-4 rounded" />
      <div className="skeleton h-9 w-3/4 mb-3 rounded" />
      <div className="skeleton h-4 w-1/2 mb-8 rounded" />

      {/* Tech badge row */}
      <div className="flex gap-2 mb-12 flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-6 w-16 rounded" />
        ))}
      </div>

      {/* Visual evidence — 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div>
          <div className="skeleton h-3 w-32 mb-3 rounded" />
          <div className="skeleton w-full rounded-lg" style={{ aspectRatio: "4/3" }} />
        </div>
        <div>
          <div className="skeleton h-3 w-32 mb-3 rounded" />
          <div className="skeleton w-full rounded-lg" style={{ aspectRatio: "16/9" }} />
        </div>
      </div>

      {/* Case study blocks */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border-l-2 border-border pl-6 mb-10">
          <div className="skeleton h-3 w-24 mb-4 rounded" />
          <div className="skeleton h-3 w-full mb-2 rounded" />
          <div className="skeleton h-3 w-5/6 mb-2 rounded" />
          <div className="skeleton h-3 w-4/6 rounded" />
        </div>
      ))}

      {/* Action buttons */}
      <div className="flex gap-4 mt-10 pt-8 border-t border-border">
        <div className="skeleton h-9 w-28 rounded" />
        <div className="skeleton h-9 w-24 rounded" />
      </div>
    </div>
  );
}
