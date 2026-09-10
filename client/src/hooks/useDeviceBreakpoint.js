import { useState, useEffect } from "react";

/**
 * @file hooks/useDeviceBreakpoint.js
 * @description Reactive viewport breakpoint hook.
 *
 * Returns { isMobile, isTablet, isDesktop } booleans that update
 * on window resize. Uses a debounced resize listener for performance.
 *
 * Breakpoints:
 *   mobile  → < 768px   (iPhone SE … Galaxy Z Fold 5 folded)
 *   tablet  → 768–1024px (iPads, Galaxy Z Fold 5 unfolded)
 *   desktop → > 1024px   (laptops, monitors)
 */

const MOBILE_MAX = 768;
const TABLET_MAX = 1024;

function getBreakpoint(width) {
  if (width < MOBILE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

export default function useDeviceBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() =>
    typeof window !== "undefined"
      ? getBreakpoint(window.innerWidth)
      : "desktop"
  );

  useEffect(() => {
    let rafId = null;

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setBreakpoint(getBreakpoint(window.innerWidth));
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    isMobile: breakpoint === "mobile",
    isTablet: breakpoint === "tablet",
    isDesktop: breakpoint === "desktop",
  };
}
