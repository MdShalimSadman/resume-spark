/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, JSX, SetStateAction, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Wrench, Users } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { IReference, IResumeArray } from '@/types/resume';

const PAGE_HEIGHT = 1120; 

const ModernResumePreview = ({
  resume,
  references,
  setResume,
  focusName,
  focusPosition,
  focusEmail,
  focusCountryCode,
  focusAddress,
  focusPortfolio,
  focusAboutMe,
  focusSkills,
  focusEducation,
  focusExperience,
  focusReference,
}: {
  resume: IResumeArray;
  references: IReference[];
  setResume: Dispatch<SetStateAction<IResumeArray>>;
  focusName: () => void;
  focusPosition: () => void;
  focusEmail: () => void;
  focusCountryCode: () => void;
  focusAddress: () => void;
  focusPortfolio?: () => void;
  focusAboutMe?: () => void;
  focusSkills?: () => void;
  focusEducation?: () => void;
  focusExperience?: () => void;
  focusReference?: () => void;
}) => {
  const [pages, setPages] = useState<JSX.Element[][]>([]);

  const accentColor = 'bg-teal-600';
  const textColor = 'text-gray-800';
  const headerBg = 'bg-gradient-to-r from-teal-600 to-cyan-600';

  const handleImageError = () => {
    setResume(prev => ({ ...prev, image_url: '/images/common/dummy.jpg' }));
  };

  useEffect(() => {
    const buildPages = () => {
      const newPages: JSX.Element[][] = [];
      let currentPage: JSX.Element[] = [];
      let leftCol: JSX.Element[] = [];
      let rightCol: JSX.Element[] = [];
      let leftHeight = 0;
      let rightHeight = 0;
      let pageHeightUsed = 0;

      // Header (only on first page)
      const header = (
        <div className="flex items-center gap-8 mb-8 border-b-4 border-teal-600 pb-6">
          {resume?.image_url ? (
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={resume.image_url}
                alt={resume.name}
                fill
                className="rounded-full object-cover border-4 border-teal-100 shadow-xl"
                onError={handleImageError}
              />
            </div>
          ) : null}

          <div className="flex-1">
            <button onClick={focusName} className="block">
              <h1 className="text-5xl font-black text-teal-700 tracking-tight hover:text-teal-800 transition">
                {resume?.name || 'Your Name'}
              </h1>
            </button>
            <button onClick={focusPosition} className="block mt-2">
              <p className="text-2xl font-medium text-gray-600">{resume?.job_position || 'Your Position'}</p>
            </button>
          </div>
        </div>
      );

      // Left column fixed content
      const contactSection = (
        <><div className="mb-10">
              <div className={`${headerBg} text-white py-2 px-4 rounded-t-lg`}>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                      <Mail size={18} /> Contact
                  </h2>
              </div>
          </div><div className="bg-gray-50 p-5 rounded-b-lg border border-gray-200">
                  <button onClick={focusEmail} className="flex items-center gap-3 hover:text-teal-600 transition">
                      <Mail className="text-teal-600" size={18} />
                      <span>{resume?.contact.email || 'email@example.com'}</span>
                  </button>
                  <button onClick={focusCountryCode} className="flex items-center gap-3 mt-3 hover:text-teal-600 transition">
                      <Phone className="text-teal-600" size={18} />
                      <span>{resume?.contact.phone.country_code}{resume?.contact.phone.number}</span>
                  </button>
                  <button onClick={focusAddress} className="flex items-center gap-3 mt-3 hover:text-teal-600 transition">
                      <MapPin className="text-teal-600" size={18} />
                      <span>{resume?.address || 'City, Country'}</span>
                  </button>
                  {resume?.portfolio && (
                      <button onClick={focusPortfolio} className="flex items-center gap-3 mt-3 hover:text-teal-600 transition">
                          <Globe className="text-teal-600" size={18} />
                          <span className="truncate">{resume.portfolio}</span>
                      </button>
                  )}
              </div></>
      );

      const addBlock = (element: JSX.Element, height: number, forceNewPage = false) => {
        if (forceNewPage || pageHeightUsed + height > PAGE_HEIGHT) {
          newPages.push([...currentPage, 
            <div key="cols" className="flex gap-8 -mx-4">
              <div className="w-5/12">{leftCol}</div>
              <div className="w-7/12">{rightCol}</div>
            </div>
          ]);
          currentPage = [];
          leftCol = [];
          rightCol = [];
          leftHeight = 0;
          rightHeight = 0;
          pageHeightUsed = 0;
        }

        if (leftHeight <= rightHeight) {
          leftCol.push(element);
          leftHeight += height;
        } else {
          rightCol.push(element);
          rightHeight += height;
        }
        pageHeightUsed += height;
      };

      // First page setup
      currentPage.push(header);
      pageHeightUsed += 240;
      addBlock(contactSection, 280);

      // About Me (optional)
      if (resume?.about_me) {
        const aboutBlock = (
          <div className="mb-10">
            <div className={`${headerBg} text-white py-2 px-4 rounded-t-lg`}>
              <h2 className="text-lg font-bold text-white">Profile</h2>
            </div>
            <div className="bg-gray-50 p-5 rounded-b-lg border border-gray-200">
              <button onClick={focusAboutMe}>
                <p className="text-gray-700 leading-relaxed">{resume.about_me}</p>
              </button>
            </div>
          </div>
        );
        addBlock(aboutBlock, 200);
      }

      // Skills
      if (resume?.skills?.length > 0) {
        const skillsBlock = (
          <div className="mb-10">
            <div className={`${headerBg} text-white py-2 px-4 rounded-t-lg flex items-center gap-2`}>
              <Wrench size={18} />
              <h2 className="text-lg font-bold">Skills</h2>
            </div>
            <div className="bg-gray-50 p-5 rounded-b-lg border border-gray-200 space-y-3">
              {resume.skills.map((skill, i) => (
                <button key={i} onClick={focusSkills} className="block w-full text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all"
                      style={{ width: `${skill.level_percentage || 80}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
        addBlock(skillsBlock, 60 + resume.skills.length * 50);
      }

      // Work Experience
      resume?.work_experiences?.forEach((job, idx) => {
        const jobBlock = (
          <div key={idx} className="mb-8 last:mb-0">
            {idx === 0 && (
              <div className={`${headerBg} text-white py-2 px-4 rounded-t-lg flex items-center gap-2 mb-4`}>
                <Briefcase size={18} />
                <h2 className="text-lg font-bold">Experience</h2>
              </div>
            )}
            <div className="border-l-4 border-teal-500 pl-5">
              <h3 className="text-xl font-bold text-gray-800">{job.company_name}</h3>
              <p className="text-teal-700 font-medium">{job.job_title}</p>
              <p className="text-sm text-gray-600 mt-1">
                {job.city}{job.country && `, ${job.country}`} •{' '}
                {job.current ? 'Present' : job.to_date} ({job.from_date} – {job.current ? 'Present' : job.to_date})
              </p>
              <div
                className="mt-3 text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description || '' }}
              />
            </div>
          </div>
        );
        addBlock(jobBlock, 160 + (job.description?.split('\n').length || 3) * 20, idx > 0);
      });

      // Education
      resume?.educations?.forEach((edu, idx) => {
        const eduBlock = (
          <div key={idx} className="mb-8 last:mb-0">
            {idx === 0 && (
              <div className={`${headerBg} text-white py-2 px-4 rounded-t-lg flex items-center gap-2 mb-4`}>
                <GraduationCap size={18} />
                <h2 className="text-lg font-bold">Education</h2>
              </div>
            )}
            <div className="border-l-4 border-cyan-500 pl-5">
              <h3 className="text-xl font-bold text-gray-800">
                {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
              </h3>
              <p className="text-teal-700 font-medium">{edu.institution_name}</p>
              <p className="text-sm text-gray-600">
                {edu.city}{edu.country && `, ${edu.country}`} • {edu.from_date} – {edu.current ? 'Present' : edu.to_date}
              </p>
              {edu.description && (
                <p className="mt-3 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: edu.description }} />
              )}
            </div>
          </div>
        );
        addBlock(eduBlock, 140 + (edu.description ? 60 : 0));
      });

      // References
      if (references?.length > 0) {
        const refBlock = (
          <div>
            <div className={`${headerBg} text-white py-2 px-4 rounded-t-lg flex items-center gap-2 mb-4`}>
              <Users size={18} />
              <h2 className="text-lg font-bold">References</h2>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {references.map((ref) => (
                <div key={ref.id} className="bg-gray-50 p-4 rounded-lg border">
                  <p className="font-bold text-gray-800">{ref.person_name}</p>
                  <p className="text-sm text-gray-600">{ref.designation} at {ref.company}</p>
                  {ref.email && <p className="text-sm mt-1">Email: {ref.email}</p>}
                  {ref.phone?.number && <p className="text-sm">Phone: {ref.phone.country_code}{ref.phone.number}</p>}
                </div>
              ))}
            </div>
          </div>
        );
        addBlock(refBlock, 100 + references.length * 90);
      }

      // Push final page
      if (leftCol.length || rightCol.length || currentPage.length) {
        newPages.push([...currentPage,
          <div key="final-cols" className="flex gap-8 -mx-4">
            <div className="w-5/12">{leftCol}</div>
            <div className="w-7/12">{rightCol}</div>
          </div>
        ]);
      }

      setPages(newPages);
    };

    buildPages();
  }, [resume, references]);

  return (
    <div className="space-y-6">
      {pages.map((page, i) => (
        <div
          key={i}
          className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200"
          style={{ width: '210mm', minHeight: '297mm', padding: '1.2cm' }}
        >
          <div className="h-full flex flex-col">
            {page}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModernResumePreview;