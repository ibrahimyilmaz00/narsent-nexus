import React from 'react';
import { Calendar, TrendingUp, CheckCircle2, Zap, ArrowUpRight, BarChart3, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { performanceStats } from '../data/mockData';

export const PerformanceDashboard = () => {
  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col space-y-6 animate-in fade-in duration-500 text-left">
      
      {/* HEADER & DATE PICKER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 tracking-tight">Stratejik Etki ve Dönüşüm</h1>
          <p className="text-sm text-zinc-400 mt-1">Horizon Karar Motoru tarafından dağıtılan iş emirlerinin finansal performansı.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 p-2.5 rounded-xl shrink-0">
          <Calendar size={16} className="text-zinc-400" />
          <select className="bg-transparent text-sm font-bold text-zinc-300 outline-none cursor-pointer">
            <option>Son 30 Gün</option>
            <option>Bu Çeyrek</option>
            <option>Tüm Zamanlar</option>
          </select>
        </div>
      </div>

      {/* TEPEDEKİ ANA METRİKLER (KPI CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Kasa Etkisi */}
        <div className="bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-emerald-500"><TrendingUp size={100} /></div>
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className="p-2 bg-emerald-500/20 rounded-lg"><TrendingUp size={16} className="text-emerald-400" /></div>
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Kümülatif Kurtarım</h3>
          </div>
          <div className="text-3xl font-black text-emerald-400 relative z-10">28.4M <span className="text-lg font-medium text-emerald-500/50">TL</span></div>
          <div className="text-xs text-emerald-400/80 font-medium mt-2 flex items-center gap-1 relative z-10">
            <ArrowUpRight size={14} /> Hedefin %43'ü tamamlandı
          </div>
        </div>

        {/* İşlenen İş Emirleri */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5"><Zap size={100} /></div>
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className="p-2 bg-blue-500/10 rounded-lg"><Zap size={16} className="text-blue-400" /></div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Dağıtılan İş Emri</h3>
          </div>
          <div className="text-3xl font-black text-zinc-100 relative z-10">142 <span className="text-lg font-medium text-zinc-500">Adet</span></div>
          <div className="text-xs text-blue-400 font-medium mt-2 relative z-10">
            Son 7 günde 24 yeni aksiyon
          </div>
        </div>

        {/* Başarı / Kapanma Oranı */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5"><CheckCircle2 size={100} /></div>
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className="p-2 bg-indigo-500/10 rounded-lg"><CheckCircle2 size={16} className="text-indigo-400" /></div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Görev Kapanma Oranı</h3>
          </div>
          <div className="text-3xl font-black text-zinc-100 relative z-10">%68.5</div>
          <div className="text-xs text-zinc-500 font-medium mt-2 relative z-10 flex items-center gap-2">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[68.5%]"></div>
            </div>
          </div>
        </div>

        {/* Önlenen Zarar (Inaction Cost Saved) */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className="p-2 bg-amber-500/10 rounded-lg"><BarChart3 size={16} className="text-amber-400" /></div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Önlenen Kanama</h3>
          </div>
          <div className="text-3xl font-black text-zinc-100 relative z-10">1.2M <span className="text-lg font-medium text-zinc-500">TL</span></div>
          <div className="text-xs text-amber-400 font-medium mt-2 relative z-10">
            Haftalık inaksiyon maliyeti düşüşü
          </div>
        </div>
      </div>

      {/* ANA GRAFİK ALANI: AI ETKİSİ */}
      {/* DEĞİŞİKLİK 1: flex-1 kaldırıldı, mb-6 eklendi */}
      <div className="w-full bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
              <Activity size={20} className="text-blue-500" /> Stratejik Dönüşüm Eğrisi
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Horizon Karar Motoru'nun önerdiği aksiyonlarla hedeflenen (tahminlenen) nakit akışı ivmesi.</p>
          </div>
        </div>
        
        {/* DEĞİŞİKLİK 2: w-full h-[350px] olarak kesin yükseklik verildi */}
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={performanceStats.roiChart}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorHorizon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#71717a" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}M`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
              <Area 
                name="Horizon (AI Destekli)"
                type="monotone" 
                dataKey="horizon" 
                stroke="#3b82f6" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorHorizon)" 
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
              <Area 
                name="Standart Tahsilat"
                type="monotone" 
                dataKey="standard" 
                stroke="#3f3f46" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ALT PANELLER: STRATEJİ VE TAKVİM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* SOL: AI STRATEJİ DAĞILIMI (DONUT) */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col h-[400px]">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">AI Strateji Dağılımı</h3>
            <p className="text-xs text-zinc-500 mt-1">İş emirlerinin yöntem bazlı ağırlık analizi.</p>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceStats.strategyDistribution}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {performanceStats.strategyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-zinc-100">142</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Toplam Görev</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {performanceStats.strategyDistribution.map((item) => (
              <div key={item.name} className="text-center">
                <div className="text-[10px] font-bold text-zinc-500 mb-1 truncate px-1">{item.name}</div>
                <div className="text-sm font-black" style={{ color: item.color }}>%{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ: BEKLENEN NAKİT AKIŞI TAKVİMİ */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col h-[400px]">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">Beklenen Nakit Akışı Takvimi</h3>
            <p className="text-xs text-zinc-500 mt-1">Tahminlenen kurtarımın zamana göre likidite projeksiyonu.</p>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-8">
            {performanceStats.cashFlowTimeline.map((item) => (
              <div key={item.range} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-zinc-400">{item.range}</span>
                  <span className="text-sm font-black text-zinc-100">{item.amount} TL</span>
                </div>
                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/30">
                  <div 
                    className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-1000`} 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Toplam Projeksiyon</div>
            <div className="text-lg font-black text-emerald-400">28.4M TL</div>
          </div>
        </div>

      </div>

    </div>
  );
};
