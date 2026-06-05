/**
 * @file components/sections/ContactSection.jsx
 * @description #contact section — pure layout orchestrator.
 *
 * SPEC RESPONSIBILITY (SoC — after refactor):
 *   - Owns the section anchor ID (#contact)
 *   - Owns the two-column grid layout
 *   - Imports and renders <ContactInfo> (left) and <ContactForm> (right)
 *   - ZERO form logic, ZERO API calls, ZERO trust signal data
 */

import { motion } from "framer-motion";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactForm from "@/components/sections/contact/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-6 border-t border-border"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Left — heading + trust signals */}
          <ContactInfo />

          {/* Right — interactive form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
