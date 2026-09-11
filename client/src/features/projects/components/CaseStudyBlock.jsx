/**
 * @file components/project/CaseStudyBlock.jsx
 * @description Renders a single Problem / Solution / Impact narrative block.
 *
 * Props:
 *   label   {string}  — "Problem" | "Solution" | "Impact"
 *   index   {number}  — Display index (01, 02, 03)
 *   content {string}  — The narrative text from API; renders skeleton if null.
 *
 * SPEC: Documentation-style layout — left border accent communicates block type
 * via color (red=Problem, cyan=Solution, green=Impact).
 */

const ACCENT_MAP = {
  problem:  "text-red-400  border-red-400/30",
  solution: "text-primary  border-primary/30",
  impact:   "text-green-400 border-green-400/30",
};

export default function CaseStudyBlock({ label, index, content }) {
  const key = label.toLowerCase();
  const accentClass = ACCENT_MAP[key] ?? "text-primary border-primary/30";
  const [labelColor, borderColor] = accentClass.split(" ");

  return (
    <div
      id={`case-study-${key}`}
      className={`border-l-2 pl-6 mb-10 group hover:opacity-90 transition-opacity duration-200 ${borderColor}`}
    >
      <span className={`text-[10px] font-mono tracking-widest uppercase block mb-2 ${labelColor}`}>
        {String(index).padStart(2, "0")} / {label}
      </span>

      {content ? (
        <p className="text-body text-sm leading-relaxed">{content}</p>
      ) : (
        /* Skeleton while API data is null */
        <div className="space-y-2" aria-hidden="true">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-5/6 rounded" />
          <div className="skeleton h-3 w-4/6 rounded" />
        </div>
      )}
    </div>
  );
}
