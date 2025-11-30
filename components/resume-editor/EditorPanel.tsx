// EditorPanel.tsx
"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  ResumeData,
  Experience,
  Education,
  Skill,
} from "./types";

interface EditorPanelProps {
  resume: ResumeData;
  setResume: (r: ResumeData) => void;
  getOrCreateRef: (
    id: string,
    refMap: Map<string, React.RefObject<HTMLDivElement | null>>
  ) => React.RefObject<HTMLDivElement | null>;
  experienceRefs: Map<string, React.RefObject<HTMLDivElement | null>>;
  educationRefs: Map<string, React.RefObject<HTMLDivElement | null>>;
  skillRefs: Map<string, React.RefObject<HTMLDivElement | null>>;
  nameRef: React.RefObject<HTMLInputElement | null>;
  positionRef: React.RefObject<HTMLInputElement | null>;
  emailRef: React.RefObject<HTMLInputElement | null>;
  phoneRef: React.RefObject<HTMLInputElement | null>;
  locationRef: React.RefObject<HTMLInputElement | null>;
  portfolioRef: React.RefObject<HTMLInputElement | null>;
  summaryRef: React.RefObject<HTMLTextAreaElement | null>;
  editPanelRef: React.RefObject<HTMLDivElement | null>;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateExperience: (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateEducation: (
    id: string,
    field: keyof Education,
    value: string | boolean
  ) => void;
  addSkill: () => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, field: keyof Skill, value: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  resume,
  setResume,
  getOrCreateRef,
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
  editPanelRef,
  addExperience,
  removeExperience,
  updateExperience,
  addEducation,
  removeEducation,
  updateEducation,
  addSkill,
  removeSkill,
  updateSkill,
}) => {
  return (
    <div
      ref={editPanelRef}
      className="bg-white rounded-xl shadow-lg p-6 space-y-6 max-h-[900px] overflow-y-auto"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              ref={nameRef}
              type="text"
              value={resume.name}
              onChange={(e) => setResume({ ...resume, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              ref={positionRef}
              type="text"
              value={resume.position}
              onChange={(e) =>
                setResume({ ...resume, position: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              value={resume.email}
              onChange={(e) => setResume({ ...resume, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              ref={phoneRef}
              type="tel"
              value={resume.phone}
              onChange={(e) => setResume({ ...resume, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              ref={locationRef}
              type="text"
              value={resume.location}
              onChange={(e) =>
                setResume({ ...resume, location: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio/Website
            </label>
            <input
              ref={portfolioRef}
              type="text"
              value={resume.portfolio}
              onChange={(e) =>
                setResume({ ...resume, portfolio: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          {/* Summary Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Summary
            </label>
            <textarea
              ref={summaryRef}
              value={resume.summary}
              onChange={(e) =>
                setResume({ ...resume, summary: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Work Experience */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
          <button
            onClick={addExperience}
            className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-1 text-sm"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        {/* eslint-disable-next-line react-hooks/refs */}
        {resume.experiences.map((exp) => (
          <div
            key={exp.id}
            ref={getOrCreateRef(exp.id, experienceRefs)}
            className="mb-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">Experience</h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(exp.id, "company", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Location"
                value={exp.location}
                onChange={(e) =>
                  updateExperience(exp.id, "location", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, "startDate", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, "endDate", e.target.value)
                  }
                  disabled={exp.current}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm disabled:bg-gray-100"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) =>
                    updateExperience(exp.id, "current", e.target.checked)
                  }
                  className="rounded"
                />
                Currently working here
              </label>
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, "description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Education</h2>
          <button
            onClick={addEducation}
            className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-1 text-sm"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        {/* eslint-disable-next-line react-hooks/refs */}
        {resume.education.map((edu) => (
          // Attach a ref to the container of the education block
          <div
            key={edu.id}
            ref={getOrCreateRef(edu.id, educationRefs)}
            className="mb-4 p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">Education</h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(edu.id, "degree", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(edu.id, "institution", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <input
                type="text"
                placeholder="Location"
                value={edu.location}
                onChange={(e) =>
                  updateEducation(edu.id, "location", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Start Year"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "startDate", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <input
                  type="text"
                  placeholder="End Year"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "endDate", e.target.value)
                  }
                  disabled={edu.current}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm disabled:bg-gray-100"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={edu.current}
                  onChange={(e) =>
                    updateEducation(edu.id, "current", e.target.checked)
                  }
                  className="rounded"
                />
                Currently studying
              </label>
              <textarea
                placeholder="Description"
                value={edu.description}
                onChange={(e) =>
                  updateEducation(edu.id, "description", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Skills</h2>
          <button
            onClick={addSkill}
            className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-1 text-sm"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        {/* eslint-disable-next-line react-hooks/refs */}
        {resume.skills.map((skill) => (
          // Attach a ref to the container of the skill block
          <div
            key={skill.id}
            ref={getOrCreateRef(skill.id, skillRefs)}
            className="mb-3 p-3 border border-gray-200 rounded-lg flex gap-3 items-center"
          >
            <input
              type="text"
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
            <select
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorPanel;
