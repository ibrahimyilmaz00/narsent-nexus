"use client";

import { useEffect } from "react";
import { useGlobalStore } from "../../src/store/useGlobalStore";
import B2BDashboardView from "../../src/features/dashboard/B2BDashboardView";

/**
 * /kanban route — activates the Kanban Archive view within the B2B dashboard shell.
 */
export default function KanbanPage() {
  const setCurrentView = useGlobalStore((state) => state.setCurrentView);
  const setSegmentMode = useGlobalStore((state) => state.setSegmentMode);

  useEffect(() => {
    setSegmentMode("b2b");
    setCurrentView("kanban-archive");
  }, [setCurrentView, setSegmentMode]);

  return <B2BDashboardView />;
}
