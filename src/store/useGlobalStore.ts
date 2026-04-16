import { create } from 'zustand';

type SegmentMode = 'genel' | 'b2b' | 'b2c';
type ViewMode = 'dashboard' | 'actions' | 'account-profile' | 'kanban-archive';

export interface WidgetData {
  id: string;
  module: string;
  metric: string;
  chartType: string;
  title: string;
}

interface GlobalStore {
  segmentMode: SegmentMode;
  setSegmentMode: (mode: SegmentMode) => void;
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
  selectedOrderStatus: string | null;
  setSelectedOrderStatus: (status: string | null) => void;
  activeWidgets: WidgetData[];
  addWidget: (widget: WidgetData) => void;
  removeWidget: (id: string) => void;
  isWidgetModalOpen: boolean;
  setWidgetModalOpen: (val: boolean) => void;
  isInvoiceModalOpen: boolean;
  setInvoiceModalOpen: (val: boolean) => void;
  isWhatIfModalOpen: boolean;
  setWhatIfModalOpen: (val: boolean) => void;
  isActionModalOpen: boolean;
  activeActionId: string | null;
  openActionModal: (id: string) => void;
  closeActionModal: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  segmentMode: 'genel',
  setSegmentMode: (mode) => set({ segmentMode: mode }),
  currentView: 'dashboard',
  setCurrentView: (view) => set({ currentView: view }),
  selectedAccountId: null,
  setSelectedAccountId: (id) => set({ selectedAccountId: id }),
  selectedOrderStatus: null,
  setSelectedOrderStatus: (status) => set({ selectedOrderStatus: status }),
  activeWidgets: [],
  addWidget: (widget) => set((state) => ({ activeWidgets: [...state.activeWidgets, widget] })),
  removeWidget: (id) => set((state) => ({ activeWidgets: state.activeWidgets.filter((w) => w.id !== id) })),
  isWidgetModalOpen: false,
  setWidgetModalOpen: (val) => set({ isWidgetModalOpen: val }),
  isInvoiceModalOpen: false,
  setInvoiceModalOpen: (val) => set({ isInvoiceModalOpen: val }),
  isWhatIfModalOpen: false,
  setWhatIfModalOpen: (val) => set({ isWhatIfModalOpen: val }),
  isActionModalOpen: false,
  activeActionId: null,
  openActionModal: (id) => set({ isActionModalOpen: true, activeActionId: id }),
  closeActionModal: () => set({ isActionModalOpen: false, activeActionId: null }),
}));
