"use client";

import { useEffect } from "react";
import { useGlobalStore } from "../../src/store/useGlobalStore";
import B2BDashboardView from "../../src/features/dashboard/B2BDashboardView";

/**
 * /actions route — activates the Actions view within the B2B dashboard shell.
 * Mirrors the pattern established by /settings/page.tsx.
 */
export default function ActionsPage() {
  const setCurrentView = useGlobalStore((state) => state.setCurrentView);
  const setSegmentMode = useGlobalStore((state) => state.setSegmentMode);

  useEffect(() => {
    setSegmentMode("b2b");
    setCurrentView("actions");
  }, [setCurrentView, setSegmentMode]);

  return <B2BDashboardView />;
}
