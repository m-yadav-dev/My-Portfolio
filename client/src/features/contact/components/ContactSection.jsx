/**
 * @file components/sections/ContactSection.jsx
 * @description Top-level Contact section.
 *
 * Composes ContactInfo (left) + ContactForm (right) inside a glassmorphism
 * card. Responsive: stacks on mobile, side-by-side on lg+.
 */

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-20 sm:py-28"
    >
      {/* Ambient glow (decorative) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Glass card */}
      <div className="relative glass-surface rounded-2xl p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — info */}
          <ContactInfo />

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
