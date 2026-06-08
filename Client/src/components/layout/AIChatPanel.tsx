import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Sparkles, Loader2, Minimize2 } from "lucide-react";
import { aiService } from "../../services/aiService";
import toast from "react-hot-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm InternPulse AI. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      // Format history for the API
      const history = messages.map((m) => ({
        role: m.role as any,
        content: m.content,
      }));

      const res = await aiService.chat(userMsg, history);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "AI failed to respond");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-4 bottom-4 md:top-20 md:bottom-8 z-50 w-[calc(100%-32px)] md:w-[400px] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b"
              style={{
                borderColor: "var(--border-color)",
                background: "linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-hover-rgb), 0.05))",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, var(--primary), var(--primary-hover))",
                    boxShadow: "0 4px 12px rgba(var(--primary-rgb), 0.3)",
                  }}
                >
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                    AI Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: "var(--text-muted)", background: "var(--bg-surface-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
              style={{ background: "var(--bg-base)" }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    msg.role === "assistant"
                      ? "bg-primary/10 text-primary-strong"
                      : "bg-slate-500/10 text-slate-500"
                  }`}
                  style={{
                    backgroundColor: msg.role === "assistant" ? "rgba(var(--primary-rgb), 0.1)" : undefined,
                    color: msg.role === "assistant" ? "var(--primary)" : undefined
                  }}
                  >
                    {msg.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "rounded-tl-none"
                        : "rounded-tr-none"
                    }`}
                    style={{
                      background: msg.role === "assistant" ? "var(--bg-surface-2)" : "var(--primary)",
                      color: msg.role === "assistant" ? "var(--text-primary)" : "#fff",
                      border: msg.role === "assistant" ? "1px solid var(--border-color)" : "none",
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div 
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(var(--primary-rgb), 0.1)", color: "var(--primary)" }}
                  >
                    <Bot size={16} />
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2"
                    style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border-color)" }}
                  >
                    <Loader2 size={16} className="animate-spin" style={{ color: "var(--primary)" }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      AI is thinking...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="p-4 border-t"
              style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}
            >
              <div
                className="relative flex items-center rounded-2xl transition-all duration-200"
                style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border-color)" }}
              >
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything..."
                  className="w-full bg-transparent p-4 pr-12 text-sm focus:outline-none resize-none max-h-32"
                  style={{ color: "var(--text-primary)" }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2.5 rounded-xl transition-all duration-200 disabled:opacity-50"
                  style={{
                    background: input.trim() ? "var(--primary)" : "transparent",
                    color: input.trim() ? "#fff" : "var(--text-muted)",
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-center mt-3" style={{ color: "var(--text-muted)" }}>
                AI responses can be inaccurate. Powered by Groq Llama 3.3.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
