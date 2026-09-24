import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { submitContactForm } from '../api/contact.api';
/**
 * Isolated, controlled React component for the Consultation form.
 * Handles its own local state, basic validation, and mock submission.
 * Designed to be passed into a Modal or used as a standalone form.
 *
 * @param {function} [onSuccess] - Callback fired upon successful mock submission
 * @param {string} [className] - Optional additional classes for the form container
 */
export default function ConsultationForm({ onSuccess, className }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    await submitContactForm(formData);

    setIsSubmitting(false);
    setIsSuccess(true);

    if (onSuccess) {
      onSuccess();
    }
  };

  if (isSuccess) {
    return (
      <div className={cn("py-8 text-center", className)}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 mb-4">
          <Send className="w-6 h-6 text-cyan-400" />
        </div>
        <h4 className="text-lg font-semibold text-white mb-2">Message Sent</h4>
        <p className="text-sm text-slate-400">
          Thanks for reaching out! I'll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("flex flex-col gap-4", className)}
      noValidate={false} // Use HTML5 validation
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-xs font-medium text-slate-300">
          Name <span className="text-cyan-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          disabled={isSubmitting}
          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-medium text-slate-300">
          Email <span className="text-cyan-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          disabled={isSubmitting}
          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-slate-300">
          Message <span className="text-cyan-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          disabled={isSubmitting}
          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50 scrollbar-thin"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-[#0F0F11] font-semibold rounded-lg text-sm transition-all disabled:opacity-50 disabled:hover:bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0F0F11]"
      >
        {isSubmitting ? "Sending..." : "Submit Request"}
      </button>
    </form>
  );
}
