import { useState, useEffect } from 'react';
import { Database, Search, Plus, Tag, Clock } from 'lucide-react';

export function NeuralLibrary() {
  const [items, setItems] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetch('/api/neural-library')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleAdd = async () => {
    if (!newTitle || !newContent) return;
    const res = await fetch('/api/neural-library', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent, type: 'INTEL' })
    });
    if (res.ok) {
      const newItem = await res.json();
      setItems([{ id: newItem.id, title: newTitle, content: newContent, type: 'INTEL', timestamp: new Date().toISOString() }, ...items]);
      setNewTitle('');
      setNewContent('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-mono font-bold neon-text-purple mb-2 flex items-center gap-3">
            <Database className="w-8 h-8" /> NEURAL_LIBRARY
          </h1>
          <p className="text-gray-400 font-mono text-sm">ARCHIVED INTEL & KNOWLEDGE NODES</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/50 p-3 rounded-full hover:bg-cyber-purple/30 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {isAdding && (
        <div className="glass-panel p-6 space-y-4 border-cyber-purple">
          <input 
            type="text" 
            placeholder="Node Title" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-mono outline-none focus:border-cyber-purple"
          />
          <textarea 
            placeholder="Node Content" 
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-mono outline-none focus:border-cyber-purple min-h-[100px]"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 font-mono text-sm text-gray-500">CANCEL</button>
            <button onClick={handleAdd} className="px-4 py-2 bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/50 rounded-xl font-mono text-sm">ARCHIVE_NODE</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="glass-panel p-5 hover:neon-border-cyan transition-all group">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-mono font-bold text-lg group-hover:text-cyber-purple transition-colors">{item.title}</h3>
              <div className="px-2 py-1 rounded bg-cyber-purple/10 text-cyber-purple text-[10px] font-mono border border-cyber-purple/20">
                {item.type}
              </div>
            </div>
            <p className="text-sm text-gray-400 font-mono line-clamp-3 mb-4">{item.content}</p>
            <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(item.timestamp).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> NODE_{item.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
