# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- No test runner is configured

## Tech Stack

- **Next.js 16.2** (App Router) / React 19 / TypeScript 5
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Zustand** for client-side state (`src/store/useGlobalStore.ts`)
- **Supabase** for backend (browser client + server client with service role key)
- **Recharts** for data visualization, **Lucide React** for icons
- Dark mode only, Turkish-language UI (`lang="tr"`)

## Architecture

The app is a single-page financial operating system ("Narsent Nexus"). The root `app/page.tsx` is a client component that switches between two top-level views based on Zustand's `segmentMode`:

- **`'genel'`** (default) — renders the **OnboardingWizard** (5-step wizard)
- **`'b2b'`** — renders **B2BDashboardView** (sidebar + dashboard/actions/account-profile views toggled via `currentView` in the store)

### Feature layout (`src/features/`)

- **`onboarding/`** — Multi-step wizard with sector-specific steps. Steps 2 and 4 are dynamically loaded from `sectors/` via a registry pattern (`sectorRegistry` in `sectors/index.ts`). Sectors: `kobi`, `kurumsal`, `enerji`, `telekom`, `egitim`. Server actions in `actions.ts` persist onboarding data to Supabase `onboarding_sessions` table.
- **`dashboard/`** — B2B financial cockpit with KPI cards, charts (liquidity, waterfall, risk matrix, concentration radar, calendar), and top offenders list.
- **`actions/`** — Action table, account profiles, drawers, and module analysis panels. Includes a widget system (catalog modal + grid).

### Path aliases

`@/*` maps to the project root (e.g., `@/src/lib/supabase/server`).

### Supabase clients

- Browser: `src/lib/supabase/client.ts` — uses anon key
- Server (actions): `src/lib/supabase/server.ts` — uses service role key

### State management

All global UI state lives in a single Zustand store (`useGlobalStore`): segment mode, current view, selected account, active widgets, and modal states.
