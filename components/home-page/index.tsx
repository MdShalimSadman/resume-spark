"use client";

import Image from "next/image";
import Link from "next/link";
import TypingText from "./sections/TypingText";
import { templates } from "@/data/templates";



const HomeIndex = () => {
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
        className="text-3xl md:text-5xl text-center font-semibold mt-7 
          bg-linear-to-b from-[#FE9415] via-[#FF6D23] to-[#FA332B]
          text-transparent bg-clip-text"
      >
        Spark Your Potential with Professional Resumes
      </h1>

      <TypingText />

      <h3 className="mt-18 text-2xl font-semibold text-gray-600">
        Popular templates
      </h3>
      <div className="mt-10 flex flex-col md:flex-row gap-7 items-center justify-center">
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

export default HomeIndex;
