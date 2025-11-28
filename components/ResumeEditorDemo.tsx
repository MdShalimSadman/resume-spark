// ResumeEditorDemo.tsx
"use client"

import { useState } from 'react';
import ModernResumePreview from '@/components/ModernResumePreview'; // adjust path if needed
import { IResumeArray, IReference } from '@/types/resume';

// Dummy data – looks like a real senior developer resume
const dummyResume: IResumeArray = {
  name: 'Sophia Chen',
  job_position: 'Senior Frontend Engineer',
  image_url: '/images/dummy.jpg', // real-looking photo
  contact: {
    email: 'sophia.chen@example.com',
    phone: { country_code: '+1', number: '415-555-0188' },
  },
  address: 'San Francisco, California, USA',
  portfolio: 'https://sophiachen.dev',
  about_me: `Passionate and creative Frontend Engineer with 8+ years of experience building pixel-perfect, accessible web applications. Specialized in React, TypeScript, and modern UI/UX. Love turning complex problems into simple, beautiful, and intuitive designs.`,

  skills: [
    { name: 'React / Next.js', level: 'Expert', level_percentage: 95 },
    { name: 'TypeScript', level: 'Expert', level_percentage: 90 },
    { name: 'Tailwind CSS', level: 'Expert', level_percentage: 98 },
    { name: 'Node.js', level: 'Advanced', level_percentage: 80 },
    { name: 'Figma → Code', level: 'Advanced', level_percentage: 85 },
    { name: 'GraphQL', level: 'Intermediate', level_percentage: 70 },
  ],

  work_experiences: [
    {
      company_name: 'Vercel',
      job_title: 'Senior Frontend Engineer',
      city: 'San Francisco',
      country: 'USA',
      from_date: 'Jan 2023',
      to_date: '',
      current: true,
      description: `
        <ul>
          <li>Led the redesign of Vercel's marketing site using Next.js 14 and App Router</li>
          <li>Improved Lighthouse scores from 82 → 99 across all pages</li>
          <li>Built internal design system used by 40+ engineers</li>
          <li>Mentored 5 junior developers</li>
        </ul>
      `,
    },
    {
      company_name: 'Stripe',
      job_title: 'Frontend Engineer',
      city: 'Remote',
      from_date: 'Jun 2020',
      to_date: 'Dec 2022',
      current: false,
      description: `
        <ul>
          <li>Owned Payments Dashboard used by millions of merchants</li>
          <li>Reduced bundle size by 45% with code splitting and tree shaking</li>
          <li>Implemented real-time updates using WebSockets</li>
        </ul>
      `,
    },
    {
      company_name: 'Shopify',
      job_title: 'Full Stack Developer',
      city: 'Toronto',
      country: 'Canada',
      from_date: 'Mar 2018',
      to_date: 'May 2020',
      current: false,
      description: `
        <ul>
          <li>Built merchant analytics tools processing $10B+ in GMV</li>
          <li>Collaborated with designers to ship 20+ new features</li>
        </ul>
      `,
    },
  ],

  educations: [
    {
      degree: 'Bachelor of Computer Science',
      field_of_study: 'Software Engineering',
      institution_name: 'University of Waterloo',
      city: 'Waterloo',
      country: 'Canada',
      from_date: '2014',
      to_date: '2018',
      current: false,
      description: 'Graduated with Distinction • Co-op Program • Dean’s Honors List',
    },
  ],
};

const dummyReferences: IReference[] = [
  {
    id: '1',
    person_name: 'Michael Roberts',
    designation: 'Engineering Manager',
    company: 'Vercel',
    email: 'michael@vercel.com',
    phone: { country_code: '+1', number: '555-0123' },
  },
  {
    id: '2',
    person_name: 'Emma Larsson',
    designation: 'Staff Engineer',
    company: 'Stripe',
    email: 'emma@stripe.com',
  },
];

export default function ResumeEditorDemo() {
  const [resume, setResume] = useState<IResumeArray>(dummyResume);
  const [references] = useState<IReference[]>(dummyReferences);

  // Dummy focus handlers (you can replace these with real modals/inputs later)
  const noop = () => alert('Edit mode triggered!');

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Resume Preview – Modern Teal Design
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 overflow-x-auto">
          <ModernResumePreview
            resume={resume}
            references={references}
            setResume={setResume}
            focusName={noop}
            focusPosition={noop}
            focusEmail={noop}
            focusCountryCode={noop}
            focusAddress={noop}
            focusPortfolio={noop}
            focusAboutMe={noop}
            focusSkills={noop}
            focusEducation={noop}
            focusExperience={noop}
            focusReference={noop}
          />
        </div>

        <p className="text-center text-gray-500 mt-8">
          This is a live preview with dummy data. Click any field to see edit triggers.
        </p>
      </div>
    </div>
  );
}