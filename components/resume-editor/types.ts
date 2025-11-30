// types.ts
import { ReactElement, ReactNode } from "react";

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
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

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface ResumeData {
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

export interface Block {
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
