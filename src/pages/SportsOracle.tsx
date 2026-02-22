import { Activity, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function SportsOracle() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-mono font-bold neon-text-cyan mb-2 flex items-center gap-3">
          <Activity className="w-8 h-8" /> SPORTS_ORACLE
        </h1>
        <p className="text-gray-400 font-mono text-sm">PREDICTIVE ANALYTICS & LIVE SCORES</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h2 className="font-mono text-sm text-cyber-cyan mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> TOP_PREDICTIONS
          </h2>
          <div className="space-y-4">
            {[
              { match: 'LIV vs MCI', prediction: 'LIVERPOOL WIN', confidence: 68, odds: '2.10' },
              { match: 'LAL vs GSW', prediction: 'OVER 220.5', confidence: 74, odds: '1.95' },
              { match: 'NYY vs BOS', prediction: 'YANKEES WIN', confidence: 55, odds: '1.80' },
            ].map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <div className="font-mono text-sm font-bold">{p.match}</div>
                  <div className="text-[10px] text-cyber-cyan font-mono">{p.prediction}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-emerald-400">{p.confidence}%</div>
                  <div className="text-[10px] text-gray-500 font-mono">ODDS: {p.odds}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="font-mono text-sm text-cyber-magenta mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> VIRTUAL_BETTING_HUB
          </h2>
          <div className="p-4 rounded-xl bg-cyber-magenta/5 border border-cyber-magenta/20 mb-4">
            <div className="text-[10px] text-gray-400 font-mono mb-1">WALLET_BALANCE</div>
            <div className="text-2xl font-mono font-bold text-cyber-magenta">4,250 Q-COINS</div>
          </div>
          <div className="space-y-2">
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-sm hover:bg-white/10 transition-all text-left px-4 flex justify-between items-center">
              <span>PLACE_NEW_WAGER</span>
              <TrendingUp className="w-4 h-4 text-cyber-magenta" />
            </button>
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-sm hover:bg-white/10 transition-all text-left px-4 flex justify-between items-center">
              <span>VIEW_BETTING_HISTORY</span>
              <TrendingDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
