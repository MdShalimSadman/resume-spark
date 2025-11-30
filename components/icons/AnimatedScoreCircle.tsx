"use client";

import { motion } from "framer-motion";
import React from "react";

const AnimatedScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 440;
  const numericScore = Math.max(0, Math.min(100, Number(score) || 0));

  const targetOffset = circumference - (numericScore / 100) * circumference;

  const getColor = () => {
    if (numericScore >= 70) return "#22c55e"; 
    if (numericScore >= 45) return "#f97316";
    return "#ef4444"; 
  };

  const dynamicColor = getColor();

  return (
    <div className="relative flex items-center justify-center h-40 w-40 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="transparent"
          stroke="#e5e7eb" 
          strokeWidth="15"
        />

        {/* Animated Score Circle */}
        <motion.circle
          cx="80"
          cy="80"
          r="70"
          fill="transparent"
          stroke={dynamicColor} 
          strokeWidth="15"
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{ duration: 2.0, ease: "easeOut" }}
        />
      </svg>

      {/* Score Text */}
      <div className="absolute text-center">
        <p className="text-5xl font-extrabold" style={{ color: dynamicColor }}>
          {numericScore}
        </p>
        <p className="text-lg text-gray-500">ATS Score</p>
      </div>
    </div>
  );
};

export default AnimatedScoreCircle;
