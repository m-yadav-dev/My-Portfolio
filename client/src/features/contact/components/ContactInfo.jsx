/**
 * @file components/sections/contact/ContactInfo.jsx
 * @description Left-side "info panel" displayed alongside the contact form.
 *
 * Provides context about why someone should reach out, plus quick
 * contact channels (email, location, availability).
 */

import { motion } from "framer-motion";
import { INFO_ITEMS } from "./infoItemsData.jsx";
import InfoItems from "./InfoItems";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ContactInfo() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-8"
    >
      {/* Heading */}
      <div>
        <p className="font-mono text-cyan-400 text-xs uppercase tracking-[0.2em] mb-3">
          Get in Touch
        </p>
        <h2
          id="contact-heading"
          className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight"
        >
          Let&rsquo;s Build Something{" "}
          <span className="text-cyan-400">Together</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-4 max-w-md">
          Have a project idea, a collaboration opportunity, or just want to say hello?
          Fill out the form and I&rsquo;ll get back to you shortly.
        </p>
      </div>

      {/* Info items */}
      <div className="flex flex-col gap-5">
        {INFO_ITEMS.map((item) => (
          <InfoItems key={item.label} variants={itemVariants} icon={item.icon} label={item.label} value={item.value} href={item.href} />
        ))}
      </div>
    </motion.div>
  );
}
