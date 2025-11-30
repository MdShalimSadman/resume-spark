import { IResumeData } from "@/types/resumeTypes";

export const formatResumeForAI = (resume: IResumeData) => {
  return `
Name: ${resume.name}
Position: ${resume.position}
Email: ${resume.email}
Phone: ${resume.phone}
Location: ${resume.location}
Portfolio: ${resume.portfolio}

Summary:
${resume.summary}

Work Experience:
${resume.experiences
  .map(
    (exp) => `
Company: ${exp.company}
Title: ${exp.title}
Location: ${exp.location}
Date: ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}
Description: ${exp.description}
`
  )
  .join("\n")}

Education:
${resume.education
  .map(
    (edu) => `
Degree: ${edu.degree} in ${edu.field}
Institution: ${edu.institution}
Location: ${edu.location}
Date: ${edu.startDate} - ${edu.current ? "Present" : edu.endDate}
Description: ${edu.description}
`
  )
  .join("\n")}

Skills:
${resume.skills.map((s) => `${s.name} (${s.level})`).join(", ")}
  `;
};
