import { atom } from 'jotai';

export interface AtsReportData {
  atsScore: number;
  summary: string;
  strengths: string[];
  issues: string[];
  fixSuggestions: string[];
  keywordOptimization: string[];
}

export const atsReportAtom = atom<AtsReportData | null>(null);

export const atsLoadingAtom = atom(false);