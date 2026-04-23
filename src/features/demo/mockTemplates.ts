import type { SectorKey } from "../onboarding/types";
import type { DemoTemplate } from "./demoTypes";
import { kobiTemplate } from "./templates/kobi";
import { kurumsalTemplate } from "./templates/kurumsal";
import { enerjiTemplate } from "./templates/enerji";
import { telekomTemplate } from "./templates/telekom";
import { egitimTemplate } from "./templates/egitim";

export const demoTemplates: Record<SectorKey, DemoTemplate> = {
  kobi: kobiTemplate,
  kurumsal: kurumsalTemplate,
  enerji: enerjiTemplate,
  telekom: telekomTemplate,
  egitim: egitimTemplate,
};
