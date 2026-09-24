import { RefreshCcw, X } from "lucide-react";

const ChatHeader = ({ onClose, onReset, hasMessages }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#0F0F11]">
      <div className="flex items-center gap-3">
        {/* Online Status Indicator */}
        <div className="relative flex items-center justify-center w-3 h-3">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-green-500 animate-ping"></span>
          <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500"></span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white leading-none">Portfolio AI</h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-none">Online and ready</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {hasMessages && (
          <button
            onClick={onReset}
            className="p-1.5 rounded-md text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
            aria-label="New Chat"
            title="New Chat"
          >
            <RefreshCcw size={16} />
          </button>
        )}
        <button
          onClick={onClose}
          className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          aria-label="Close Chat"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader

