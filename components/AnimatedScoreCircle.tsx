// AnimatedScoreCircle.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

/**
 * Renders an animated SVG circle to display a score percentage.
 * The circle animates from 0% to the final score upon mount.
 */
const AnimatedScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 440;
  const numericScore = Math.max(0, Math.min(100, Number(score) || 0)); // Ensure score is between 0 and 100

  // Calculate the target offset for the final score
  const targetOffset = circumference - (numericScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center h-40 w-40 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="transparent"
          stroke="#fed7aa" // Base color (light orange)
          strokeWidth="15" // Background stroke width
        />
        
        {/* Animated Score Circle - INCREASED STROKE WIDTH HERE */}
        <motion.circle
          cx="80"
          cy="80"
          r="70"
          fill="transparent"
          stroke="#f97316" 
          strokeWidth="15" 
          strokeDasharray={circumference}
          strokeLinecap="round"
          
          // Framer Motion Animation Props
          initial={{ strokeDashoffset: circumference }} // Start at 0% score (full offset)
          animate={{ strokeDashoffset: targetOffset }} // Animate to the final score's offset
          transition={{ duration: 2.0, ease: "easeOut" }} // Custom duration and easing
        />
      </svg>
      
      {/* Score Text */}
      <div className="absolute text-center">
        <p className="text-5xl font-extrabold text-[#f97316]">{numericScore}</p>
        <p className="text-lg text-gray-500">ATS Score</p>
      </div>
    </div>
  );
};

export default AnimatedScoreCircle;