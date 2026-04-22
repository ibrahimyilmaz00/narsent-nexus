import React, { useState } from 'react';
import { StrategyRunsList } from './components/StrategyRunsList';
import { StrategyDashboardDetail } from './components/StrategyDashboardDetail';

export const HorizonStrategyView = () => {
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  if (activeReportId) {
    return <StrategyDashboardDetail reportId={activeReportId} onBack={() => setActiveReportId(null)} />;
  }

  return <StrategyRunsList onSelectReport={setActiveReportId} />;
};
