import { useState, useEffect, FormEvent } from 'react';
import { Send, Radio, AlertCircle } from 'lucide-react';
import { ref, onValue, push, serverTimestamp, query, limitToLast } from 'firebase/database';
import { db, isConfigured } from '../services/firebase';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isSystem: boolean;
  timestamp: number;
}

export function OperatorPresence() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!isConfigured || !db) {
      setMessages([
        { id: '1', sender: 'SYSTEM', text: 'Firebase not configured. Operating in offline mode.', time: '00:00', isSystem: true, timestamp: Date.now() }
      ]);
      return;
    }

    const messagesRef = ref(db, 'messages');
    const q = query(messagesRef, limitToLast(50));

    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          ...value,
          time: new Date(value.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messageList);
      } else {
        setMessages([
          { id: '1', sender: 'SYSTEM', text: 'Secure channel established. No previous logs found.', time: '10:00', isSystem: true, timestamp: Date.now() }
        ]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!isConfigured || !db) {
      // Local fallback for demo if not configured
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: 'YOU (OFFLINE)',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, newMsg]);
      setInput('');
      return;
    }
    
    const messagesRef = ref(db, 'messages');
    await push(messagesRef, {
      sender: 'OPERATOR_' + Math.floor(Math.random() * 1000),
      text: input,
      timestamp: serverTimestamp(),
      isSystem: false
    });
    
    setInput('');
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-4rem)]">
      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2 flex items-center gap-3">
          <Radio className="w-8 h-8" /> OPERATOR_PRESENCE
        </h1>
        <p className="text-gray-400 font-mono text-sm">SECURE SHOUTBOX / REAL-TIME COMMS</p>
        {!isConfigured && (
          <div className="mt-2 flex items-center gap-2 text-cyber-magenta text-xs font-mono bg-cyber-magenta/10 p-2 rounded-lg border border-cyber-magenta/20">
            <AlertCircle className="w-4 h-4" />
            OFFLINE_MODE: FIREBASE_CONFIG_MISSING
          </div>
        )}
      </header>

      <div className="flex-1 glass-panel flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender.startsWith('OPERATOR_') ? 'items-end' : 'items-start'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`font-mono text-xs ${msg.isSystem ? 'text-cyber-magenta' : msg.sender.startsWith('OPERATOR_') ? 'text-cyber-cyan' : 'text-cyber-purple'}`}>
                  {msg.sender}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">{msg.time}</span>
              </div>
              <div className={`px-4 py-2 rounded-xl max-w-[80%] font-mono text-sm ${
                msg.isSystem 
                  ? 'bg-cyber-magenta/10 border border-cyber-magenta/20 text-cyber-magenta' 
                  : msg.sender.startsWith('OPERATOR_')
                    ? 'bg-cyber-cyan/10 border border-cyber-cyan/20 text-white shadow-[0_0_10px_rgba(0,255,255,0.1)]'
                    : 'bg-white/5 border border-white/10 text-gray-300'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 bg-black/40">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Transmit message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm outline-none focus:border-cyber-cyan transition-colors"
            />
            <button 
              type="submit"
              className="bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50 rounded-xl px-4 py-2 flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
