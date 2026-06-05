/**
 * @file components/sections/contact/ContactInfo.jsx
 * @description Presentational left-column: section header copy + trust signals.
 * Zero form logic, zero API calls — purely display.
 */

import { Clock, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const SIGNALS = [
  {
    id: "signal-time",
    icon: <Clock size={15} className="text-primary shrink-0" aria-hidden="true" />,
    text: "Responds within 24 hours",
  },
  {
    id: "signal-email",
    icon: <Mail size={15} className="text-primary shrink-0" aria-hidden="true" />,
    text: "Delivered directly to inbox via Resend",
  },
  {
    id: "signal-chat",
    icon: <MessageSquare size={15} className="text-primary shrink-0" aria-hidden="true" />,
    text: "Or ask the AI assistant (bottom-right corner)",
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-col gap-8"
    >
      {/* Section label + heading */}
      <div>
        <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3">
          04 / CONTACT
        </motion.p>
        <motion.h2
          variants={fadeUp}
          id="contact-heading"
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Ready to build something?{" "}
          <span className="text-muted-foreground font-normal">Let's talk.</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-body text-sm leading-relaxed max-w-sm">
          Freelance project, full-time opportunity, or a technical question — I respond promptly and professionally.
        </motion.p>
      </div>

      {/* Trust signals */}
      <div className="flex flex-col gap-4">
        {SIGNALS.map(({ id, icon, text }) => (
          <motion.div
            key={id}
            id={id}
            variants={fadeUp}
            className="flex items-center gap-3"
          >
            {icon}
            <span className="text-sm text-muted-foreground">{text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
