import type React from "react";

export type ERPOption = "sap" | "logo" | "mikro" | "api" | null;

export type SectorOption =
  | "kobi"
  | "kurumsal"
  | "enerji"
  | "telekom"
  | "egitim"
  | null;

export type SectorKey = Exclude<SectorOption, null>;

export type Finding = {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
};

export type Step3Data = {
  title: string;
  subtitle: string;
  badge: string;
  findings: Finding[];
};

export type SectorFormProps = {
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
};

export type SectorModule = {
  Step2: React.FC<SectorFormProps>;
  step3: Step3Data;
  Step4: React.FC<SectorFormProps>;
  Step5Dashboard: React.FC;
};
