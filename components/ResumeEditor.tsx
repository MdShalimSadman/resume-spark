"use client"

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Mail, Phone, MapPin, Globe, Plus, Trash2, Eye, Edit3 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { JSX } from 'react/jsx-runtime';

interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
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

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface ResumeData {
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

interface Block {
  element: ReactElement;
  height: number;
  isLeftColumn?: boolean;
  isRightColumn?: boolean;
}

type PageContent = ReactElement;
type PageRow = ReactElement;

const PAGE_HEIGHT = 1000;

const ResumeEditor = () => {
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [resume, setResume] = useState<ResumeData>({
    name: 'John Doe',
    position: 'Senior Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    portfolio: 'www.johndoe.dev',
    summary: 'Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.',
    experiences: [
      {
        id: uuidv4(),
        company: 'Tech Corp Inc.',
        title: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: 'Jan 2020',
        endDate: 'Present',
        current: true,
        description: 'Led development of microservices architecture serving 2M+ users. Implemented CI/CD pipelines reducing deployment time by 60%.'
      },
      {
        id: uuidv4(),
        company: 'StartUp Labs',
        title: 'Full Stack Developer',
        location: 'Austin, TX',
        startDate: 'Jun 2017',
        endDate: 'Dec 2019',
        current: false,
        description: 'Built scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver features on time.'
      }
    ],
    education: [
      {
        id: uuidv4(),
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        institution: 'Stanford University',
        location: 'Stanford, CA',
        startDate: '2013',
        endDate: '2017',
        current: false,
        description: 'GPA: 3.8/4.0. Focus on algorithms, data structures, and software engineering.'
      }
    ],
    skills: [
      { id: uuidv4(), name: 'JavaScript/TypeScript', level: 'Expert' },
      { id: uuidv4(), name: 'React & Next.js', level: 'Expert' },
      { id: uuidv4(), name: 'Node.js & Express', level: 'Advanced' },
      { id: uuidv4(), name: 'AWS & Docker', level: 'Advanced' }
    ]
  });

  const [pageContents, setPageContents] = useState<PageRow[][]>([]);

  const addExperience = () => {
    setResume(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        id: uuidv4(),
        company: '',
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }));
  };

  const removeExperience = (id: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, {
        id: uuidv4(),
        degree: '',
        field: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }));
  };

  const removeEducation = (id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, {
        id: uuidv4(),
        name: '',
        level: 'Beginner'
      }]
    }));
  };

  const removeSkill = (id: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value as Skill[typeof field] } : skill
      )
    }));
  };

  useEffect(() => {
    const splitIntoPages = () => {
      const pages: PageRow[][] = [];
      let currentPage: PageContent[] = [];
      let leftColumn: PageContent[] = [];
      let rightColumn: PageContent[] = [];
      let leftColumnHeight = 0;
      let rightColumnHeight = 0;
      let isFirstPage = true;

      const headerBlock: Block = {
        element: (
          <div key="header-block" className="mb-6 border-b-4 border-indigo-600 pb-4">
            <h1 className="text-4xl font-bold text-gray-900">{resume.name}</h1>
            <p className="text-xl text-indigo-600 mt-1">{resume.position}</p>
          </div>
        ),
        height: 120
      };

      const contactBlock: Block = {
        element: (
          <div key="contact-block" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              <div key="contact-mail" className="flex items-start gap-2">
                <Mail className="text-indigo-600 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-700">{resume.email}</span>
              </div>
              <div key="contact-phone" className="flex items-start gap-2">
                <Phone className="text-indigo-600 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-700">{resume.phone}</span>
              </div>
              <div key="contact-location" className="flex items-start gap-2">
                <MapPin className="text-indigo-600 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-700">{resume.location}</span>
              </div>
              {resume.portfolio && (
                <div key="contact-portfolio" className="flex items-start gap-2">
                  <Globe className="text-indigo-600 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-gray-700">{resume.portfolio}</span>
                </div>
              )}
            </div>
          </div>
        ),
        height: 180,
        isLeftColumn: true
      };

      const skillsHeaderBlock: Block = {
        element: (
          <div key="skills-header" className="mb-3">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-indigo-600">
              SKILLS
            </h2>
          </div>
        ),
        height: 40,
        isLeftColumn: true
      };

      const skillBlocks: Block[] = resume.skills.map(skill => ({
        element: (
          <div key={skill.id} className="mb-3">
            <p className="font-semibold text-gray-900 text-sm">{skill.name}</p>
            <p className="text-xs text-gray-600">{skill.level}</p>
          </div>
        ),
        height: 50,
        isLeftColumn: true
      }));

      const summaryBlock: Block | null = resume.summary ? {
        element: (
          <div key="summary-block" className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{resume.summary}</p>
          </div>
        ),
        height: 120,
        isRightColumn: true
      } : null;

      const experienceHeaderBlock: Block = {
        element: (
          <div key="experience-header" className="mb-3">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-indigo-600">
              WORK EXPERIENCE
            </h2>
          </div>
        ),
        height: 40,
        isRightColumn: true
      };

      const experienceBlocks: Block[] = resume.experiences.map(exp => ({
        element: (
          <div key={exp.id} className="mb-5">
            <p className="font-bold text-gray-900">{exp.company}</p>
            <p className="text-sm text-indigo-600 font-semibold">{exp.title}</p>
            <p className="text-xs text-gray-600">
              {exp.location} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
            </p>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">{exp.description}</p>
          </div>
        ),
        height: 140,
        isRightColumn: true
      }));

      const educationHeaderBlock: Block = {
        element: (
          <div key="education-header" className="mb-3">
            <h2 className="text-lg font-bold text-gray-900 pb-2 border-b-2 border-indigo-600">
              EDUCATION
            </h2>
          </div>
        ),
        height: 40,
        isRightColumn: true
      };

      const educationBlocks: Block[] = resume.education.map(edu => ({
        element: (
          <div key={edu.id} className="mb-5">
            <p className="font-bold text-gray-900">
              {edu.degree}{edu.field && ` in ${edu.field}`}
            </p>
            <p className="text-sm text-indigo-600 font-semibold">{edu.institution}</p>
            <p className="text-xs text-gray-600">
              {edu.location} | {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
            </p>
            {edu.description && (
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">{edu.description}</p>
            )}
          </div>
        ),
        height: 120,
        isRightColumn: true
      }));

      const renderContentRow = (left: PageContent[], right: PageContent[], key: string): PageRow => (
        <div key={key} className="flex gap-6">
          <div className="w-1/3 space-y-3">
            {left.map((el, i) => <span key={`left-${key}-${i}`}>{el}</span>)}
          </div>
          <div className="w-2/3 space-y-3">
            {right.map((el, i) => <span key={`right-${key}-${i}`}>{el}</span>)}
          </div>
        </div>
      );

      const finishPage = () => {
        if (leftColumn.length > 0 || rightColumn.length > 0) {
          pages.push([...currentPage, renderContentRow(leftColumn, rightColumn, `content-row-${pages.length}-${currentPage.length}`)]);
        } else if (currentPage.length > 0) {
          // If only header/full-width content exists on the last page
          pages.push([...currentPage]);
        }
        currentPage = [];
        leftColumn = [];
        rightColumn = [];
        leftColumnHeight = 0;
        rightColumnHeight = 0;
        isFirstPage = false;
      };

      const addBlock = (block: Block | null) => {
        if (!block) return;

        const { element, height, isLeftColumn, isRightColumn } = block;

        if (isLeftColumn && leftColumnHeight + height > PAGE_HEIGHT - 120) {
          if (leftColumn.length > 0 || rightColumn.length > 0) {
            currentPage.push(renderContentRow(leftColumn, rightColumn, `content-row-${pages.length}-${currentPage.length}`));
          }
          finishPage();
          leftColumn.push(element);
          leftColumnHeight = height;
          rightColumnHeight = 0;
        } else if (isRightColumn && rightColumnHeight + height > PAGE_HEIGHT - 120) {
          if (leftColumn.length > 0 || rightColumn.length > 0) {
            currentPage.push(renderContentRow(leftColumn, rightColumn, `content-row-${pages.length}-${currentPage.length}`));
          }
          finishPage();
          rightColumn.push(element);
          rightColumnHeight = height;
          leftColumnHeight = 0;
        } else {
          if (isLeftColumn) {
            leftColumn.push(element);
            leftColumnHeight += height;
          } else if (isRightColumn) {
            rightColumn.push(element);
            rightColumnHeight += height;
          } else {
            // Full width block (Header)
            currentPage.push(element);
          }
        }
      };

      if (isFirstPage) {
        addBlock(headerBlock);
      }

      addBlock(contactBlock);
      addBlock(skillsHeaderBlock);
      skillBlocks.forEach(block => addBlock(block));

      if (summaryBlock) addBlock(summaryBlock);
      if (resume.experiences.length > 0) {
        addBlock(experienceHeaderBlock);
        experienceBlocks.forEach(block => addBlock(block));
      }
      if (resume.education.length > 0) {
        addBlock(educationHeaderBlock);
        educationBlocks.forEach(block => addBlock(block));
      }

      finishPage();

      setPageContents(pages);
    };

    splitIntoPages();
  }, [resume]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Resume Editor</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                viewMode === 'edit'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Edit3 size={18} />
              Edit
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                viewMode === 'preview'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Eye size={18} />
              Preview
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {viewMode === 'edit' && (
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 max-h-[900px] overflow-y-auto">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resume.name}
                      onChange={(e) => setResume({...resume, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      value={resume.position}
                      onChange={(e) => setResume({...resume, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={resume.email}
                      onChange={(e) => setResume({...resume, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={resume.phone}
                      onChange={(e) => setResume({...resume, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={resume.location}
                      onChange={(e) => setResume({...resume, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio/Website</label>
                    <input
                      type="text"
                      value={resume.portfolio}
                      onChange={(e) => setResume({...resume, portfolio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                    <textarea
                      value={resume.summary}
                      onChange={(e) => setResume({...resume, summary: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
                  <button
                    onClick={addExperience}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1 text-sm"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
                {resume.experiences.map((exp) => (
                  <div key={exp.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
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
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm disabled:bg-gray-100"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="rounded"
                        />
                        Currently working here
                      </label>
                      <textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Education</h2>
                  <button
                    onClick={addEducation}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1 text-sm"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
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
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Start Year"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="text"
                          placeholder="End Year"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          disabled={edu.current}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm disabled:bg-gray-100"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={edu.current}
                          onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                          className="rounded"
                        />
                        Currently studying
                      </label>
                      <textarea
                        placeholder="Description"
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                  <button
                    onClick={addSkill}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1 text-sm"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
                {resume.skills.map((skill) => (
                  <div key={skill.id} className="mb-3 p-3 border border-gray-200 rounded-lg flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder="Skill Name"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
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
          )}

          <div className={viewMode === 'preview' ? 'lg:col-span-2' : ''}>
            <div className="space-y-4">
              {pageContents.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="bg-white rounded-xl shadow-xl p-8"
                  style={{ height: PAGE_HEIGHT, overflow: 'hidden' }}
                >
                  {page.map((content: PageRow, idx: number) => (
                    <div key={idx}>{content}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;