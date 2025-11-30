import { IResumeData } from "@/types/resumeTypes";
import { v4 as uuidv4 } from "uuid";

export const initialResume : IResumeData = {
  name: "John Cena",
  position: "Senior Software Engineer",
  email: "john.cena@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  portfolio: "www.johncena.dev",
  summary:
    "Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.",
  experiences: [
    {
      id: uuidv4(),
      company: "Tech Corp Inc.",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      current: true,
      description:
        "Led development of microservices architecture serving 2M+ users. Implemented CI/CD pipelines reducing deployment time by 60%.",
    },
    {
      id: uuidv4(),
      company: "StartUp Labs",
      title: "Full Stack Developer",
      location: "Austin, TX",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      current: false,
      description:
        "Built scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver features on time.",
    },
  ],
  education: [
    {
      id: uuidv4(),
      degree: "Bachelor of Science",
      field: "Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      startDate: "2013",
      endDate: "2017",
      current: false,
      description:
        "GPA: 3.8/4.0. Focus on algorithms, data structures, and software engineering.",
    },
  ],
  skills: [
    { id: uuidv4(), name: "JavaScript/TypeScript", level: "Expert" },
    { id: uuidv4(), name: "React & Next.js", level: "Expert" },
    { id: uuidv4(), name: "Node.js & Express", level: "Advanced" },
    { id: uuidv4(), name: "AWS & Docker", level: "Advanced" },
  ],
};
