import { CalendarCheck, FolderClock, Layers, Sparkles, UserCheck, Workflow } from "lucide-react";

import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";


const SUGGESTED_PROMPTS = [
  { icon: <Layers  />, text: "Tech Stack", className: "text-green-400 bg-green-950/20 border-green-900/50" },
  { icon: <FolderClock />, text: "Recent Projects", className: "text-blue-400 bg-blue-950/20 border-blue-900/50" },
  { icon: <CalendarCheck />, text: "Availability", className: "text-purple-400 bg-purple-950/20 border-purple-900/50" },
  { icon: <Workflow  />, text: "AI Workflows", className: "text-cyan-400 bg-cyan-950/20 border-cyan-900/50" },
];



const ChatArea = ({ messages, isLoading, onSuggestionClick, bottomRef }) => {
  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth">
      {isEmpty && (
        <div className="flex-1 flex flex-col justify-center gap-6 animate-in fade-in duration-500">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-950/30 border border-cyan-900/50 flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-cyan-400" />
            </div>
            <h4 className="text-white font-medium">How can I help?</h4>
            <p className="text-xs text-slate-400">
              I'm an AI assistant trained on Manish's portfolio, skills, and experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt.text}
                onClick={() => onSuggestionClick(prompt.text)}
                className="flex items-center gap-2 p-3 rounded-lg border border-slate-800 bg-slate-800/20 hover:bg-slate-800/60 hover:border-slate-700 transition-all text-left group"
              >
                <span className={`${prompt.className} text-lg`}>{prompt.icon}</span>
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((msg) => (
        <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} className="h-1" />
    </div>
  );
}



export default ChatArea