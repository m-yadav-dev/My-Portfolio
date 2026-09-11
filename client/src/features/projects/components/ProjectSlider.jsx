/**
 * @file components/project/ProjectSlider.jsx
 * @description GPU-accelerated Embla carousel wrapping ProjectCard instances.
 *
 * PERFORMANCE (Phase 7):
 *   - `will-change-[transform]` on the slide track — browser allocates a
 *     dedicated compositor layer, eliminating main-thread jank during swipe.
 *   - `transform-gpu` on each slide — forces translate3d(0,0,0) promotion.
 *   - containScroll:"trimSnaps" prevents rubber-band overscroll.
 *
 * RESPONSIVE BREAKPOINTS (spec):
 *   default  (xs)  → 85% width  → ~1 slide + 15% peek
 *   sm 640px       → 60% width  → ~1.5 slides
 *   md 768px       → 48% width  → 2 slides
 *   lg 1024px      → 31.5%      → 3 slides
 *   xl 1280px      → 31.5%      → 3 slides (max-width constrained by parent)
 *
 * Props:
 *   projects        {object[]}  — filtered project array from ProjectsSection
 *   activeCategory  {string}    — triggers reset to slide 0 on change
 */

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const EMBLA_OPTIONS = {
  align:         "start",
  dragFree:      false,
  containScroll: "trimSnaps",
};

// ---------------------------------------------------------------------------
// Arrow button
// ---------------------------------------------------------------------------
function ArrowBtn({ id, direction, onClick, disabled }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200",
        disabled
          ? "border-border/20 text-muted-foreground/20 cursor-not-allowed"
          : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
      )}
    >
      {direction === "prev"
        ? <ChevronLeft  size={16} aria-hidden="true" />
        : <ChevronRight size={16} aria-hidden="true" />}
    </button>
  );
}

// ---------------------------------------------------------------------------
// ProjectSlider
// ---------------------------------------------------------------------------
export default function ProjectSlider({ projects, activeCategory }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS);
  const [canPrev,    setCanPrev]    = useState(false);
  const [canNext,    setCanNext]    = useState(true);
  const [activeSnap, setActiveSnap] = useState(0);

  const syncState = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setActiveSnap(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    syncState();
    emblaApi.on("select", syncState);
    emblaApi.on("reInit", syncState);
    return () => { emblaApi.off("select", syncState); emblaApi.off("reInit", syncState); };
  }, [emblaApi, syncState]);

  // Reset to slide 0 on category change
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(0);
    syncState();
  }, [activeCategory, emblaApi, syncState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div id="project-slider">
      {/* Controls row */}
      <div className="flex items-center justify-end gap-2 mb-5">
        <span className="text-xs text-muted-foreground font-mono mr-auto tabular-nums">
          {activeSnap + 1} / {projects.length}
        </span>
        <ArrowBtn id="slider-prev" direction="prev" onClick={scrollPrev} disabled={!canPrev} />
        <ArrowBtn id="slider-next" direction="next" onClick={scrollNext} disabled={!canNext} />
      </div>

      {/* Embla viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
        aria-label="Project slides"
        aria-roledescription="carousel"
      >
        {/*
          will-change-[transform] → tells the browser to promote this element
          to its own compositor layer so swipe animations never hit the main thread.
        */}
        <div className="flex gap-4 sm:gap-5 items-stretch will-change-[transform]">
          {projects.map((project) => (
            <div
              key={project.id}
              // transform-gpu → forces translate3d(0,0,0) GPU acceleration per slide
              className={cn(
                "shrink-0 min-w-0 transform-gpu",
                "w-[85%] sm:w-[60%] md:w-[48%] lg:w-[31.5%] xl:w-[31.5%]"
              )}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide: ${project.title}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}__${project.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-6" role="tablist" aria-label="Slide indicators">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeSnap}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeSnap ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
