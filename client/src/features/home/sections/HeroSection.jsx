import { useState } from "react";
import profileImg from "@/assets/profile.jpg";
import Modal from "@/components/ui/Modal";
import ConsultationForm from "@/features/contact/components/ConsultationForm";
import "@/styles/HeroSection.css";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        id="hero"
        className="portfolio-hero relative min-h-[85vh] flex items-center py-16"
        aria-label="Hero introduction"
      >
        <div className="portfolio-hero__layout w-full flex flex-col gap-10">
          <div className="portfolio-hero__copy order-2 text-center animate-fade-in-up">
            <p className="portfolio-hero__eyebrow font-mono text-cyan-400 text-xs uppercase tracking-[0.2em] mb-4">
              Manish Yadav
            </p>

            <h1
              id="hero-heading"
              className="portfolio-hero__heading text-white text-3xl font-bold tracking-tight leading-[1.12] mb-5"
            >
              Full-Stack MERN Developer &
              <span className="text-cyan-400"> AI Automation</span> Builder
            </h1>

            {/* Subtitle */}
            <p className="portfolio-hero__description text-slate-400 text-sm max-w-xl mx-auto leading-relaxed mb-8">
              I build functional web applications and integrate Generative AI
              workflows. Focused on clean architecture, reliable deployments,
              and solving problems using React, Node.js, and agentic tools like
              n8n.
            </p>

            {/* CTAs */}
            <div className="portfolio-hero__actions flex flex-col items-center gap-3">
              <a
                href="#case-studies"
                id="hero-cta-projects"
                className="portfolio-hero__cta w-full px-7 py-3 rounded-md bg-cyan-400 text-[#0B0C10] text-sm font-semibold hover:bg-cyan-300 transition-colors duration-200 text-center"
              >
                View Case Studies
              </a>
              <button
                type="button"
                id="hero-cta-contact"
                onClick={() => setIsModalOpen(true)}
                className="portfolio-hero__cta w-full px-7 py-3 rounded-md border border-cyan-400/40 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition-all duration-200"
              >
                Book a Consultation
              </button>
            </div>
          </div>
          <div className="portfolio-hero__media order-1 flex justify-center animate-fade-in-up [animation-delay:200ms]">
            <div className="portfolio-hero__portrait relative w-48 h-48">
              <div
                className="absolute -inset-4 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.03) 50%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              {/* Profile image */}
              <img
                // src={profileImg}
                src="https://res.cloudinary.com/dyjo8b263/image/upload/v1791972922/Professional_Portrait_in_Soft_Studio_Light_tgfnqz.png"
                alt="Manish Yadav — Full-Stack Developer"
                className="relative z-10 w-full h-full object-cover rounded-full border-2 border-white/10"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Let's Build Something"
      >
        <ConsultationForm />
      </Modal>
    </>
  );
}
