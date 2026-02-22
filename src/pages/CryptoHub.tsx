import { Zap, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export function CryptoHub() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-mono font-bold neon-text-purple mb-2 flex items-center gap-3">
            <Zap className="w-8 h-8" /> CRYPTO_HUB
          </h1>
          <p className="text-gray-400 font-mono text-sm">MARKET ORACLE & ASSET TRACKER</p>
        </div>
        <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-cyber-purple">
          <RefreshCw className="w-5 h-5" />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'BITCOIN', symbol: 'BTC', price: '94,250.00', change: '+2.4%', up: true },
          { name: 'ETHEREUM', symbol: 'ETH', price: '2,840.12', change: '-1.2%', up: false },
          { name: 'SOLANA', symbol: 'SOL', price: '142.50', change: '+8.7%', up: true },
        ].map((coin, i) => (
          <div key={i} className="glass-panel p-5 hover:neon-border-cyan transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-mono font-bold text-lg">{coin.name}</div>
                <div className="text-[10px] text-gray-500 font-mono">{coin.symbol}</div>
              </div>
              <div className={`flex items-center gap-1 font-mono text-xs ${coin.up ? 'text-emerald-400' : 'text-rose-500'}`}>
                {coin.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {coin.change}
              </div>
            </div>
            <div className="text-2xl font-mono font-bold">${coin.price}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6">
        <h2 className="font-mono text-sm text-cyber-purple mb-6">PORTFOLIO_DISTRIBUTION</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden flex">
            <div className="bg-amber-400 h-full w-[60%]" />
            <div className="bg-indigo-400 h-full w-[25%]" />
            <div className="bg-cyber-purple h-full w-[15%]" />
          </div>
        </div>
        <div className="flex gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2 text-[10px] font-mono"><div className="w-2 h-2 rounded-full bg-amber-400" /> BTC 60%</div>
          <div className="flex items-center gap-2 text-[10px] font-mono"><div className="w-2 h-2 rounded-full bg-indigo-400" /> ETH 25%</div>
          <div className="flex items-center gap-2 text-[10px] font-mono"><div className="w-2 h-2 rounded-full bg-cyber-purple" /> SOL 15%</div>
        </div>
      </div>
    </div>
  );
}
