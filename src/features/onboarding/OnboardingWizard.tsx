"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

import { useGlobalStore } from "../../store/useGlobalStore";
import { useDemoStore } from "../../store/useDemoStore";

import { StepIndicator } from "./shared";
import { Step1 } from "./steps/Step1";
import { Step3 } from "./steps/Step3";
import { Step5 } from "./steps/Step5";
import { sectorRegistry } from "./sectors";
import { createOnboardingSession, completeOnboarding } from "./actions";
import { generateDemoData, resolveUserInputs } from "../demo/generateDemoData";
import type { ERPOption, SectorOption } from "./types";

export default function OnboardingWizard() {
  const TOTAL_STEPS = 5;
  const [step, setStep] = useState(1);
  const setSegmentMode = useGlobalStore((state) => state.setSegmentMode);
  const setDemoSector = useDemoStore((s) => s.setSelectedSector);
  const setDemoInputs = useDemoStore((s) => s.setUserInputs);
  const setDashboardData = useDemoStore((s) => s.setDashboardData);

  const [selectedERP, setSelectedERP] = useState<ERPOption>(null);
  const [selectedSector, setSelectedSector] = useState<SectorOption>(null);

  const [email, setEmail] = useState("");
  const [sirketAdi, setSirketAdi] = useState("");
  const [rol, setRol] = useState("");

  /* Unified form values — field namespaces per sector */
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleFormChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleLaunch = async () => {
    if (sessionId) {
      await completeOnboarding(sessionId, formValues);
    }
    if (selectedSector) {
      const inputs = resolveUserInputs(selectedSector, formValues);
      const data = generateDemoData(selectedSector, inputs);
      setDemoSector(selectedSector);
      setDemoInputs(inputs);
      setDashboardData(data);
    }
    setSegmentMode("b2b");
  };

  const sectorModule = selectedSector ? sectorRegistry[selectedSector] : null;

  const canGoNext = (): boolean => {
    switch (step) {
      case 1:
        return selectedERP !== null && selectedSector !== null &&
          email.trim() !== "" && sirketAdi.trim() !== "" && rol.trim() !== "";
      case 2:
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  const next = async () => {
    if (!canGoNext() || step >= TOTAL_STEPS) return;

    if (step === 1 && selectedERP && selectedSector && !sessionId) {
      const result = await createOnboardingSession(selectedERP, selectedSector, email, sirketAdi, rol);
      if ('error' in result) {
        console.error('Session oluşturulamadı:', result.error);
        return;
      }
      setSessionId(result.id);
    }

    setStep((s) => s + 1);
  };
  const back = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div
        className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-2xl
                    shadow-[0_0_80px_rgba(0,0,0,0.5)] p-6 sm:p-10 overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-48 -right-48 h-96 w-96 rounded-full bg-blue-600/[0.03] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-indigo-600/[0.02] blur-[120px]" />

        <StepIndicator current={step} total={TOTAL_STEPS} />

        <div key={step} className="animate-fadeIn min-h-[400px]">
          {step === 1 && (
            <Step1
              erp={selectedERP}
              onErp={setSelectedERP}
              sector={selectedSector}
              onSector={setSelectedSector}
              email={email}
              onEmail={setEmail}
              sirketAdi={sirketAdi}
              onSirketAdi={setSirketAdi}
              rol={rol}
              onRol={setRol}
            />
          )}
          {step === 2 && sectorModule && (
            <sectorModule.Step2 values={formValues} onChange={handleFormChange} />
          )}
          {step === 3 && selectedSector && <Step3 sector={selectedSector} values={formValues} />}
          {step === 4 && sectorModule && (
            <sectorModule.Step4 values={formValues} onChange={handleFormChange} />
          )}
          {step === 5 && selectedSector && (
            <Step5 sector={selectedSector} values={formValues} onLaunch={handleLaunch} />
          )}
        </div>

        {step < TOTAL_STEPS && (
          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                           text-zinc-300 hover:text-zinc-50 border border-zinc-800
                           hover:border-zinc-600 transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft size={15} />
                Geri
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={next}
              disabled={!canGoNext()}
              className={`
                flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-200
                ${canGoNext()
                  ? "bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                  : "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
                }
              `}
            >
              İleri
              <ArrowRight size={15} />
            </button>
          </div>
        )}

        {step === TOTAL_STEPS && (
          <div className="mt-6 flex justify-start">
            <button
              onClick={back}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                         text-zinc-300 hover:text-zinc-50 border border-zinc-800
                         hover:border-zinc-600 transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft size={15} />
              Geri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
