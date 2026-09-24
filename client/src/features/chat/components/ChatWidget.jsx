/**
 * @file components/ui/ChatWidget.jsx
 * @description Floating RAG AI copilot widget — Refined UI/UX Shell.
 *
 * SPEC RULES:
 *   - Modular structure: ChatWidget (container), ChatHeader, ChatArea, ChatInput
 *   - Card: w-[400px] h-[550px] on desktop, w-[95%] h-[80vh] on mobile. bg-[#0F0F11].
 *   - Header: Green pulsing dot (Online), Refresh icon for new chat.
 *   - Empty state: Grid of suggested prompts with emojis.
 */

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import useChatStore from "@/store/chatStore";
import { cn } from "@/lib/utils";
import ChatHeader from "@/features/chat/components/ChatHeader";
import ChatArea from "@/features/chat/components/ChatArea";
import ChatInput from "@/features/chat/components/ChatInput";



const ChatWidget = () => {
    const { isOpen, toggleChat, messages, isLoading, sendMessage, clearChat } = useChatStore();
    const bottomRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading, isOpen]);

    const handleSend = (text) => {
        sendMessage(text);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "pointer-events-auto origin-bottom-right flex flex-col",
                            "absolute bottom-16 right-0 sm:bottom-20",
                            "w-[92vw] sm:w-[400px] right-[-8px] sm:right-0",
                            "h-[75vh] sm:h-[550px]",
                            "bg-[#0F0F11]/95 backdrop-blur-xl",
                            "border border-slate-800 rounded-2xl overflow-hidden",
                            "shadow-[0_0_40px_rgba(34,211,238,0.1)] drop-shadow-2xl"
                        )}
                    >
                        <ChatHeader
                            onClose={toggleChat}
                            onReset={clearChat}
                            hasMessages={messages.length > 0}
                        />
                        <ChatArea
                            messages={messages}
                            isLoading={isLoading}
                            onSuggestionClick={handleSend}
                            bottomRef={bottomRef}
                        />
                        <ChatInput
                            onSend={handleSend}
                            isLoading={isLoading}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggleChat}
                className={cn(
                    "pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                    isOpen
                        ? "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700"
                        : "bg-cyan-500 text-[#0F0F11] hover:bg-cyan-400 hover:scale-105 shadow-cyan-500/20"
                )}
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                            <X size={20} />
                        </motion.span>
                    ) : (
                        <motion.span key="open" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.15 }}>
                            <Sparkles size={22} fill="currentColor" className="opacity-90" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
}

export default ChatWidget;