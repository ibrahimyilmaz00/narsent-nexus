"use client";

import { useEffect } from "react";
import { useGlobalStore } from "../../src/store/useGlobalStore";
import B2BDashboardView from "../../src/features/dashboard/B2BDashboardView";

/**
 * /performance route — activates the Performance Dashboard within the B2B dashboard shell.
 */
export default function PerformancePage() {
  const setCurrentView = useGlobalStore((state) => state.setCurrentView);
  const setSegmentMode = useGlobalStore((state) => state.setSegmentMode);

  useEffect(() => {
    setSegmentMode("b2b");
    setCurrentView("performance");
  }, [setCurrentView, setSegmentMode]);

  return <B2BDashboardView />;
}
