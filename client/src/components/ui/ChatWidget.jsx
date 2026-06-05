/**
 * @file components/ui/ChatWidget.jsx
 * @description Floating RAG AI chatbot widget — globally available via MainLayout.
 *
 * SPEC RULES:
 *   - Fixed bottom-right — z-50 so it floats above all content
 *   - Toggle button opens/closes the panel (MessageCircle / X)
 *   - Messages mapped from Zustand messages[] — user right, assistant left
 *   - Typing indicator (3 animated dots) shown when isLoading = true
 *   - Input submits on Enter or click; disabled while isLoading
 *   - "Headless client" — NO AI calls here; delegates to sendMessage() in store
 */

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";
import useChatStore from "@/store/chatStore";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Typing indicator — 3 bouncing dots
// ---------------------------------------------------------------------------
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2.5 rounded-2xl rounded-bl-none bg-secondary border border-border w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Assistant is typing</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChatBubble — a single message
// ---------------------------------------------------------------------------
function ChatBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed",
          isUser
            ? "bg-primary text-obsidian rounded-br-none font-medium"
            : "bg-secondary text-foreground border border-border rounded-bl-none"
        )}
      >
        {content}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChatPanel — the expanded conversation window
// ---------------------------------------------------------------------------
function ChatPanel() {
  const { messages, isLoading, clearChat, sendMessage } = useChatStore();
  const [input, setInput]   = useState("");
  const bottomRef           = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-xl border border-border bg-obsidian shadow-2xl flex flex-col overflow-hidden"
      style={{ maxHeight: "min(520px, 70vh)" }}
      role="dialog"
      aria-label="AI Portfolio Assistant"
      aria-modal="false"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div>
          <p className="text-xs font-semibold text-foreground">Portfolio AI</p>
          <p className="text-[10px] text-primary font-mono">Powered by Gemini RAG</p>
        </div>
        <button
          type="button"
          onClick={clearChat}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          aria-label="Clear conversation"
          title="Clear chat"
        >
          <Trash2 size={13} aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3 scroll-smooth">
        {messages.length === 0 && (
          <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed px-4">
            Hi! Ask me anything about Manish's skills, projects, or availability.
          </p>
        )}
        {messages.map((msg) => (
          <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border flex gap-2 items-center bg-card">
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about skills, projects…"
          maxLength={500}
          disabled={isLoading}
          aria-label="Chat message input"
          className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 transition-colors"
        />
        <button
          id="chat-send"
          type="button"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
          className="shrink-0 w-8 h-8 rounded-lg bg-primary text-obsidian flex items-center justify-center hover:bg-primary/85 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Send size={13} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ChatWidget — exported floating container
// ---------------------------------------------------------------------------
export default function ChatWidget() {
  const { isOpen, toggleChat } = useChatStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" aria-label="Chat widget">
      <AnimatePresence>
        {isOpen && <ChatPanel key="panel" />}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        id="chat-toggle-btn"
        type="button"
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className={cn(
          "mt-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
          "bg-primary text-obsidian hover:bg-primary/85 hover:scale-105 active:scale-95"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={20} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={20} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
