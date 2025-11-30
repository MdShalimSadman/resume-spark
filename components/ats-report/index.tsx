"use client";

import { useAtomValue } from "jotai";
import { atsReportAtom, atsLoadingAtom } from "@/atoms/atsAtom";
import Image from "next/image";
import AnimatedScoreCircle from "@/components/icons/AnimatedScoreCircle";
import ReportSection from "@/components/ats-report/sections/ReportSection";
import Link from "next/link";

const AtsReportIndex = () => {
  const report = useAtomValue(atsReportAtom);
  const isLoading = useAtomValue(atsLoadingAtom);

  if (isLoading) {
    return (
      <div className="text-center p-20 text-xl font-medium">
        Analyzing your resume... This may take a moment.
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center p-20 text-xl font-medium text-gray-600">
        No ATS Report found. Please go back and run the analysis.
      </div>
    );
  }

  const safeScore = Number(report.atsScore) || 0;

  const sections = [
    {
      title: "Strengths",
      items: report.strengths || [],
      icon: "✅",
      color: "border-green-500 bg-green-50",
    },
    {
      title: "Issues & Risks",
      items: report.issues || [],
      icon: "🚨",
      color: "border-red-500 bg-red-50",
    },
    {
      title: "Actionable Fixes",
      items: report.fixSuggestions || [],
      icon: "🛠️",
      color: "border-blue-500 bg-blue-50",
    },
    {
      title: "Keyword Optimization",
      items: report.keywordOptimization || [],
      icon: "🔑",
      color: "border-orange-500 bg-orange-50",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto xl:p-10">
        <div className="flex items-center justify-center w-full">
          <Link href={"/"}>
            <Image
              src="/images/logo-black.png"
              width={150}
              height={150}
              priority
              alt="logo"
              className="mb-6"
            />
          </Link>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-8 bg-linear-to-b from-[#FE9415] via-[#FF6D23] to-[#FA332B]
          text-transparent bg-clip-text">
          ATS Compatibility Report with AI Feedback
        </h1>

        <div className="text-center mb-10 p-6 bg-orange-50 rounded-xl">
          <AnimatedScoreCircle score={safeScore} />
          <p className="text-xl mt-4 font-medium text-gray-700 max-w-2xl mx-auto">
            &quot;{report.summary}&quot;
          </p>
        </div>

        <hr className="my-8 border-orange-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <ReportSection
              key={index}
              title={section.title}
              items={section.items}
              icon={section.icon}
              color={section.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AtsReportIndex;
