import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loader from "../loader/Loader";
import CandidateCard from "../candidate-card/CandidateCard";
import {
  deleteSavedProfile,
  getSavedProfiles,
  SavedProfile,
  SavedProfilesResponse,
} from "@/helpers/apis/saral-ai";
import NoCandidatesShortlisted from "../no-candidate-shortlisted/NoCandidateShortListed";
import { calculateExperience } from "@/helpers/apis/experience-counter";
import SaralLoader from "../loader/SaralLoader";
import RegenerateMessageSvg from "@/assets/svg/saral-ai/regenerate-message/RegenerateMessageSvg";
import { getAuthorizedUserId } from "@/helpers/authorization";
import { LOGIN } from "@/routes";
import { useNavigate } from "react-router";

interface SavedProfilesTabProps {
  setSavedProfileCount: Dispatch<SetStateAction<number>>;
}

const SavedProfilesTab: React.FC<SavedProfilesTabProps> = ({
  setSavedProfileCount,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [delLoading, setDelLoading] = useState(false);

  const [authorizedUserId, setAutorizedUserId] = useState<string>("");
  const X_USER_ID = authorizedUserId;
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
    }
    setAutorizedUserId(userId ?? "");
  }, []);

  const fetchProfiles = async (page: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setProfiles([]);
      }

      const res: SavedProfilesResponse = await getSavedProfiles(
        X_USER_ID,
        page,
        limit
      );

      if (append) {
        setProfiles((prev) => [...prev, ...(res.data || [])]);
      } else {
        setProfiles(res.data || []);
      }

      setCurrentPage(res.page || 1);
    } catch (error) {
      console.error("Error fetching saved profiles:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    fetchProfiles(currentPage + 1, true);
  };

  const handleDelete = async (id: number) => {
    setDelLoading(true);
    try {
      const res = await deleteSavedProfile(X_USER_ID, id);

      setProfiles((prev) => prev.filter((profile) => profile.id !== id));
      setSavedProfileCount((prev: number) => prev - 1);

      console.log("Delete response:", res.message);
    } catch (err: any) {
      console.error("Error deleting profile:", err);
    } finally {
      setDelLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader isVisible={loading} />
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <NoCandidatesShortlisted />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-between rounded-2xl p-3 sm:p-4 bg-transparent">
        <span className="text-base sm:text-lg text-[#3D1562] font-medium">
          {profiles.length} Candidates Selected
        </span>
        <div className="w-48 rounded-xl p-[1.5px] bg-gradient-to-r from-[#FFDFA9] to-[#BF9CF9]">
          <button className="w-full rounded-xl outline-none bg-[#eee7fa] py-2 font-semibold hover:bg-white/90 transition">
            <span className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
              <RegenerateMessageSvg />
              <span>Generate Message</span>
            </span>
          </button>
        </div>
      </div>

      {/* Profiles Grid - Maintains current layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 lg:grid-cols-3 gap-2 justify-items-center">
        {profiles.map((profile, i) => {
          const experienceData = JSON.parse(profile.experience || "[]");
          const overallExperience = calculateExperience(experienceData);

          const candidate = {
            id: profile.id,
            name: profile.name,
            initials: profile.name
              .split(" ")
              .map((n) => n[0])
              .join(""),
            position: profile.headline ?? "N/A",
            experience: overallExperience.formatted,
            location: profile.location ?? "Unknown",
            assessmentScore: profile.score,
            profileUrl: profile.linkedin_url ?? "",
          };

          return (
            <CandidateCard
              key={profile.id}
              candidate={candidate}
              initialSavedState={true}
              animationDelay={i * 0.1}
              maxWidth={375}
              isForSavedList={true}
              handleDelete={() => handleDelete(profile.id)}
              delLoading={delLoading}
            />
          );
        })}
      </div>

      {/* Load More Button - Fixed condition */}
      {true && (
        <div className="flex justify-center py-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8 py-2 bg-transparent rounded-xl border-2 font-semibold rounded-full hover:scale-105 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderImage: "linear-gradient(to right, #de7fdf, #a881fa) 1",
              background: "linear-gradient(to right, #a881fa, #de7fdf)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {loadingMore ? (
              <div className="flex items-center">
                <SaralLoader />
                <span className="mx-2">Loading...</span>
              </div>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedProfilesTab;
