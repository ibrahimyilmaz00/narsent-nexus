import { create } from "zustand";
import type { SectorKey } from "../features/onboarding/types";
import type { DashboardData, DemoUserInputs } from "../features/demo/demoTypes";

interface DemoStore {
  selectedSector: SectorKey | null;
  userInputs: DemoUserInputs | null;
  currentDashboardData: DashboardData | null;

  setSelectedSector: (sector: SectorKey | null) => void;
  setUserInputs: (inputs: DemoUserInputs) => void;
  setDashboardData: (data: DashboardData) => void;
  reset: () => void;
}

export const useDemoStore = create<DemoStore>((set) => ({
  selectedSector: null,
  userInputs: null,
  currentDashboardData: null,

  setSelectedSector: (sector) => set({ selectedSector: sector }),
  setUserInputs: (inputs) => set({ userInputs: inputs }),
  setDashboardData: (data) => set({ currentDashboardData: data }),
  reset: () =>
    set({ selectedSector: null, userInputs: null, currentDashboardData: null }),
}));
