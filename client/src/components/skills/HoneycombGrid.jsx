/**
 * @file components/skills/HoneycombGrid.jsx
 * @description Tessellated honeycomb layout for hex TechBadge tiles.
 *
 * GEOMETRY (pointy-top hexagon, W=80 H=92):
 *   - Horizontal gap between tiles: GAP = 6px
 *   - Items per row: COLS = 3
 *   - Even-row offset: (W + GAP) / 2 = 43px  → hexes slot into gaps of odd rows
 *   - Vertical row pitch: H × 0.75 = 69px    → rows interlock with 23px overlap
 *   - Negative top margin per row (after first): -(H - H×0.75) = -H×0.25 ≈ -23px
 *
 * RESPONSIVE:
 *   - sm+ : full honeycomb with offset rows
 *   - < sm : simple flex-wrap (no offset) so tiny screens never overflow
 *
 * Props:
 *   tools  {{ name: string, url: string }[]}
 */

import TechBadge from "@/components/skills/TechBadge";

// ── Geometry constants ──────────────────────────────────────────────────────
const HEX_W   = 80;   // px — matches TechBadge W
const HEX_H   = 92;   // px — matches TechBadge H
const GAP     = 6;    // px — horizontal gap between tiles in the same row
const COLS    = 3;    // tiles per row inside each category island

// Derived values
const ROW_PITCH      = HEX_H * 0.75;                    // 69px vertical center-to-center
const NEG_MARGIN     = -(HEX_H - ROW_PITCH);            // -23px overlap
const EVEN_OFFSET    = (HEX_W + GAP) / 2;               // 43px — even rows shifted right

/** Split flat array into chunks of size n */
function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export default function HoneycombGrid({ tools }) {
  const rows = chunk(tools, COLS);

  return (
    <>
      {/* ── Mobile fallback (<sm) — plain wrap, no offset math ── */}
      <div className="flex flex-wrap gap-3 sm:hidden">
        {tools.map(({ name, url }) => (
          <TechBadge key={name} name={name} url={url} />
        ))}
      </div>

      {/* ── sm+ — true honeycomb with interlocking rows ────────── */}
      <div className="hidden sm:flex sm:flex-col sm:items-start">
        {rows.map((rowTools, rowIdx) => (
          <div
            key={rowIdx}
            className="flex flex-row"
            style={{
              gap:       GAP,
              marginTop: rowIdx === 0 ? 0 : NEG_MARGIN,
              marginLeft: rowIdx % 2 === 1 ? EVEN_OFFSET : 0,
            }}
          >
            {rowTools.map(({ name, url }) => (
              <TechBadge key={name} name={name} url={url} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
