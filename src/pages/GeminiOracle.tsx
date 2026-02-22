import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { useNotify } from '../context/NotificationContext';

export function GeminiOracle() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { notify } = useNotify();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', content: userMsg }].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are the Gemini Oracle, a high-level AI intelligence within the Quorom-V600 command center. Your tone is professional, slightly futuristic, and highly efficient. Use markdown for formatting.",
        }
      });

      const aiText = response.text || "I am unable to process that request at this time.";
      setMessages(prev => [...prev, { role: 'model', content: aiText }]);
    } catch (error) {
      console.error("Oracle Error:", error);
      notify("NEURAL_LINK_FAILURE: Unable to reach Gemini Oracle", "ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8" /> GEMINI_ORACLE
        </h1>
        <p className="text-gray-400 font-mono text-sm">ADVANCED REASONING & NEURAL SYNTHESIS</p>
      </header>

      <div className="flex-1 glass-panel flex flex-col overflow-hidden border-2 border-cyber-cyan/20">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Bot className="w-16 h-16 text-cyber-cyan" />
              <p className="font-mono text-sm max-w-xs">ORACLE_IDLE: Awaiting neural input...</p>
            </div>
          )}
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-cyber-cyan/20 border border-cyber-cyan/50' : 'bg-cyber-magenta/20 border border-cyber-magenta/50'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-cyber-cyan" /> : <Bot className="w-4 h-4 text-cyber-magenta" />}
                </div>
                <div className={`max-w-[85%] p-4 rounded-2xl font-mono text-sm prose prose-invert ${msg.role === 'user' ? 'bg-white/5 border border-white/10' : 'bg-cyber-cyan/5 border border-cyber-cyan/10'}`}>
                  <Markdown>{msg.content}</Markdown>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-cyber-magenta/20 border border-cyber-magenta/50 flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4 text-cyber-magenta" />
              </div>
              <div className="flex items-center gap-2 text-cyber-magenta font-mono text-xs">
                <Loader2 className="w-4 h-4 animate-spin" /> THINKING...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-black/40">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query the Oracle..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white font-mono text-sm outline-none focus:border-cyber-cyan transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-cyber-cyan/20 hover:bg-cyber-cyan/30 disabled:opacity-50 text-cyber-cyan border border-cyber-cyan/50 rounded-xl px-6 py-3 flex items-center justify-center transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
