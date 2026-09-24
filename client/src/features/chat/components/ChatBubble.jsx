/**
 * @file features/chat/components/ChatBubble.jsx
 * @description Single chat message bubble.
 *
 * User: Right-aligned, solid background (bg-slate-800).
 * AI: Left-aligned, transparent or very subtle background.
 */

import { cn } from "@/lib/utils";

export default function ChatBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-slate-800 text-white rounded-2xl rounded-br-sm font-medium"
            : "bg-transparent text-slate-200"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>

      </div>
    </div>
  );
}
