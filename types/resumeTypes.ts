
import { ReactElement } from "react";

export interface IExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface IEducation {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ISkill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface IResumeData {
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  summary: string;
  experiences: IExperience[];
  education: IEducation[];
  skills: ISkill[];
}

export interface IBlock {
  element: ReactElement;
  height: number;
  isLeftColumn?: boolean;
  isRightColumn?: boolean;
}

export type PageContent = ReactElement;
export type PageRow = ReactElement;

export const PAGE_HEIGHT = 1000;

export const createRefMap = () =>
  new Map<string, React.RefObject<HTMLDivElement>>();
