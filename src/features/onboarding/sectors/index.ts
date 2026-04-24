import * as kobi from "./kobi";
import * as kurumsal from "./kurumsal";
import * as enerji from "./enerji";
import * as telekom from "./telekom";
import * as egitim from "./egitim";

import type { SectorKey, SectorModule } from "../types";

export const sectorRegistry: Record<SectorKey, SectorModule> = {
  kobi: {
    Step2: kobi.Step2,
    computeStep3: kobi.computeStep3,
    Step4: kobi.Step4,
    Step5Dashboard: kobi.Step5Dashboard,
  },
  kurumsal: {
    Step2: kurumsal.Step2,
    computeStep3: kurumsal.computeStep3,
    Step4: kurumsal.Step4,
    Step5Dashboard: kurumsal.Step5Dashboard,
  },
  enerji: {
    Step2: enerji.Step2,
    computeStep3: enerji.computeStep3,
    Step4: enerji.Step4,
    Step5Dashboard: enerji.Step5Dashboard,
  },
  telekom: {
    Step2: telekom.Step2,
    computeStep3: telekom.computeStep3,
    Step4: telekom.Step4,
    Step5Dashboard: telekom.Step5Dashboard,
  },
  egitim: {
    Step2: egitim.Step2,
    computeStep3: egitim.computeStep3,
    Step4: egitim.Step4,
    Step5Dashboard: egitim.Step5Dashboard,
  },
};
