import Homeicon from "@/components/layouts/main/svgs/Homeicon";
import InfoIcon from "@/components/layouts/main/svgs/InfoIcon";
import RichTextEditor from "@/components/ui/rich-text-editor/RichTextEditor";
import { SaralInfoModal } from "@/components/ui/saral-ai-popup/info-modal/InfoModal";
import { PricingModal } from "@/components/ui/saral-ai-popup/pricing-modal/PricingModal";
import { SupportModal } from "@/components/ui/saral-ai-popup/support-modal/SupportModal";
import { DASHBOARD, LOGIN, SARAL_AI_LINKEDIN_CAMPAIGN, SARAL_AI_NEW_CHAT, SARAL_AI_RESULT, SARAL_AI_SAVED_CAMPAIGNS } from "@/routes";
import { motion } from "framer-motion";
import { use, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ColoredLogo from "/src/assets/svg/saral-ai/logo/LogoColor.png";
import LinkdinCampaign from "@/assets/svg/saral-ai/linkdin-campaign/LinkdinCampaign";
import SavedProfiles from "@/assets/svg/saral-ai/saved-profiles.tsx/SavedProfiles";
import NewChat from "@/assets/svg/saral-ai/new-chat.tsx/NewChat";
import SearchBar from "@/assets/svg/saral-ai/search-bar/SearchBar";
import RecentSearch from "@/assets/svg/saral-ai/recent-search/RecentSearch";
import SendPrompt from "@/assets/svg/saral-ai/send-prompt/SendPrompt";
import Rephrase from "@/assets/svg/saral-ai/rephrase/Rephrase";
import Support from "@/assets/svg/saral-ai/support/Support";
import CandidateCard from "@/components/ui/candidate-card/CandidateCard";
import { enhancePrompt, searchProfiles, SearchProfilesResponse } from "@/helpers/apis/saral-ai";
import RecentSearchTab from "@/components/ui/recent-search/RecentSearch";
import SavedProfilesTab from "@/components/ui/saved-profiles/SavedProfiles";
import PaginationHelper from "@/components/ui/pagination-helper/PaginationHelper";
import { set } from "zod";


export default function SaralPromptScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [results, setResults] = useState<SearchProfilesResponse | null>(null);
  const [inpValue, setInpValue] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSupportModal, setIsSupportModal] = useState(false);
  const [isLinkedinCampaign, setIsLinkedinCampaign] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  type Candidate = {
    id: number;
    name: string;
    initials: string;
    position: string;
    experience: string;
    location: string;
    profileUrl?: string;
    assessmentScore?: number;
  };

  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query;
  const data = location.state?.data;
  console.log('data', data)
  useEffect(() => {
    if (data) {
      setResults(data);
    }
  }, [data]);

  const lastPath = location.pathname.split("/").filter(Boolean).pop();


  
  useEffect(() => {

    setIsLinkedinCampaign(lastPath === "linkdin-campaign");
    setIsNewChat(lastPath === "new");
    setIsResult(lastPath === "result");
    setIsSaved(lastPath === "saved-campaigns");
  }, [location]);

    useEffect(() => {
    if (lastPath === "new") {
      setIsNewChat(true);
      setIsLinkedinCampaign(false);
      setIsSaved(false);
      setIsResult(false);
      setResults(null);
      setInpValue(null);
      setMoved(false);
    }
  }, [lastPath])

  useEffect(() => {
    if (!query) {
      navigate(location.pathname);
    }
  }, [query, navigate]);

  useEffect(() => {
    if (!results && lastPath === "result") {
      navigate(SARAL_AI_NEW_CHAT);
    }
  },[])

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  useEffect(() => {
    if (query) {
      setInpValue(query);
      fetchProfiles(query, 1);
    }
  }, [query]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ToggleSVG = () => (
    <svg
      width="27"
      height="28"
      className="h-full w-auto mt-[7px] opacity-70 hover:opacity-90 transition"
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_55_448)">
        <path
          d="M10.3684 1H8C6.34315 1 5 2.34315 5 4V16C5 17.6569 6.34314 19 8 19H10.3684M10.3684 1H19C20.6569 1 22 2.34315 22 4V16C22 17.6569 20.6569 19 19 19H10.3684M10.3684 1V19"
          stroke="#3F1462"
          strokeWidth="1.6"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_55_448"
          x="0.200195"
          y="0.199951"
          width="26.5996"
          height="27.6001"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_55_448"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_55_448"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );

  const handleEnhanceSearch = async () => {
    if (inpValue !== '' && inpValue) {
      try {
        const response = await enhancePrompt(inpValue);
        if (response.success) {
          setInpValue(response.enhanced_query);
        }
      } catch (error) {
        console.error("Error enhancing search:", error);
      }
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inpValue !== '' && inpValue) {
      e.preventDefault();

      fetchProfiles(inpValue, 1); // page 1 se start
    }
  };

  const handleOnClick = async () => {
    if (inpValue !== '' && inpValue) {
      fetchProfiles(inpValue, 1);
    }
  };

  useEffect(() => {
    console.log('results', results)
  }, [results])


  const fetchProfiles = async (query: string, page: number = 1) => {
    try {
      const response: SearchProfilesResponse = await searchProfiles(query, page);

      console.log('response', response)
      if (response.success) {
        navigate(SARAL_AI_RESULT);
        setMoved(true);
        inputRef.current?.blur();
        setResults(response);

        // Pagination states
        setCurrentPage(response.current_page);
        setTotalPages(response.total_pages);
        setHasNext(response.has_next);
        setHasPrev(response.has_prev);
        setTotalResults(response.total_results);
      }
    } catch (error) {
      console.error("Error searching profiles:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#ede6fb] to-[#fff1e2]">
      {/* Mobile Menu Button - Always show on mobile */}
      {!isOpen && (
        <button
          onClick={handleToggleSidebar}
          className="lg:hidden fixed top-5.5 left-4 z-50 text-[deepViolet] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200"
        >
          <ToggleSVG />
        </button>
      )}

      {/* Desktop Toggle Button - Only show when sidebar is collapsed */}
      {sidebarCollapsed && (
        <button
          onClick={handleToggleSidebar}
          className="hidden lg:block fixed top-4 left-4 z-50 text-[deepViolet] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200"
        >
          <ToggleSVG />
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-[#00000080] bg-opacity-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-gradient-to-b from-[#F7EEFF] to-[#FFFFFF] 
          border-r-[2px] border-[#ffffff] p-6 
          flex flex-col justify-between h-screen z-40 
          transition-all duration-300 ease-in-out
          ${
          // Mobile behavior
          isOpen
            ? "fixed top-0 left-0 translate-x-0 w-80"
            : "fixed top-0 -translate-x-full w-80"
          }
          ${
          // Desktop behavior - key changes here
          sidebarCollapsed
            ? "lg:sticky lg:top-0 lg:left-0 lg:translate-x-0 lg:w-0 lg:min-w-0 lg:overflow-hidden lg:p-0 lg:border-0"
            : "lg:sticky lg:top-0 lg:left-0 lg:translate-x-0 lg:w-[320px] lg:min-w-[320px]"
          }
        `}
      >
        {/* Only show content when not collapsed on desktop */}
        <div
          className={`${sidebarCollapsed ? "lg:hidden" : ""
            } flex-1 overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-8">
            {/* Left: Image */}
            <button className="p-2 rounded-xl w-[40px] h-[40px] bg-white/80 hover:bg-pink-50 border border-pink-200 flex items-center justify-center shrink-0">
              <img src={ColoredLogo} alt="coloredLogo" className="aspect-square w-full" />
            </button>

            {/* Right: Toggle SVG Icon - Only show on desktop when sidebar is open */}
            <div
              className="text-[deepViolet] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 lg:block hidden"
              onClick={handleToggleSidebar}
            >
              <ToggleSVG />
            </div>

            {/* Mobile: Toggle button on right side when sidebar is open */}
            <div
              className="text-[deepViolet] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 lg:hidden block"
              onClick={handleToggleSidebar}
            >
              <ToggleSVG />
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              className="rounded-xl pl-10 pr-4 py-2 bg-white/50 focus:bg-white w-full placeholder:text-[deepViolet] placeholder:font-medium border border-[#a693c4] text-[#4a3d5e] outline-none"
              placeholder="Search"
            />
            <SearchBar />
          </div>

          {/* New Chat Section */}
          <div className="mt-4">
            <button
              className="flex items-center justify-center w-full 
             bg-white/40 border border-[#a693c4] rounded-xl 
             py-3 px-4 transition-all duration-300 ease-in-out group
             hover:bg-purple-100 hover:shadow-lg hover:scale-[1]
             active:scale-95 active:bg-purple-200 active:shadow-inner"
              onClick={() => navigate(SARAL_AI_NEW_CHAT)}
            >
              <NewChat />
              <span
                className="ml-2 text-[#2d1b4a] font-medium group-hover:text-[#1f1335] 
               transition-colors duration-300 ease-in-out"
              >
                New Chat
              </span>
            </button>
          </div>

          {/* Menu */}
          <div className="mt-6 flex flex-col gap-1">
            <button className="flex items-center text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-white/60 rounded-lg transition font-medium"
              onClick={() => navigate(SARAL_AI_SAVED_CAMPAIGNS)}
            >
              {/* Saved Profiles icon */}
              <SavedProfiles />
              <span>Saved Profiles</span>
              <span
                className="ml-auto text-xs bg-[#dcd4e0] h-6x  text-base
 px-2 py-0.5 rounded-sm text-[deepViolet] font-medium"
              >
                3
              </span>
            </button>

            <button
              className="flex items-center text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-white/60 rounded-lg transition font-medium"
              onClick={() => navigate(SARAL_AI_LINKEDIN_CAMPAIGN)}
            >
              {/* LinkedIn Campaign icon */}
              <LinkdinCampaign />

              <span>LinkedIn Campaign</span>
            </button>
          </div>

          {/* Recent Searches */}
          <RecentSearchTab />
        </div>

        {/* Plan/Credits */}
        <div className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
          <div className="flex items-center justify-between mb-3 text-[#6b54a3] text-sm h-[30px] px-3 rounded-lg transition-all duration-200 font-medium hover:bg-[rgba(107,84,163,0.05)] cursor-pointer">
            <span>Credits</span>
            <span className="font-bold text-[#4a3761]">12/25</span>
          </div>

          <div className="w-full rounded-xl p-[1.5px] bg-gradient-to-r from-[#BF9CF9] to-[#FFDFA9]">
            <button
              className="w-full rounded-xl outline-none bg-white py-2 font-semibold hover:bg-white/90 transition"
              onClick={() => setIsPricingOpen(true)}
            >
              <span className="bg-gradient-to-r from-[#FFDFA9] to-[#BF9CF9] bg-clip-text text-transparent">
                Upgrade Plan
              </span>
            </button>
          </div>

          <button
            className="w-full rounded-xl outline-none py-2 mt-2 flex items-center justify-center gap-2 text-[#3F1462] text-base font-semibold hover:bg-white/20 transition"
            onClick={() => setIsSupportModal(true)}
          >
            <Support />
            Support
          </button>
        </div>
      </aside>

      <main
        className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? "lg:ml-0" : ""
          }`}
      >
        <div className="flex items-center justify-end p-4 sm:p-6 lg:px-8 pt-6 lg:pt-6">
          {/* Info Icon */}
          <button
            className="group flex outline-none items-center justify-center mx-4 w-[33px] h-[33px] bg-white hover:bg-purple-200 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => setIsInfoOpen(true)}
          >
            <InfoIcon />
          </button>

          {/* Home Section */}
          <button
            onClick={() => navigate(DASHBOARD)}
            className="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Homeicon />
            <span className="text-purple-700 font-medium group-hover:text-purple-800 text-sm sm:text-base">
              Home
            </span>
          </button>
        </div>

        {/* Centered content area */}
        {!isLinkedinCampaign && !isSaved && (
          <div className="flex-1 flex flex-col w-full items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl text-center mb-6 sm:mb-8">
              {isNewChat && !results && (
                <>
                  <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[deepViolet] mb-3 sm:mb-4 tracking-tight leading-tight">
                      What Can I Help You With?
                    </h1>
                    <p className="text-[#1F2937] opacity-40 font-medium text-sm sm:text-base lg:text-md tracking-wide px-4">
                      Describe your ideal candidate and let AI find the perfect
                      matches
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className={`w-full ${results || isResult ? 'max-w-7xl' : 'max-w-3xl'} flex flex-col items-center gap-3 sm:gap-4`}>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: moved ? -30 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="w-[full] flex flex-col sm:flex-row items-stretch sm:items-center bg-white/80 border border-[#f3cde9] rounded-2xl p-3 sm:p-4 shadow-sm gap-2 sm:gap-0">
                  <input
                    className="flex-1 min-w-0 bg-transparent outline-none text-base sm:text-lg placeholder-[#A6A6A6] truncate"
                    placeholder="when an unknown printer took a galley of type and scrambled."
                    autoFocus
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInpValue(e.target.value)}
                    value={inpValue ?? ""}
                  />

                  <div className="flex items-center gap-2 justify-end">
                    <button className="rounded-xl text-[#3D1562] opacity-70 px-3 sm:px-4 py-2 font-semibold hover:bg-[#ead1f7] transition text-xs sm:text-sm flex items-center gap-2 disabled:opacity-50 disabled:!cursor-not-allowed"
                      onClick={handleEnhanceSearch}
                      disabled={!inpValue || inpValue.trim() === ""}
                    >
                      {/* Rephrase button icon */}
                      <Rephrase />
                      Rephrase
                    </button>
                    <button
                      onClick={handleOnClick}
                      disabled={!inpValue || inpValue.trim() === ""}
                      className="rounded-2xl p-2.5 sm:p-3 from-[#de7fdf] to-[#a881fa] hover:scale-105 transition shadow-md
             disabled:opacity-50 disabled:!cursor-not-allowed"
                    >
                      {/* Send prompt button icon */}
                      <SendPrompt />
                    </button>


                  </div>
                </div>

                {/* Set result */}
                {isResult && results?.matched_profiles.length !== 0 && results?.matched_profiles && (
                  <div className="pt-3">
                    {/* Candidate Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                      {results.matched_profiles.map((profile, index) => {
                        const candidate: Candidate = {
                          id: profile.id, // unique across pages
                          name: profile.fullName,
                          initials: profile.fullName.split("")[0],
                          position: profile.headline,
                          experience: profile.experiences[0].caption,
                          location: profile.addressWithCountry,
                          profileUrl: profile.linkedinUrl,
                          assessmentScore: profile.score ?? 0,
                        };

                        return (
                          <motion.div
                            key={candidate.id}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
                            className="w-full flex justify-center"
                          >
                            <CandidateCard candidate={candidate} />
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6">
                      <PaginationHelper
                        totalItems={totalPages}
                        itemsPerPage={results?.matched_profiles.length || 10}
                        currentPage={results.current_page}
                        onPageChange={(page) => {
                          fetchProfiles(inpValue ?? "", page);
                        }}
                        hasNextPage={results.has_next}
                        hasPrevPage={results.has_prev}
                      />
                    </div>
                  </div>
                )}


              </motion.div>
            </div>
          </div>
        )}
        {isLinkedinCampaign && (
          <div className="flex-1">
            <div className="flex justify-between h-[30px] items-center px-2 sm:px-3 lg:px-4">
              <motion.h3
                className="
        text-[royalPurple] font-semibold 
        my-4 sm:my-6 lg:my-8 
        mx-4 sm:mx-8 md:mx-12 lg:mx-14
      "
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                AI message generator
              </motion.h3>

              <span className="text-xs sm:text-sm md:text-base text-purple-800 pr-2 sm:pr-4 md:pr-6 lg:pr-[35px]">
                2 Candidates Selected
              </span>
            </div>

            {/* Editor */}
            <motion.div
              className="m-2 sm:m-4 lg:m-6 sm:flex sm:justify-start sm:items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="w-full max-w-2xl">
                <RichTextEditor />
              </div>
            </motion.div>
          </div>

        )}
        {isSaved && (
          <div className="flex-1">
            <SavedProfilesTab />
          </div>
        )}
        {/* Footer */}
        <footer className="text-center p-4 sm:p-6 text-xs sm:text-[13px] text-[royalPurple] opacity-50 px-4">
          Saral AI simplifies sourcing, but human judgment is still key
        </footer>
      </main>

      <SaralInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
      <SupportModal
        isOpen={isSupportModal}
        onClose={() => setIsSupportModal(false)}
      />
    </div>
  );
}

