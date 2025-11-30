import { messages } from "@/data/messages";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    <div className="h-20">
    <motion.h2
      className="mt-5 text-xs md:text-xl text-gray-600 text-center"
      initial={isNewMessage ? { opacity: 0 } : false}
      animate={isNewMessage ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => setIsNewMessage(false)}
    >
      {displayed}
    </motion.h2>
    </div>
  );
};

export default TypingText;