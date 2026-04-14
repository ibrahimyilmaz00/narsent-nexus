"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { useGlobalStore } from "../../../../store/useGlobalStore";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from 'recharts';

/* ═══════════════════════════════════════════════════════════
   MOCK DATAS FOR CHARTS
   ═══════════════════════════════════════════════════════════ */
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const mockPieData = [
  { name: '0-7 Gün', value: 15 },
  { name: '31-60 Gün', value: 45 },
  { name: '60+ Gün', value: 20 },
  { name: 'Diğer', value: 20 },
];

const mockBarData = [
  { name: 'Risksiz', score: 80 },
  { name: 'Orta Risk', score: 40 },
  { name: 'Yüksek', score: 10 },
];

const mockLineData = [
  { name: '1. Hf', value: 1200000 },
  { name: '2. Hf', value: 1800000 },
  { name: '3. Hf', value: 1500000 },
  { name: '4. Hf', value: 2400000 },
  { name: '5. Hf', value: 2100000 },
  { name: '6. Hf', value: 2900000 },
];

const mockRadarData = [
  { axis: 'Tekstil', value: 120, fullMark: 150 },
  { axis: 'İnşaat', value: 98, fullMark: 150 },
  { axis: 'Enerji', value: 45, fullMark: 150 },
  { axis: 'Perakende', value: 110, fullMark: 150 },
  { axis: 'Otomotiv', value: 85, fullMark: 150 },
  { axis: 'Bilişim', value: 65, fullMark: 150 },
];

const mockAreaData = [
  { name: '1. Hf', pessimistic: 800000, expected: 1200000, optimistic: 1600000 },
  { name: '2. Hf', pessimistic: 1100000, expected: 1800000, optimistic: 2400000 },
  { name: '3. Hf', pessimistic: 900000, expected: 1500000, optimistic: 2100000 },
  { name: '4. Hf', pessimistic: 1700000, expected: 2400000, optimistic: 3000000 },
  { name: '5. Hf', pessimistic: 1400000, expected: 2100000, optimistic: 2700000 },
  { name: '6. Hf', pessimistic: 2100000, expected: 2900000, optimistic: 3600000 },
];

export default function WidgetGrid() {
  const setWidgetModalOpen = useGlobalStore((state) => state.setWidgetModalOpen);
  const activeWidgets = useGlobalStore((state) => state.activeWidgets);
  const removeWidget = useGlobalStore((state) => state.removeWidget);

  return (
    <div className="w-full flex flex-col">
      {activeWidgets.length === 0 ? (
        // BOŞ DURUM - SADECE PLACEHOLDER
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => setWidgetModalOpen(true)}
            className="min-h-[300px] border-2 border-dashed border-zinc-800/60 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/20 transition-all group"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-800/50 group-hover:bg-blue-600/20 mb-4 transition-colors">
              <Plus size={32} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
            </div>
            <span className="text-sm font-semibold text-zinc-500 group-hover:text-blue-400 transition-colors">
              Yeni Widget Ekle
            </span>
          </div>
        </div>
      ) : (
        // WIDGETLAR EKLENDİĞİNDEKİ GRID
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Aktif Widget'ları Çiz */}
          {activeWidgets.map((widget) => (
            <div key={widget.id} className="bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-3xl min-h-[300px] flex flex-col shadow-sm relative group hover:border-zinc-700 transition-colors">
              
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">{widget.module.replace('module', 'Modül ')}</h4>
                  <h3 className="text-sm font-bold text-zinc-100">{widget.title}</h3>
                </div>
                <button 
                  onClick={() => removeWidget(widget.id)}
                  className="p-1.5 rounded-lg bg-zinc-800/50 text-zinc-500 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Chart Area */}
              <div className="flex-1 w-full flex items-center justify-center">
                
                {widget.chartType === 'Pie Chart' && (
                  <div className="w-full h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {mockPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#e4e4e7', fontSize: '12px', fontWeight: 600 }}
                          itemStyle={{ color: '#e4e4e7' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {widget.chartType === 'Bar Chart' && (
                  <div className="w-full h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockBarData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 11 }} dy={10} />
                        <Tooltip 
                          cursor={{ fill: '#27272a', opacity: 0.4 }}
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#e4e4e7', fontSize: '12px' }}
                        />
                        <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                           {mockBarData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[Math.abs(COLORS.length - 1 - index)]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {widget.chartType === 'Line Chart' && (
                  /* KESİN ÇÖZÜM: flex-1 yerine kesin h-[250px] yüksekliği verdik */
                  <div className="w-full h-[250px] mt-4 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockLineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000000}M`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#e4e4e7' }}
                          itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                          formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M TL`, 'Tahmin']}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={4}
                          dot={{ r: 4, fill: '#18181b', stroke: '#3b82f6', strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: '#3b82f6', stroke: '#18181b' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {widget.chartType === 'KPI Card' && (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white tracking-tighter">18.6M</span>
                    <span className="text-sm font-medium text-emerald-400 mt-1 flex items-center gap-1">+2.4% Artış</span>
                  </div>
                )}

                {widget.chartType === 'Radar Chart' && (
                  <div className="w-full h-[250px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={mockRadarData}>
                        <PolarGrid stroke="#3f3f46" strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="axis" tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 500 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px', color: '#f4f4f5' }}
                          itemStyle={{ color: '#a855f7', fontWeight: 'bold' }}
                          formatter={(val) => [`${val}`, 'Skor']}
                        />
                        <Radar
                          name="Portföy"
                          dataKey="value"
                          stroke="#a855f7"
                          strokeWidth={2}
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                          activeDot={{ r: 4, fill: '#c084fc', stroke: '#fff', strokeWidth: 1 }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {widget.chartType === 'Area Chart' && (
                  <div className="w-full h-[250px] mt-4 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockAreaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="areaOptimistic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="areaExpected" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="areaPessimistic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000000}M`} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#e4e4e7', fontSize: '12px' }}
                          formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M TL`, '']}
                        />
                        <Area type="monotone" dataKey="optimistic" stroke="#10b981" strokeWidth={2} fill="url(#areaOptimistic)" />
                        <Area type="monotone" dataKey="expected" stroke="#3b82f6" strokeWidth={2} fill="url(#areaExpected)" />
                        <Area type="monotone" dataKey="pessimistic" stroke="#ef4444" strokeWidth={2} fill="url(#areaPessimistic)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

              </div>
            </div>
          ))}

          {/* Sona Eklenen - Yeni Ekle Placeholder */}
          <div 
            onClick={() => setWidgetModalOpen(true)}
            className="bg-zinc-900/10 border-2 border-dashed border-zinc-800/60 p-5 rounded-3xl min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/20 transition-all group"
          >
             <div className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800/50 group-hover:bg-blue-600/20 mb-3 transition-colors">
              <Plus size={24} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
            </div>
            <span className="text-sm font-semibold text-zinc-500 group-hover:text-blue-400 transition-colors">
              Yeni Ekle
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
