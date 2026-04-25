"use client";

import { useEffect } from "react";
import { useGlobalStore } from "../../src/store/useGlobalStore";
import B2BDashboardView from "../../src/features/dashboard/B2BDashboardView";

/**
 * /strategy route — activates the Horizon Strategy view within the B2B dashboard shell.
 */
export default function StrategyPage() {
  const setCurrentView = useGlobalStore((state) => state.setCurrentView);
  const setSegmentMode = useGlobalStore((state) => state.setSegmentMode);

  useEffect(() => {
    setSegmentMode("b2b");
    setCurrentView("horizon_strategy");
  }, [setCurrentView, setSegmentMode]);

  return <B2BDashboardView />;
}
