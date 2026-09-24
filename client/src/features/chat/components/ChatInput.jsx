import { Send } from "lucide-react";
import { useState } from "react";
const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 border-t border-slate-800 bg-[#0F0F11]/95">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-end bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isLoading}
          rows={1}
          className="w-full max-h-32 bg-transparent text-sm text-white placeholder:text-slate-500 resize-none py-3 pl-4 pr-12 focus:outline-none disabled:opacity-50 scrollbar-thin"
          style={{ minHeight: "44px" }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 bottom-2 p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
      <div className="text-center mt-2">
        <span className="text-[10px] text-slate-500 font-mono">Press Enter to send</span>
      </div>
    </div>
  );
}


export default ChatInput

