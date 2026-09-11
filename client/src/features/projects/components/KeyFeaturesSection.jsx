/**
 * @file components/project/KeyFeaturesSection.jsx
 * @description Vertical bullet list of key features for a project.
 *
 * Minimal typography-first design — no cards, no borders, no backgrounds.
 * Features stack in a single column with a standard disc marker.
 *
 * Props:
 *   features  {string[]}  — keyFeatures array from projectsData
 */

export default function KeyFeaturesSection({ features }) {
  if (!features?.length) return null;

  return (
    <section aria-labelledby="key-features-heading" className="mt-14 pt-10 border-t border-border">
      <p
        id="key-features-heading"
        className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-6"
      >
        Key Features
      </p>

      <ul className="flex flex-col gap-3 pl-1" role="list">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Minimal accent dot — no heavy card chrome */}
            <span
              className="mt-[5px] w-1.5 h-1.5 rounded-full bg-primary shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
