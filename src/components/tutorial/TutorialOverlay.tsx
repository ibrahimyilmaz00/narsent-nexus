"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useGlobalStore, WidgetData } from "@/src/store/useGlobalStore";
import { tutorialSteps, TutorialStep } from "@/src/features/tutorial/tutorialSteps";

interface Rect { x: number; y: number; width: number; height: number }

const PADDING = 16;
const TOOLTIP_W = 380;
const TOOLTIP_APPROX_H = 220;

const DEMO_WIDGETS: WidgetData[] = [
  { id: 'tw-1', module: 'module1', metric: 'Gecikme Olasılığı', chartType: 'Bar Chart', title: 'Gecikme Risk Dağılımı' },
  { id: 'tw-2', module: 'module2', metric: 'Nakit Akışı', chartType: 'Area Chart', title: 'Nakit Akış Projeksiyonu' },
];

function computeTooltipStyle(
  rect: Rect | null,
  side: TutorialStep["side"],
  fixedPosition?: TutorialStep["fixedPosition"]
): React.CSSProperties {
  // Fixed corner — overrides everything when set
  if (fixedPosition) {
    const base: React.CSSProperties = { position: "fixed", width: TOOLTIP_W, maxWidth: "calc(100vw - 48px)" };
    if (fixedPosition === "bottom-right")  return { ...base, bottom: 28, right: 28 };
    if (fixedPosition === "bottom-left")   return { ...base, bottom: 28, left: 28 };
    if (fixedPosition === "top-right")     return { ...base, top: 28, right: 28 };
    if (fixedPosition === "top-left")      return { ...base, top: 28, left: 28 };
    if (fixedPosition === "bottom-center") return { ...base, bottom: 28, left: "50%", transform: "translateX(-50%)", width: TOOLTIP_W + 60 };
  }

  if (!rect) {
    return {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: Math.min(TOOLTIP_W + 60, (typeof window !== "undefined" ? window.innerWidth : 800) - 48),
    };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  const clampX = (v: number) => Math.max(16, Math.min(v, vw - TOOLTIP_W - 16));

  if (side === "right") {
    const left = rect.x + rect.width + PADDING + 8;
    const top = Math.max(16, Math.min(cy - TOOLTIP_APPROX_H / 2, vh - TOOLTIP_APPROX_H - 16));
    return { position: "fixed", top, left, width: TOOLTIP_W };
  }
  if (side === "left") {
    const left = Math.max(16, rect.x - PADDING - TOOLTIP_W - 8);
    const top = Math.max(16, Math.min(cy - TOOLTIP_APPROX_H / 2, vh - TOOLTIP_APPROX_H - 16));
    return { position: "fixed", top, left, width: TOOLTIP_W };
  }
  if (side === "top") {
    const top = Math.max(16, rect.y - PADDING - TOOLTIP_APPROX_H - 8);
    return { position: "fixed", top, left: clampX(cx - TOOLTIP_W / 2), width: TOOLTIP_W };
  }

  // bottom / auto
  const belowY = rect.y + rect.height + PADDING + 8;
  const aboveY = rect.y - PADDING - TOOLTIP_APPROX_H - 8;
  const top = belowY + TOOLTIP_APPROX_H < vh ? belowY : Math.max(16, aboveY);
  return { position: "fixed", top, left: clampX(cx - TOOLTIP_W / 2), width: TOOLTIP_W };
}

export default function TutorialOverlay() {
  const {
    isTutorialActive,
    tutorialStep,
    nextTutorialStep,
    prevTutorialStep,
    endTutorial,
    setCurrentView,
    setSidebarForced,
    setTutorialDrawerOpen,
    setWidgetModalOpen,
    addWidget,
    activeWidgets,
    openActionModal,
    closeActionModal,
  } = useGlobalStore();

  const [rect, setRect] = useState<Rect | null>(null);

  const steps = tutorialSteps;
  const step = steps[tutorialStep];
  const isLast = tutorialStep === steps.length - 1;
  const isFirst = tutorialStep === 0;

  const prevStepRef = useRef(tutorialStep);

  // Side effects when a step becomes active
  useEffect(() => {
    if (!isTutorialActive || !step) return;

    const isGoingBack = tutorialStep < prevStepRef.current;
    prevStepRef.current = tutorialStep;

    const currentNav = isGoingBack && step.backOverrides?.navigateTo !== undefined ? step.backOverrides.navigateTo : step.navigateTo;
    if (currentNav) setCurrentView(currentNav);

    const currentForceSidebar = isGoingBack && step.backOverrides?.forceSidebar !== undefined ? step.backOverrides.forceSidebar : step.forceSidebar;
    if (currentForceSidebar !== undefined) setSidebarForced(currentForceSidebar);

    const openDrawer = isGoingBack && step.backOverrides?.openDrawer !== undefined ? step.backOverrides.openDrawer : step.openDrawer;
    if (openDrawer) setTutorialDrawerOpen(true);

    const closeDrawer = isGoingBack && step.backOverrides?.closeDrawer !== undefined ? step.backOverrides.closeDrawer : step.closeDrawer;
    if (closeDrawer) setTutorialDrawerOpen(false);

    const openWidgetModal = isGoingBack && step.backOverrides?.openWidgetModal !== undefined ? step.backOverrides.openWidgetModal : step.openWidgetModal;
    if (openWidgetModal) setWidgetModalOpen(true);

    const closeWidgetModal = isGoingBack && step.backOverrides?.closeWidgetModal !== undefined ? step.backOverrides.closeWidgetModal : step.closeWidgetModal;
    if (closeWidgetModal) setWidgetModalOpen(false);

    const openOmni = isGoingBack && step.backOverrides?.openOmnichannelModal !== undefined ? step.backOverrides.openOmnichannelModal : step.openOmnichannelModal;
    if (openOmni) openActionModal('__tutorial__');

    const closeOmni = isGoingBack && step.backOverrides?.closeOmnichannelModal !== undefined ? step.backOverrides.closeOmnichannelModal : step.closeOmnichannelModal;
    if (closeOmni && !step.clickOmnichannelSend) closeActionModal();

    if (step.autoAddDemoWidgets && !isGoingBack) {
      const existingIds = activeWidgets.map((w) => w.id);
      DEMO_WIDGETS.forEach((w) => {
        if (!existingIds.includes(w.id)) addWidget(w);
      });
    }

    if (!isGoingBack) {
      if (step.autoSelectChannels) {
        setTimeout(() => {
          const btns = document.querySelectorAll('[data-tutorial="omni-channels"] button');
          (btns[0] as HTMLButtonElement | undefined)?.click();
          (btns[1] as HTMLButtonElement | undefined)?.click();
        }, 450);
      }
      if (step.clickOmnichannelSend) {
        // Click send at 300ms — modal must still be open at this point
        setTimeout(() => {
          const btn = document.querySelector('[data-tutorial="omni-send"] button') as HTMLButtonElement | null;
          btn?.click();
        }, 300);
      }
      if (step.triggerClick) {
        setTimeout(() => {
          (document.querySelector(step.triggerClick!) as HTMLElement | null)?.click();
        }, 350);
      }
    } else if (isGoingBack && step.backOverrides?.triggerClick) {
      setTimeout(() => {
        (document.querySelector(step.backOverrides!.triggerClick!) as HTMLElement | null)?.click();
      }, 350);
    }
  }, [isTutorialActive, tutorialStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clean up all forced states when tutorial ends
  useEffect(() => {
    if (!isTutorialActive) {
      setSidebarForced(false);
      setTutorialDrawerOpen(false);
      setWidgetModalOpen(false);
      closeActionModal();
    }
  }, [isTutorialActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // Measure target element
  const measure = useCallback(() => {
    if (!step?.selector) { setRect(null); return; }
    const el = document.querySelector(step.selector);
    if (!el) { setRect(null); return; }
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = Math.max(0, r.x);
    const y = Math.max(0, r.y);
    const width = Math.min(r.width, vw - x);
    const height = Math.min(r.height, vh - y);
    setRect({ x, y, width, height });
  }, [step]);

  useEffect(() => {
    if (!isTutorialActive || !step) return;
    if (step.selector) {
      const el = document.querySelector(step.selector);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const id = setTimeout(measure, 380);
        return () => clearTimeout(id);
      } else {
        // Element not in DOM yet — clear stale rect and retry after render
        setRect(null);
        const id = setTimeout(() => {
          const retryEl = document.querySelector(step.selector!);
          if (retryEl) {
            retryEl.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(measure, 380);
          }
        }, 300);
        return () => clearTimeout(id);
      }
    } else {
      setRect(null);
    }
  }, [isTutorialActive, tutorialStep, step, measure]);

  useEffect(() => {
    const onScroll = () => measure();
    const onResize = () => measure();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  if (!isTutorialActive || !step) return null;

  const tooltipStyle = computeTooltipStyle(rect, step.side ?? "auto", step.fixedPosition);

  return (
    <>
      {/* Transparent click-blocker over spotlight — disabled for frameOnly (users need to interact with modal) */}
      {rect && !step.noOverlay && !step.frameOnly && (
        <div
          className="fixed z-[199] pointer-events-auto"
          style={{
            left: rect.x - PADDING,
            top: rect.y - PADDING,
            width: rect.width + PADDING * 2,
            height: rect.height + PADDING * 2,
            borderRadius: 14,
          }}
        />
      )}

      {/* SVG spotlight overlay */}
      {!step.noOverlay && (
        <svg
          className="fixed inset-0 z-[200] pointer-events-none"
          style={{ width: "100vw", height: "100vh" }}
          aria-hidden
        >
          {/* Dark fill with hole — only when not frameOnly */}
          {!step.frameOnly && (
            <>
              <defs>
                {rect && (
                  <mask id="t-mask">
                    <rect width="100%" height="100%" fill="white" />
                    <rect
                      x={rect.x - PADDING}
                      y={rect.y - PADDING}
                      width={rect.width + PADDING * 2}
                      height={rect.height + PADDING * 2}
                      rx="14"
                      fill="black"
                    />
                  </mask>
                )}
              </defs>
              <rect
                width="100%"
                height="100%"
                fill={rect ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.60)"}
                mask={rect ? "url(#t-mask)" : undefined}
              />
            </>
          )}
          {/* Spotlight border — always shown when rect exists */}
          {rect && (
            <rect
              x={rect.x - PADDING}
              y={rect.y - PADDING}
              width={rect.width + PADDING * 2}
              height={rect.height + PADDING * 2}
              rx="14"
              fill="none"
              stroke={step.frameOnly ? "rgba(99,102,241,0.7)" : "rgba(99,102,241,0.35)"}
              strokeWidth={step.frameOnly ? "2" : "1.5"}
            />
          )}
        </svg>
      )}

      {/* Tooltip card */}
      <div className="fixed z-[201] pointer-events-auto" style={tooltipStyle}>
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-2xl shadow-black/70 p-6">
          {/* Step progress */}
          <div className="flex items-center gap-1.5 mb-5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  i === tutorialStep
                    ? "w-7 bg-indigo-500"
                    : i < tutorialStep
                    ? "w-3 bg-zinc-600"
                    : "w-3 bg-zinc-800"
                }`}
              />
            ))}
            <span className="ml-auto text-[11px] text-zinc-600 tabular-nums">
              {tutorialStep + 1}&nbsp;/&nbsp;{steps.length}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-zinc-50 font-semibold text-[15px] leading-snug mb-2">
            {step.title}
          </h3>
          <p className="text-zinc-400 text-[13px] leading-relaxed">
            {step.description}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={endTutorial}
              className="text-[11px] text-zinc-700 hover:text-zinc-400 transition-colors"
            >
              Atla
            </button>
            <div className="flex items-center gap-1">
              {!isFirst && (
                <button
                  onClick={prevTutorialStep}
                  className="px-3 py-2 text-[13px] text-zinc-500 hover:text-zinc-200 rounded-xl hover:bg-zinc-800 transition-all duration-150"
                >
                  ←
                </button>
              )}
              <button
                onClick={() => {
                  if (step.triggerWidgetAdd) {
                    const btn = document.querySelector('[data-tutorial="widget-add-btn"]') as HTMLButtonElement | null;
                    btn?.click();
                    setTimeout(isLast ? endTutorial : nextTutorialStep, 150);
                    return;
                  }
                  if (step.advanceClick) {
                    (document.querySelector(step.advanceClick) as HTMLElement | null)?.click();
                    setTimeout(isLast ? endTutorial : nextTutorialStep, 400);
                    return;
                  }
                  if (isLast) endTutorial(); else nextTutorialStep();
                }}
                className="px-5 py-2 text-[13px] font-medium bg-zinc-100 text-zinc-900 rounded-xl hover:bg-white transition-colors duration-150"
              >
                {step.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
