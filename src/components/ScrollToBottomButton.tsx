"use client";

import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

export default function ScrollToBottomButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolledFromTop = window.pageYOffset + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight > window.innerHeight) {
        if (scrolledFromTop >= documentHeight - 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    };

    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={scrollToBottom}
            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <FaArrowDown className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
