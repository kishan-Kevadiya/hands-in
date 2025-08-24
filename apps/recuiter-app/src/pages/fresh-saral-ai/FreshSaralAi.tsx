import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Star from "@/assets/svg/saral-ai/Star";
import ColoredLogo from "/src/assets/svg/saral-ai/logo/LogoColor.png";
import SaralPromptScreen from "../saral-ai/SaralAi";

export function PromptScreen() {
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.div
          key="prompt"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-[#ede6fb] to-[#fff1e2]"
        >
          {/* Heading */}
          <div className="flex flex-1 flex-col justify-center items-center h-[269px] w-full">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] leading-[1.1] font-extrabold text-[#3c295d] mb-8 relative inline-block">
              <span
                className="block opacity-95
                [mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)]
                [mask-size:100%_100%]
                [mask-repeat:no-repeat]"
              >
                SARAL AI
              </span>
            </h1>

            {/* Prompt Bar */}
            <div className="w-[calc(100%-2rem)] md:w-[calc(100%-2rem)] lg:w-[904px] mx-4 md:mx-4 lg:mx-auto relative p-[2px] rounded-full bg-gradient-to-r from-[#EC83BB] to-[#B664DB] shadow-md">
              <div className="flex items-center w-full bg-white rounded-full px-4 py-3 gap-2 sm:gap-4 overflow-hidden">
                <input
                  className="w-full sm:w-3/4 bg-transparent outline-none text-base h-[55px] sm:text-lg placeholder-[#A6A6A6] truncate"
                  placeholder="Type what you need. We’ll deliver who you need."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button className="flex gap-1 items-center text-[#3D1562] opacity-80 font-semibold px-3 py-2 hover:scale-105 transition text-sm sm:text-base shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                  Rephrase
                </button>

                <button className="p-2 rounded-xl w-[40px] h-[40px] bg-white/80 hover:bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
                  <img
                    src={ColoredLogo}
                    alt="coloredLogo"
                    className="aspect-square w-full"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mb-4 text-sm text-gray-500">
            Saral AI v1.0x | Powered by{" "}
            <span className="text-[#663eb7] font-semibold hover:underline cursor-pointer">
              HeadsIn
            </span>
          </footer>
        </motion.div>
      ) : (
        <motion.div
          key="saralPrompt"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          {/* ✅ pass input value here */}
          <SaralPromptScreen query={inputValue} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
