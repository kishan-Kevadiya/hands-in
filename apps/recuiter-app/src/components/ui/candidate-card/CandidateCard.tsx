
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeadScore from "../progressbar/HeadScore";
import Linkdin from "@/assets/svg/saral-ai/linkdin/Linkdin";
import { createSavedProfile, deleteSavedProfile } from "@/helpers/apis/saral-ai";
import Delete from "@/assets/svg/saral-ai/logo/delete/Delete";

// Define the props interface
interface CandidateCardProps {
  candidate: {
    id: number;
    name: string;
    initials: string;
    position: string;
    experience: string;
    location: string;
    assessmentScore?: number;
    profileUrl?: string;
  };
  initialSavedState?: boolean;
  isForSavedList?: boolean;
  onSaveToggle?: (candidateId: number, isSaved: boolean) => void;
  animationDelay?: number;
  maxWidth?: number;
  handleDelete?: () => void;
  onSavedNotify?: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  initialSavedState = false,
  onSaveToggle,
  animationDelay = 0.2,
  maxWidth = 400,
  isForSavedList = false,
  handleDelete,
  onSavedNotify
}) => {
  const [isSaved, setIsSaved] = useState(initialSavedState);
  const [size, setSize] = useState(150);
  const [loading, setLoading] = useState(false);
  const [savedProfileId, setSavedProfileId] = useState<number | null>(null);

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

  const handleSaveToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (!isSaved) {
        // --- Save Profile ---
        const res = await createSavedProfile(candidate.id);
        // @ts-ignore
        if (res.data) {
          setSavedProfileId((res as any).id);
          setIsSaved(true);
          onSaveToggle?.(candidate.id, true);
          onSavedNotify
        }
        console.log('isSaved', isSaved)
      } else {
        // --- Unsave Profile ---
        if (!savedProfileId) {
          console.warn("No savedProfileId found for unsave");
          return;
        }
        const res = await deleteSavedProfile(candidate.id);
        if (res && (res as any).success !== false) {
          setIsSaved(false);
          setSavedProfileId(null);
          onSaveToggle?.(candidate.id, false);
        }
      }
    } catch (err) {
      console.error("Save/Unsave error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = () => {
    if (candidate.profileUrl) {
      window.open(candidate.profileUrl, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="w-full"
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
                <h1 className="text-base font-bold text-[#3D1562] mb-0.5">
                  {candidate.name}
                </h1>
                <p className="text-xs text-[#3D1562] opacity-50">
                  {candidate.position.split(" ")[0]}{" "}
                  {candidate.position.split(" ")[1]}
                </p>
              </div>
            </div>
            <div className="bg-transparent border-[2px] border-[#ffffff] rounded-md px-2 py-1">
              <button
                onClick={handleViewProfile}
                disabled={!candidate.profileUrl}
                className={`flex items-center space-x-1 transition-opacity ${
                  candidate.profileUrl
                    ? "cursor-pointer hover:opacity-80"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <span className="text-[#0077B4] text-[15px] font-medium">
                  View on
                </span>
                <Linkdin />
              </button>
            </div>
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
                  <p className="text-[#3D1562] text-[13px] mb-0.5 opacity-50">
                    Experience
                  </p>
                  <p className="text-base opacity-90 font-bold text-[#3D1562]">
                    {
                      candidate.experience.split("·")[
                        candidate.experience.split("-").length - 1
                      ]
                    }
                  </p>
                </div>
                <div>
                  <p className="text-[#3D1562] text-[13px] mb-0.5 opacity-50">
                    Location
                  </p>
                  <p className="text-sm font-medium text-[#3D1562] opacity-70">
                    {candidate.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="relative w-14 h-14 mr-6">
                    <HeadScore value={candidate.assessmentScore ?? 0} />
                  </div>
                  <span className="text-[#3D1562] text-[12px] ml-6 font-semibold opacity-55 mt-2">
                    Assessment score
                  </span>
                </div>
              </div>
            </div>

            {/* Save / Saved Button */}
            <div className="mt-3 flex justify-center">
              {isForSavedList && (
                <>
                <button
                  className={`w-full max-w-[45px] bg-white border-[2px] mr-2 border-[#eddddd] hover:opacity-80 rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
                text-transparent bg-clip-text bg-gradient-to-r from-[#3F1562] to-[#DF6789]`}
                onClick={handleDelete}
                >
                 <Delete />
                </button>
                </>
              )}
                <button
                onClick={handleSaveToggle}
                disabled={loading}
                className={`w-full max-w-[380px] rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
                text-transparent bg-clip-text bg-gradient-to-r from-[#3F1562] to-[#DF6789]
                ${
                  isSaved
                    ? "border-[2px] border-[#eddddd] hover:opacity-80"
                    : "border-[2px] border-[#ffffff] hover:bg-purple-50 hover:border-purple-100"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Processing..." : isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
