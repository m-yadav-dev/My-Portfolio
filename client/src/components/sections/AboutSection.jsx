/**
 * @file components/sections/AboutSection.jsx
 * @description Value proposition section anchored at #about.
 * Three pillars: MERN Specialist / AI Agent Integrations / Outcome-Driven.
 * Framer Motion scroll-triggered fade-up. No API calls.
 */

import { Briefcase, Bot, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const PILLARS = [
  {
    id: "pillar-mern",
    icon: <Briefcase size={19} className="text-primary" aria-hidden="true" />,
    title: "MERN Specialist",
    body: "Production-grade full-stack systems: React, Express, MongoDB, Node.js. Built for scale and maintainability.",
  },
  {
    id: "pillar-ai",
    icon: <Bot size={19} className="text-primary" aria-hidden="true" />,
    title: "AI Agent Integrations",
    body: "n8n automation + Google Gemini RAG pipelines. LLMs connected to real business logic — not just demos.",
  },
  {
    id: "pillar-outcomes",
    icon: <Zap size={19} className="text-primary" aria-hidden="true" />,
    title: "Outcome-Driven",
    body: "Every build is framed as Problem → Solution → Impact. I ship to measurable KPIs, not just working code.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 px-6 border-t border-border"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-14">
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3">
            01 / ABOUT
          </motion.p>
          <motion.h2 variants={fadeUp} id="about-heading" className="text-2xl md:text-3xl font-bold mb-4">
            Why hire a MERN developer{" "}
            <span className="text-muted-foreground font-normal">who speaks AI?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body text-sm max-w-lg leading-relaxed">
            Modern products need engineers who ship full-stack systems with intelligent
            automation baked in from day one — not bolted on later.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {PILLARS.map(({ id, icon, title, body }) => (
            <motion.div
              key={id}
              id={id}
              variants={fadeUp}
              className="p-6 rounded-lg border border-border bg-card hover:border-primary/25 transition-colors duration-300 group"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
