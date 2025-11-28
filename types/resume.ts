// src/types/resume.ts

export interface IPhone {
  country_code: string; // e.g. "+1", "+91"
  number: string;       // e.g. "5551234567"
}

export interface IContact {
  email: string;
  phone: IPhone;
}

export interface ISkill {
  name: string;
  level: string;                // e.g. "Expert", "Advanced", "Intermediate"
  level_percentage?: number; // optional: 0–100 for progress bar (you can compute it if needed)
}

export interface IWorkExperience {
  id?: string;
  company_name: string;
  job_title: string;
  city: string;
  country?: string;
  from_date: string;            // "2022/2023" or "Feb 2023"
  to_date?: string;
  current: boolean;
  description: string;          // HTML string allowed (<ul><li>…)
}

export interface IEducation {
  id?: string;
  degree: string;               // e.g. "Bachelor of Science"
  field_of_study?: string;
  institution_name: string;
  city: string;
  country?: string;
  from_date: string;
  to_date?: string;
  current: boolean;
  description?: string;         // optional, HTML allowed
}

export interface IReference {
  id?: string;
  person_name: string;
  designation: string;
  company: string;
  email?: string;
  phone?: IPhone;
}

export interface IResumeArray {
  name: string;
  job_position: string;
  image_url?: string;           // full URL or path to photo
  contact: IContact;
  address: string;
  portfolio?: string;           // website / LinkedIn / GitHub
  about_me?: string;            // optional profile summary

  skills: ISkill[];
  work_experiences: IWorkExperience[];
  educations: IEducation[];
  references?: IReference[];    // optional – can come from a separate list too
}