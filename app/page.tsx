"use client";
import { useGlobalStore } from "../src/store/useGlobalStore";
import OnboardingWizard from "../src/features/onboarding/OnboardingWizard";
import B2BDashboardView from "../src/features/dashboard/B2BDashboardView";

export default function Home() {
  const segmentMode = useGlobalStore((state) => state.segmentMode);

  if (segmentMode === "b2b") {
    return <B2BDashboardView />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <OnboardingWizard />
    </div>
  );
}
