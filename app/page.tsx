"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const messages = [
  "Create modern, ATS-friendly resumes that get you noticed — fast.",
  "Build polished resumes in minutes, not hours.",
  "Stand out with clean, professional templates crafted for success.",
];

const TypingText = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isNewMessage, setIsNewMessage] = useState(true);

  useEffect(() => {
    const fullText = messages[index];
    let currentIndex = 0;

    setIsNewMessage(true);

    const typingInterval = setInterval(() => {
      setDisplayed(fullText.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === fullText.length) {
        clearInterval(typingInterval);

        setTimeout(() => {
          setIndex((prev) => (prev + 1) % messages.length);
        }, 1800);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [index]);

  return (
    <motion.h2
      className="mt-5 text-xl text-gray-600 text-center"
      initial={isNewMessage ? { opacity: 0 } : false}
      animate={isNewMessage ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => setIsNewMessage(false)}
    >
      {displayed}
    </motion.h2>
  );
};

const Page = () => {
  return (
    <div className="relative min-h-screen p-12 w-full flex flex-col items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#FE9415] rounded-full blur-[140px] opacity-40 z-[-1] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#FA332B] rounded-full blur-[140px] opacity-35 z-[-1] animate-pulse" />

      <Image
        src="/images/logo-black.png"
        width={250}
        height={100}
        alt="logo"
        className="mt-12"
      />

      <h1
        className="text-5xl text-center font-semibold mt-7 
          bg-linear-to-b from-[#FE9415] via-[#FF6D23] to-[#FA332B]
          text-transparent bg-clip-text"
      >
        Spark Your Potential with Professional Resumes
      </h1>
      <TypingText />
       <div className=" mt-16 flex items-center justify-center">
        <Link href="/resume-editor" className="cursor-pointer hover:scale-105 transition-all duration-150">
       <Image
        src="/images/indigo-template.png"
        className="shadow-xl rounded-xl"
        alt="indigo-template"
        width={150}
        height={150}
       />
       </Link>
       </div>
    </div>
  );
};

export default Page;
