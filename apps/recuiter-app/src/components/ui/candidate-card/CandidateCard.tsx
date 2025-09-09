import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeadScore from '../progressbar/HeadScore';
import Linkdin from '@/assets/svg/saral-ai/linkdin/Linkdin';

// Define the props interface
interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    initials: string;
    position: string;
    experience: string;
    location: string;
    assessmentScore?: number;
    profileUrl?: string;
  };
  initialSavedState?: boolean;
  onSaveToggle?: (candidateId: string, isSaved: boolean) => void;
  animationDelay?: number;
  maxWidth?: number;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  initialSavedState = false,
  onSaveToggle,
  animationDelay = 0.2,
  maxWidth = 400
}) => {
  const [isSaved, setIsSaved] = useState(initialSavedState);
  const [size, setSize] = useState(150);
  
  console.log("size", size);
  
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setSize(130);
      } else {
        setSize(150);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleSaveToggle = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    
    // Call the callback function if provided
    if (onSaveToggle) {
      onSaveToggle(candidate.id, newSavedState);
    }
  };

  const handleViewProfile = () => {
    if (candidate.profileUrl) {
      window.open(candidate.profileUrl, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="w-full mx-auto"
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <div
        className={`p-[1.5px] rounded-lg transition-all duration-300 ${
          isSaved
            ? "bg-gradient-to-r from-[#D8B4FE] to-[#FBCFE8]"
            : "bg-gradient-to-r from-[#F3E8FF] to-[#FDECF5]"
        }`}
      >
        <div
          className={`rounded-lg p-3 relative transition-all duration-300 ${
            isSaved
              ? "bg-white/50 backdrop-blur-sm"
              : "bg-gradient-to-br from-[#FFFFFF] to-[#F9EEEE]"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-[#F1DFFF] rounded-full flex items-center justify-center border border-purple-300">
                <span className="text-2xl font-bold text-purple-800">
                  {candidate.initials}
                </span>
              </div>
              <div className="ml-2">
                <h1 className="text-base font-bold text-[royalPurple] mb-0.5">
                  {candidate.name}
                </h1>
                <p className="text-xs text-[royalPurple] opacity-50">
                  {candidate.position}
                </p>
              </div>
            </div>
            <button
              onClick={handleViewProfile}
              disabled={!candidate.profileUrl}
              className={`bg-transparent border-[2px] border-[#ffffff] rounded-md px-2 py-1 transition-opacity ${
                candidate.profileUrl 
                  ? 'cursor-pointer hover:opacity-80' 
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center space-x-1">
                <span className="text-[#0077B4] text-[15px] font-medium">
                  View on
                </span>
                {/* Linkdin icon */}
               <Linkdin />
              </div>
            </button>
          </div>

          {/* Content */}
          <div
            className={`${
              isSaved ? "bg-white/70" : "bg-[#fcf9f9]"
            } backdrop-blur-sm border-[2px] border-[#ffffff] rounded-lg p-3`}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div>
                  <p className="text-[royalPurple] text-[13px] mb-0.5 opacity-50">
                    Experience
                  </p>
                  <p className="text-base opacity-90 font-bold text-[royalPurple]">
                    {candidate.experience}
                  </p>
                </div>
                <div>
                  <p className="text-[royalPurple] text-[13px] mb-0.5 opacity-50">
                    Location
                  </p>
                  <p className="text-base opacity-90 font-bold text-[royalPurple]">
                    {candidate.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-14 h-14 mb-8">
                  <HeadScore value={candidate.assessmentScore ?? 0} />
                </div>
                <p className="text-[royalPurple] text-[15px] font-semibold opacity-55">
                  Assessment score
                </p>
              </div>
            </div>

            {/* Save / Saved Button */}
            <div className="mt-3 flex justify-center">
              <button
                onClick={handleSaveToggle}
                className={`w-full max-w-[380px] rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
                  text-transparent bg-clip-text bg-gradient-to-r from-[#3F1562] to-[#DF6789]
                  ${
                    isSaved
                      ? "border-[2px] border-[#eddddd] hover:opacity-80"
                      : "border-[2px] border-[#ffffff] hover:bg-purple-50 hover:border-purple-100"
                  }`}
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function CandidateCardDemo() {
  const [isSaved, setIsSaved] = useState(false);
  const [size, setSize] = useState(150);
  console.log('size', size)
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setSize(130);
      } else {
        setSize(150);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-[400px] mx-auto"
    >
      <div
        className={`p-[1.5px] rounded-lg transition-all duration-300 ${isSaved
          ? "bg-gradient-to-r from-[#D8B4FE] to-[#FBCFE8]"
          : "bg-gradient-to-r from-[#F3E8FF] to-[#FDECF5]"
          }`}
      >
        <div
          className={`rounded-lg p-3 relative transition-all duration-300 ${isSaved
            ? "bg-white/50 backdrop-blur-sm"
            : "bg-gradient-to-br from-[#FFFFFF] to-[#F9EEEE]"
            }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-[#F1DFFF] rounded-full flex items-center justify-center border border-purple-300">
                <span className="text-2xl font-bold text-purple-800">L</span>
              </div>
              <div className="ml-2">
                <h1 className="text-base font-bold text-[royalPurple] mb-0.5">
                  Leslie A.
                </h1>
                <p className="text-xs text-[royalPurple] opacity-50">
                  Frontend Designer
                </p>
              </div>
            </div>
            <div className="bg-transparent border-[2px] border-[#ffffff] rounded-md px-2 py-1">
              <div className="flex items-center space-x-1">
                <span className="text-[#0077B4] text-[15px] font-medium">
                  View on
                </span>
                {/* Linkdin icon */}
               <Linkdin />
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`${isSaved ? "bg-white/70" : "bg-[#fcf9f9]"
              } backdrop-blur-sm border-[2px] border-[#ffffff] rounded-lg p-3`}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div>
                  <p className="text-[royalPurple] text-[13px] mb-0.5 opacity-50">
                    Experience
                  </p>
                  <p className="text-base opacity-90 font-bold text-[royalPurple]">
                    5 yrs
                  </p>
                </div>
                <div>
                  <p className="text-[royalPurple] text-[13px] mb-0.5 opacity-50">
                    Location
                  </p>
                  <p className="text-base opacity-90 font-bold text-[royalPurple]">
                    Pune, MH
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-14 h-14 mb-8">
                  <HeadScore value={Math.floor(Math.random() * 100)} />
                </div>
                <p className="text-[royalPurple] text-[15px] font-semibold opacity-55">
                  Assessment score
                </p>
              </div>
            </div>

            {/* Save / Saved Button */}
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full max-w-[380px] rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
                  text-transparent bg-clip-text bg-gradient-to-r from-[#3F1562] to-[#DF6789]
                  ${isSaved
                    ? "border-[2px] border-[#eddddd] hover:opacity-80"
                    : "border-[2px] border-[#ffffff] hover:bg-purple-50 hover:border-purple-100"
                  }`}
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default CandidateCard;