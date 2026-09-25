import { useState } from "react";
import profileImg from "@/assets/profile.jpg";
import Modal from "@/components/ui/Modal";
import ConsultationForm from "@/features/contact/components/ConsultationForm";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
      <section
        id="hero"
        className="relative min-h-[85vh] flex items-center py-16 sm:py-20 md:py-0"
        aria-label="Hero introduction"
      >
        <div className="w-full flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-20 gap-10">
          <div className="order-2 md:order-1 md:w-[60%] text-center md:text-left animate-fade-in-up">
            <p className="font-mono text-cyan-400 text-xs uppercase tracking-[0.2em] mb-4 sm:mb-5">
              Manish Yadav
            </p>

            <h1
              id="hero-heading"
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight leading-[1.12] mb-5 sm:mb-6"
            >
              Full-Stack MERN Developer &
              <span className="text-cyan-400"> AI Automation</span> Builder
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed mb-8 sm:mb-10">
              I build functional web applications and integrate Generative AI workflows. Focused on clean architecture, reliable deployments, and solving problems using React, Node.js, and agentic tools like n8n.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 sm:gap-4">
              <a
                href="#case-studies"
                id="hero-cta-projects"
                className="w-full sm:w-auto px-7 py-3 rounded-md bg-cyan-400 text-[#0B0C10] text-sm font-semibold hover:bg-cyan-300 transition-colors duration-200 text-center"
              >
                View Case Studies
              </a>
              <button
                type="button"
                id="hero-cta-contact"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-md border border-cyan-400/40 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition-all duration-200"
              >
                Book a Consultation
              </button>
            </div>
          </div>
          <div className="order-1 md:order-2 md:w-[40%] flex justify-center md:justify-end animate-fade-in-up [animation-delay:200ms]">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[22rem] xl:h-[22rem]">
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
                src={profileImg}
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
