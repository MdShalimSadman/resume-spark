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

const templates = [
  {
    id: 1,
    src: "/images/indigo-template.png",
    alt: "indigo-template",
    link: "/resume-editor",
    comingSoon: false,
  },
  {
    id: 2,
    src: "/images/template-2.png",
    alt: "template-2",
    comingSoon: true,
  },
  {
    id: 3,
    src: "/images/template-3.png",
    alt: "template-3",
    comingSoon: true,
  },
];

const Page = () => {
  return (
    <div className="min-h-full p-12 w-full flex flex-col items-center overflow-hidden">
      <Image
        src="/images/logo-black.png"
        width={250}
        height={100}
        alt="logo"
        priority
        className="mt-7"
      />

      <h1
        className="text-5xl text-center font-semibold mt-7 
          bg-linear-to-b from-[#FE9415] via-[#FF6D23] to-[#FA332B]
          text-transparent bg-clip-text"
      >
        Spark Your Potential with Professional Resumes
      </h1>

      <TypingText />

      <h3 className="mt-18 text-2xl font-semibold text-gray-600">
        Popular templates
      </h3>
      <div className="mt-10 flex gap-7 items-center justify-center">
        {templates.map((t) => (
          <div key={t.id} className="relative w-40 h-52 rounded-xl shadow-xl ">
            {t.comingSoon && (
              <span className="absolute -top-4 -right-4 z-50 bg-linear-to-r from-[#FE9415] to-[#FA332B] text-white text-xs px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            )}

            {t.link ? (
              <Link
                href={t.link}
                className="block w-full h-full hover:scale-105 transition-all duration-150"
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  priority
                  className="object-cover rounded-xl"
                />
              </Link>
            ) : (
              <Image
                src={t.src}
                alt={t.alt}
                priority
                fill
                className="object-cover rounded-xl "
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
