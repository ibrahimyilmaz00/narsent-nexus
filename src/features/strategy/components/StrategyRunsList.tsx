import React from 'react';
import { BarChart3, Calendar, ChevronRight, Activity } from 'lucide-react';
import { useDashboardData } from '../../demo/useDashboardData';

interface Props {
  onSelectReport: (id: string) => void;
}

const formatTL = (n: number) => `${Math.round(n).toLocaleString("tr-TR")} TL`;

export const StrategyRunsList = ({ onSelectReport }: Props) => {
  const pipelineRuns = useDashboardData().strategy.runs;

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 sm:p-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800/50 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight flex items-center gap-3 mb-2">
            <BarChart3 className="text-blue-500" size={28} />
            Strateji Motoru (Pipeline) Arşivi
          </h1>
          <p className="text-zinc-400 text-sm">AI tarafından oluşturulan dönemsel portföy optimizasyon raporları.</p>
        </div>
      </div>
      <div className="space-y-4">
        {pipelineRuns.map((run, index) => (
          <div
            key={run.id}
            onClick={() => index === 0 && onSelectReport(run.id)}
            className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${index === 0 ? (run.isLatest ? 'bg-blue-900/10 border-blue-500/30 hover:bg-blue-900/20 cursor-pointer hover:scale-[1.01]' : 'bg-zinc-900/30 border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-700 cursor-pointer hover:scale-[1.01]') : 'opacity-50 blur-[3px] pointer-events-none select-none bg-zinc-900/30 border-zinc-800'}`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${run.status === 'GREEN' ? 'bg-emerald-500/20 text-emerald-400' : run.status === 'YELLOW' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}><Activity size={20} /></div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-bold text-zinc-200">{run.date} Koşusu</h3>
                  {run.isLatest && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase rounded-md tracking-wider">En Güncel</span>}
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar size={12}/> Pipeline: {run.id}</span><span>•</span><span>Risk Skoru: <strong className="text-zinc-300">{run.portfolioRisk.toFixed(3)}</strong></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="hidden md:block text-right"><div className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">Açık Pozisyon</div><div className="text-sm font-bold text-zinc-300">{formatTL(run.totalExposure)}</div></div>
              <div className="hidden lg:block text-right"><div className="text-xs text-zinc-500 font-medium mb-1 uppercase tracking-wider">İşlem Gören Hesap</div><div className="text-sm font-bold text-zinc-300">{run.accountsFlagged} Firma</div></div>
              <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors"><ChevronRight size={16} className="text-zinc-400 group-hover:text-white" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
