/**
 * @file features/chat/components/TypingIndicator.jsx
 * @description Three bouncing dots shown while the AI assistant is generating.
 * Modern, subtle 3-dot pulse animation aligned to the left.
 */

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2 w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Assistant is typing</span>
    </div>
  );
}
