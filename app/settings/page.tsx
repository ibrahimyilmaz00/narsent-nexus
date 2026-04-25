"use client";

import { useEffect } from "react";
import { useGlobalStore } from "../../src/store/useGlobalStore";
import B2BDashboardView from "../../src/features/dashboard/B2BDashboardView";

/**
 * /settings route — automatically activates the Settings view
 * within the B2B dashboard shell.
 */
export default function SettingsPage() {
  const setCurrentView = useGlobalStore((state) => state.setCurrentView);
  const setSegmentMode = useGlobalStore((state) => state.setSegmentMode);

  useEffect(() => {
    setSegmentMode("b2b");
    setCurrentView("settings");
  }, [setCurrentView, setSegmentMode]);

  return <B2BDashboardView />;
}
