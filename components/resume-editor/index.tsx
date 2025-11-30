"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactElement,
  ReactNode,
  createRef,
} from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useSetAtom } from "jotai";
import { atsReportAtom, atsLoadingAtom, AtsReportData } from "@/atoms/atsAtom";
import { useRouter } from "next/navigation";

import EditorPanel from "./sections/EditorPanel";
import PreviewPanel from "./sections/PreviewPanel";
import {
  IExperience,
  IEducation,
  ISkill,
  IResumeData,
  IBlock,
  PageContent,
  PageRow,
  PAGE_HEIGHT,
  createRefMap,
} from "../../types/resumeTypes";
import ResumeHeader from "./sections/ResumeHeader";
import { initialResume } from "@/data/resumeData";
import { formatResumeForAI } from "@/utils/formatResumeForAi";
import DownloadPDF from "./sections/DownloadPdf";

const ResumeEditorIndex = () => {
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [resume, setResume] = useState<IResumeData>(initialResume);
  const [isAtsLoading, setIsAtsLoading] = useState(false);
  const [pageContents, setPageContents] = useState<PageRow[][]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const router = useRouter();

  const editPanelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const positionRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);

  const setAtsReport = useSetAtom(atsReportAtom);
  const setLoading = useSetAtom(atsLoadingAtom);

  const experienceRefs = useRef(createRefMap()).current;
  const educationRefs = useRef(createRefMap()).current;
  const skillRefs = useRef(createRefMap()).current;

  const getOrCreateRef = useCallback(
    (
      id: string,
      refMap: Map<string, React.RefObject<HTMLDivElement | null>>
    ) => {
      if (!refMap.has(id)) {
        refMap.set(id, createRef<HTMLDivElement>());
      }
      return refMap.get(id)!;
    },
    []
  );

  const handlePreviewClick = useCallback(
    (
      refKey: string,
      type: "basic" | "experience" | "education" | "skill",
      id?: string
    ) => {
      setViewMode("edit");

      let targetRef: React.RefObject<
        HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
      > | null = null;

      switch (type) {
        case "basic":
          if (refKey === "name")
            targetRef = nameRef as React.RefObject<HTMLInputElement>;
          if (refKey === "position")
            targetRef = positionRef as React.RefObject<HTMLInputElement>;
          if (refKey === "email")
            targetRef = emailRef as React.RefObject<HTMLInputElement>;
          if (refKey === "phone")
            targetRef = phoneRef as React.RefObject<HTMLInputElement>;
          if (refKey === "location")
            targetRef = locationRef as React.RefObject<HTMLInputElement>;
          if (refKey === "portfolio")
            targetRef = portfolioRef as React.RefObject<HTMLInputElement>;
          if (refKey === "summary")
            targetRef = summaryRef as React.RefObject<HTMLTextAreaElement>;
          break;
        case "experience":
          targetRef = experienceRefs.get(id || "") || null;
          break;
        case "education":
          targetRef = educationRefs.get(id || "") || null;
          break;
        case "skill":
          targetRef = skillRefs.get(id || "") || null;
          break;
        default:
          break;
      }

      if (editPanelRef.current) {
        editPanelRef.current.scrollTop = 0;
      }

      setTimeout(() => {
        if (targetRef?.current) {
          const element = targetRef.current;

          element.scrollIntoView({ behavior: "smooth", block: "start" });

          if (
            refKey !== "experience" &&
            refKey !== "education" &&
            refKey !== "skill"
          ) {
            if (typeof (element as HTMLInputElement).focus === "function") {
              (element as HTMLInputElement).focus();
            }
          }
        }
      }, 100);
    },
    [
      experienceRefs,
      educationRefs,
      skillRefs,
      nameRef,
      positionRef,
      emailRef,
      phoneRef,
      locationRef,
      portfolioRef,
      summaryRef,
    ]
  );

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: uuidv4(),
          company: "",
          title: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => {
      experienceRefs.delete(id);
      return {
        ...prev,
        experiences: prev.experiences.filter((exp) => exp.id !== id),
      };
    });
  };

  const updateExperience = (
    id: string,
    field: keyof IExperience,
    value: string | boolean
  ) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: uuidv4(),
          degree: "",
          field: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => {
      educationRefs.delete(id);
      return {
        ...prev,
        education: prev.education.filter((edu) => edu.id !== id),
      };
    });
  };

  const updateEducation = (
    id: string,
    field: keyof IEducation,
    value: string | boolean
  ) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addSkill = () => {
    setResume((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: uuidv4(),
          name: "",
          level: "Beginner",
        },
      ],
    }));
  };

  const removeSkill = (id: string) => {
    setResume((prev) => {
      skillRefs.delete(id);
      return {
        ...prev,
        skills: prev.skills.filter((skill) => skill.id !== id),
      };
    });
  };

  const updateSkill = (id: string, field: keyof ISkill, value: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id
          ? { ...skill, [field]: value as ISkill[typeof field] }
          : skill
      ),
    }));
  };

  useEffect(() => {
    const splitIntoPages = () => {
      const clickableWrapper = (
        element: ReactElement<{ className?: string; children?: ReactNode }>,
        refKey: string,
        type: "basic" | "experience" | "education" | "skill",
        id?: string
      ) => {
        const { className, children, ...restProps } = element.props;
        return (
          <div
            {...restProps}
            className={`${
              className || ""
            } cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors`}
            onClick={() => handlePreviewClick(refKey, type, id)}
          >
            {children}
          </div>
        );
      };

      const headerBlock: IBlock = {
        element: (
          <div
            key="header-block"
            className="mb-6 border-b-4 border-indigo-600 pb-4"
          >
            <h1
              className="text-4xl font-bold text-gray-900 cursor-pointer hover:text-indigo-700 transition-colors"
              onClick={() => handlePreviewClick("name", "basic")}
            >
              {resume.name}
            </h1>
            <p
              className="text-xl text-indigo-600 mt-1 cursor-pointer hover:text-indigo-700 transition-colors"
              onClick={() => handlePreviewClick("position", "basic")}
            >
              {resume.position}
            </p>
          </div>
        ),
        height: 120,
      };

      const contactBlock: IBlock = {
        element: (
          <div key="contact-block" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              <div
                key="contact-mail"
                className="flex items-start gap-2 cursor-pointer hover:bg-gray-100 p-0.5 rounded transition-colors"
                onClick={() => handlePreviewClick("email", "basic")}
              >
                <Mail className="text-indigo-600 mt-0.5 shrink-0" size={16} />
                <span className="text-gray-700">{resume.email}</span>
              </div>
              <div
                key="contact-phone"
                className="flex items-start gap-2 cursor-pointer hover:bg-gray-100 p-0.5 rounded transition-colors"
                onClick={() => handlePreviewClick("phone", "basic")}
              >
                <Phone className="text-indigo-600 mt-0.5 shrink-0" size={16} />
                <span className="text-gray-700">{resume.phone}</span>
              </div>
              <div
                key="contact-location"
                className="flex items-start gap-2 cursor-pointer hover:bg-gray-100 p-0.5 rounded transition-colors"
                onClick={() => handlePreviewClick("location", "basic")}
              >
                <MapPin className="text-indigo-600 mt-0.5 shrink-0" size={16} />
                <span className="text-gray-700">{resume.location}</span>
              </div>
              {resume.portfolio && (
                <div
                  key="contact-portfolio"
                  className="flex items-start gap-2 cursor-pointer hover:bg-gray-100 p-0.5 rounded transition-colors"
                  onClick={() => handlePreviewClick("portfolio", "basic")}
                >
                  <Globe
                    className="text-indigo-600 mt-0.5 shrink-0"
                    size={16}
                  />
                  <span className="text-gray-700">{resume.portfolio}</span>
                </div>
              )}
            </div>
          </div>
        ),
        height: 180,
        isLeftColumn: true,
      };

      const skillsHeaderBlock: IBlock = {
        element: (
          <div key="skills-header" className="mb-3">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-indigo-600">
              SKILLS
            </h2>
          </div>
        ),
        height: 40,
        isLeftColumn: true,
      };

      const skillBlocks: IBlock[] = resume.skills.map((skill) => ({
        element: clickableWrapper(
          <div key={skill.id} className="mb-3">
            <p className="font-semibold text-gray-900 text-sm">{skill.name}</p>
            <p className="text-xs text-gray-600">{skill.level}</p>
          </div>,
          "skill",
          "skill",
          skill.id
        ),
        height: 50,
        isLeftColumn: true,
      }));

      const summaryBlock: IBlock | null = resume.summary
        ? {
            element: clickableWrapper(
              <div key="summary-block" className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {resume.summary}
                </p>
              </div>,
              "summary",
              "basic"
            ),
            height: 120,
            isRightColumn: true,
          }
        : null;

      const experienceHeaderBlock: IBlock = {
        element: (
          <div key="experience-header" className="mb-3">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-indigo-600">
              WORK EXPERIENCE
            </h2>
          </div>
        ),
        height: 40,
        isRightColumn: true,
      };

      const experienceBlocks: IBlock[] = resume.experiences.map((exp) => ({
        element: clickableWrapper(
          <div key={exp.id} className="mb-5">
            <p className="font-bold text-gray-900">{exp.company}</p>
            <p className="text-sm text-indigo-600 font-semibold">{exp.title}</p>
            <p className="text-xs text-gray-600">
              {exp.location} | {exp.startDate} -{" "}
              {exp.current ? "Present" : exp.endDate}
            </p>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              {exp.description}
            </p>
          </div>,
          "experience",
          "experience",
          exp.id
        ),
        height: 140,
        isRightColumn: true,
      }));

      const educationHeaderBlock: IBlock = {
        element: (
          <div key="education-header" className="mb-3">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-indigo-600">
              EDUCATION
            </h2>
          </div>
        ),
        height: 40,
        isRightColumn: true,
      };

      const educationBlocks: IBlock[] = resume.education.map((edu) => ({
        element: clickableWrapper(
          <div key={edu.id} className="mb-5">
            <p className="font-bold text-gray-900">
              {edu.degree}
              {edu.field && ` in ${edu.field}`}
            </p>
            <p className="text-sm text-indigo-600 font-semibold">
              {edu.institution}
            </p>
            <p className="text-xs text-gray-600">
              {edu.location} | {edu.startDate} -{" "}
              {edu.current ? "Present" : edu.endDate}
            </p>
            {edu.description && (
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                {edu.description}
              </p>
            )}
          </div>,
          "education",
          "education",
          edu.id
        ),
        height: 120,
        isRightColumn: true,
      }));

      const leftBlocks: IBlock[] = [
        contactBlock,
        skillsHeaderBlock,
        ...skillBlocks,
      ];

      const rightBlocks: IBlock[] = [];
      if (summaryBlock) rightBlocks.push(summaryBlock);
      if (resume.experiences.length > 0) {
        rightBlocks.push(experienceHeaderBlock);
        rightBlocks.push(...experienceBlocks);
      }
      if (resume.education.length > 0) {
        rightBlocks.push(educationHeaderBlock);
        rightBlocks.push(...educationBlocks);
      }

      const splitColumnIntoPages = (
        blocks: IBlock[],
        startHeight: number = 0
      ): PageContent[][] => {
        const columnPages: PageContent[][] = [];
        let currentPage: PageContent[] = [];
        let currentHeight = startHeight;
        const PAGE_LIMIT = PAGE_HEIGHT - 80;

        blocks.forEach((block) => {
          if (
            currentHeight + block.height > PAGE_LIMIT &&
            currentPage.length > 0
          ) {
            columnPages.push(currentPage);
            currentPage = [];
            currentHeight = 0;
          }
          currentPage.push(block.element);
          currentHeight += block.height;
        });

        if (currentPage.length > 0) {
          columnPages.push(currentPage);
        }

        return columnPages;
      };

      const leftColumnPages = splitColumnIntoPages(leftBlocks, 120);
      const rightColumnPages = splitColumnIntoPages(rightBlocks, 120);

      const totalPages = Math.max(
        leftColumnPages.length,
        rightColumnPages.length
      );

      const pages: PageRow[][] = [];
      for (let i = 0; i < totalPages; i++) {
        const pageContent: PageRow[] = [];

        if (i === 0) {
          pageContent.push(headerBlock.element);
        }

        const leftContent = leftColumnPages[i] || [];
        const rightContent = rightColumnPages[i] || [];

        pageContent.push(
          <div key={`page-${i}-columns`} className="flex gap-6">
            <div className="w-1/3 space-y-3">
              {leftContent.map((el, idx) => (
                <span key={`left-${i}-${idx}`}>{el}</span>
              ))}
            </div>
            <div className="w-2/3 space-y-3">
              {rightContent.map((el, idx) => (
                <span key={`right-${i}-${idx}`}>{el}</span>
              ))}
            </div>
          </div>
        );

        pages.push(pageContent);
      }

      setPageContents(pages);
    };

    splitIntoPages();
  }, [resume, handlePreviewClick]);

  const handleDownloadPDF = async () => {
    DownloadPDF({ setIsDownloading, resume });
  };

  const handleCheckATS = async () => {
    setIsAtsLoading(true);
    setLoading(true);
    setAtsReport(null);

    try {
      const formattedResume = formatResumeForAI(resume);

      const response = await fetch("/api/ats-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: formattedResume }),
      });

      const data = await response.json();

      let finalReport: AtsReportData | null = null;

      if (response.ok && data.result) {
        if (typeof data.result === "string") {
          try {
            finalReport = JSON.parse(data.result);
          } catch (e) {
            console.error("Failed to parse inner JSON string:", e);
          }
        } else {
          finalReport = data.result;
        }

        if (finalReport) {
          setAtsReport(finalReport as AtsReportData);
          router.push("/ats-report");
        }
      } else {
        console.error("API Error:", data.error || "Failed to analyze resume.");
      }
    } catch (err) {
      console.error("Network or Parsing Error:", err);
    } finally {
      setLoading(false);
      setIsAtsLoading(false);
    }
  };

  return (
    <div className="md:p-8 pb-0! md:pb-2!">
      <div className="max-w-7xl mx-auto">
        <ResumeHeader
          handleCheckATS={handleCheckATS}
          handleDownloadPDF={handleDownloadPDF}
          isAtsLoading={isAtsLoading}
          isDownloading={isDownloading}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {viewMode === "edit" && (
            <EditorPanel
              resume={resume}
              setResume={setResume}
              getOrCreateRef={getOrCreateRef}
              experienceRefs={experienceRefs}
              educationRefs={educationRefs}
              skillRefs={skillRefs}
              nameRef={nameRef}
              positionRef={positionRef}
              emailRef={emailRef}
              phoneRef={phoneRef}
              locationRef={locationRef}
              portfolioRef={portfolioRef}
              summaryRef={summaryRef}
              editPanelRef={editPanelRef}
              addExperience={addExperience}
              removeExperience={removeExperience}
              updateExperience={updateExperience}
              addEducation={addEducation}
              removeEducation={removeEducation}
              updateEducation={updateEducation}
              addSkill={addSkill}
              removeSkill={removeSkill}
              updateSkill={updateSkill}
            />
          )}
          <PreviewPanel
            pageContents={pageContents}
            viewMode={viewMode}
            pageHeight={PAGE_HEIGHT}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeEditorIndex;
