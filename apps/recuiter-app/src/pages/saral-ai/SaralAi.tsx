import Homeicon from "@/components/layouts/main/svgs/Homeicon";
import InfoIcon from "@/components/layouts/main/svgs/InfoIcon";
import HeadScore from "@/components/ui/progressbar/HeadScore";
import RichTextEditor from "@/components/ui/rich-text-editor/RichTextEditor";
import { SaralInfoModal } from "@/components/ui/saral-ai-popup/info-modal/InfoModal";
import { PricingModal } from "@/components/ui/saral-ai-popup/pricing-modal/PricingModal";
import { SupportModal } from "@/components/ui/saral-ai-popup/support-modal/SupportModal";
import { DASHBOARD } from "@/routes";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

type SaralPromptScreenProps = {
  query: string;
};

export default function SaralPromptScreen({ query }: SaralPromptScreenProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [results, setResults] = useState(true);
  const [inpValue, setInpValue] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSupportModal, setIsSupportModal] = useState(false);
  const [isTextEditor, setIsTextEditor] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const history = [
    { title: "Software Engineer", results: "234 results", time: "2h ago" },
    { title: "Data Scientist", results: "156 results", time: "4h ago" },
    { title: "Product Manager", results: "89 results", time: "1d ago" },
    { title: "UX Designer", results: "167 results", time: "2d ago" },
    { title: "DevOps Engineer", results: "203 results", time: "3d ago" },
    { title: "Frontend Developer", results: "178 results", time: "5d ago" },
  ];

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(!isOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  useEffect(() => {
    setInpValue(query);
  }, []);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setMoved(true);
      setResults(true);
      inputRef.current?.blur();
    }
  };

  const handleNewChat = () => {
    setResults(false);
    setInpValue("");
    setIsTextEditor(false)
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#ede6fb] to-[#fff1e2]">
      {/* Mobile Menu Button - Always show on mobile */}
      {!isOpen && (
        <button
          onClick={handleToggleSidebar}
          className="lg:hidden fixed top-5.5 left-4 z-50 text-[#3F1462] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200"
        >
          <ToggleSVG />
        </button>
      )}

      {/* Desktop Toggle Button - Only show when sidebar is collapsed */}
      {sidebarCollapsed && (
        <button
          onClick={handleToggleSidebar}
          className="hidden lg:block fixed top-4 left-4 z-50 text-[#3F1462] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200"
        >
          <ToggleSVG />
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-white bg-opacity-10"
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
          className={`${
            sidebarCollapsed ? "lg:hidden" : ""
          } flex-1 overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-8">
            {/* Left: Image */}
            <div className="bg-[#6f47c7] rounded-xl w-10 h-10 flex items-center justify-center">
              <img
                src="src\assets\images\main\saral-ai\icons\userIcon.png"
                alt="userIcon"
                className="h-full w-auto"
              />
            </div>

            {/* Right: Toggle SVG Icon - Only show on desktop when sidebar is open */}
            <div
              className="text-[#3F1462] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 lg:block hidden"
              onClick={handleToggleSidebar}
            >
              <ToggleSVG />
            </div>

            {/* Mobile: Toggle button on right side when sidebar is open */}
            <div
              className="text-[#3F1462] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-200 lg:hidden block"
              onClick={handleToggleSidebar}
            >
              <ToggleSVG />
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              className="rounded-xl pl-10 pr-4 py-2 bg-white/50 focus:bg-white w-full placeholder:text-[#3F1462] placeholder:font-medium border border-[#a693c4] text-[#4a3d5e] outline-none"
              placeholder="Search"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#3F1462]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* New Chat Section */}
          <div className="mt-4">
            <button
              className="flex items-center justify-center w-full 
             bg-white/40 border border-[#a693c4] rounded-xl 
             py-3 px-4 transition-all duration-300 ease-in-out group
             hover:bg-purple-100 hover:shadow-lg hover:scale-[1]
             active:scale-95 active:bg-purple-200 active:shadow-inner"
              onClick={handleNewChat}
            >
              <svg
                className="w-5 h-5 text-[#6f47c7] group-hover:text-[#5a3a9f] 
               transition-colors duration-300 ease-in-out"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
            <button className="flex items-center text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-white/60 rounded-lg transition font-medium">
              {/* Saved Profiles icon */}
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2262 10.1901C12.2217 9.37564 12.7647 8.10867 12.7647 6.8417C12.7647 4.30777 10.7738 2.31682 8.23982 2.31682C5.70588 2.31682 3.71493 4.30777 3.71493 6.8417C3.71493 8.10867 4.25792 9.37564 5.25339 10.1901C2.71946 11.3666 1 13.991 1 16.7965C1 17.3394 1.36199 17.7014 1.90498 17.7014C2.44796 17.7014 2.80995 17.3394 2.80995 16.7965C2.80995 13.81 5.25339 11.3666 8.23982 11.3666C11.2262 11.3666 13.6697 13.81 13.6697 16.7965C13.6697 17.3394 14.0317 17.7014 14.5747 17.7014C15.1176 17.7014 15.4796 17.3394 15.4796 16.7965C15.4796 13.991 13.8507 11.3666 11.2262 10.1901ZM8.23982 9.55663C6.70136 9.55663 5.52489 8.38016 5.52489 6.8417C5.52489 5.30324 6.70136 4.12677 8.23982 4.12677C9.77828 4.12677 10.9548 5.30324 10.9548 6.8417C10.9548 8.38016 9.77828 9.55663 8.23982 9.55663ZM17.1086 9.82813C18.7376 7.92768 18.5566 5.12225 16.7466 3.40279C15.9321 2.67881 14.8462 2.22632 13.7602 2.22632C13.2172 2.22632 12.8552 2.58831 12.8552 3.1313C12.8552 3.67428 13.2172 4.03627 13.7602 4.03627C15.2986 4.03627 16.4751 5.21274 16.4751 6.7512C16.4751 7.74668 15.9321 8.65166 15.1176 9.10415C14.8462 9.28514 14.6652 9.55663 14.6652 9.82813C14.6652 10.0996 14.8462 10.4616 15.1176 10.6426L15.4796 10.9141L15.5701 11.0046C17.8326 12.0906 19.19 14.353 19.19 16.7965C19.19 17.3394 19.552 17.7014 20.095 17.7014C20.638 17.7014 21 17.3394 21 16.7965C20.9095 13.991 19.4615 11.3666 17.1086 9.82813Z"
                  fill="#3F1462"
                  stroke="white"
                  strokeWidth="0.277778"
                />
              </svg>
              <span>Saved Profiles</span>
              <span
                className="ml-auto text-xs bg-[#dcd4e0] h-6x  text-base
 px-2 py-0.5 rounded-sm text-[#3F1462] font-medium"
              >
                3
              </span>
            </button>

            <button
              className="flex items-center text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-white/60 rounded-lg transition font-medium"
              onClick={() => setIsTextEditor(true)}
            >
              {/* LinkedIn Campaign icon */}
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.77713 15.1881C3.18161 15.1881 2.61401 14.8668 2.35347 14.3223L0.148195 9.77875C-0.0285991 9.41277 -0.047209 9.01108 0.0923655 8.62725C0.23194 8.25234 0.520394 7.94885 0.901897 7.77924L3.26536 6.71701C3.43329 6.64451 3.62427 6.63854 3.79677 6.70038C3.96926 6.76223 4.10934 6.8869 4.18655 7.04728L7.12692 13.1083C7.29441 13.4475 7.13622 13.8403 6.79194 14.0009L4.42848 15.0632C4.21446 15.1614 3.99114 15.206 3.76783 15.206L3.77713 15.1881ZM3.22814 8.21664L1.49741 8.99323C1.42297 9.02894 1.37645 9.14498 1.41367 9.21639L3.61895 13.7599C3.65617 13.8313 3.77713 13.876 3.85157 13.8403L5.58229 13.0637L3.22814 8.21664Z"
                  fill="#3F1462"
                />
                <path
                  d="M6.51286 14.0545C6.24302 14.0545 6.00109 13.9028 5.88012 13.6707L2.93976 7.60969C2.87974 7.48398 2.86183 7.34351 2.88849 7.20762C2.91516 7.07174 2.98508 6.94713 3.08864 6.85095L9.78821 0.602485C10.3093 0.191871 10.9327 0.0490489 11.5375 0.182945C12.1424 0.31684 12.6448 0.700675 12.9054 1.24518L17.3811 10.4483C17.6416 10.9839 17.6323 11.5998 17.3438 12.1354C17.0554 12.662 16.5529 13.0369 15.9388 13.144L8.32733 13.7332L6.64313 14.0545C6.64313 14.0545 6.55008 14.0635 6.51286 14.0635V14.0545ZM4.40994 7.4758L6.91298 12.6263L8.14123 12.3942L15.7527 11.8051C15.8643 11.7783 16.0132 11.6712 16.097 11.5105C16.1807 11.3498 16.19 11.1624 16.1063 11.0017L11.6399 1.79862C11.6 1.71817 11.5416 1.64745 11.469 1.59179C11.3965 1.53613 11.3118 1.49697 11.2212 1.47727C11.0444 1.44156 10.849 1.47727 10.7094 1.59331L4.40994 7.4758ZM14.7943 2.53951C14.7112 2.54124 14.6288 2.52603 14.5523 2.49488C14.3784 2.43445 14.2366 2.31024 14.1581 2.14956C14.0796 1.98887 14.0708 1.80485 14.1336 1.63794L14.5803 0.459663C14.6095 0.374661 14.6562 0.296148 14.7176 0.228768C14.7791 0.161387 14.854 0.106507 14.9379 0.0673728C15.0218 0.0282388 15.113 0.00564572 15.2062 0.000929824C15.2994 -0.00378607 15.3926 0.00947101 15.4803 0.0399169C15.5681 0.0703628 15.6486 0.117379 15.7171 0.178186C15.7855 0.238992 15.8406 0.312353 15.879 0.393931C15.9174 0.475509 15.9384 0.563646 15.9406 0.653131C15.9429 0.742615 15.9265 0.831629 15.8923 0.914908L15.4456 2.09319C15.3433 2.36098 15.0734 2.53058 14.7943 2.53058V2.53951ZM17.6695 5.3781C17.409 5.3781 17.1577 5.23528 17.0368 4.99426C16.9582 4.83323 16.9493 4.64888 17.0121 4.48157C17.0749 4.31427 17.2042 4.17765 17.3718 4.10163L18.5535 3.57497C18.9071 3.41429 19.3165 3.56604 19.484 3.89632C19.6515 4.23552 19.4933 4.62828 19.149 4.78896L17.9673 5.31561C17.8742 5.36025 17.7719 5.3781 17.6695 5.3781ZM19.3072 9.73417C19.2234 9.73417 19.149 9.72525 19.0653 9.68954L17.837 9.26107C17.7484 9.23302 17.6666 9.18821 17.5963 9.12928C17.5261 9.07036 17.4689 8.99852 17.4281 8.91802C17.3873 8.83752 17.3637 8.74998 17.3588 8.6606C17.3539 8.57121 17.3677 8.48178 17.3995 8.39761C17.4312 8.31344 17.4802 8.23622 17.5436 8.17054C17.607 8.10485 17.6834 8.05202 17.7685 8.01518C17.8535 7.97834 17.9454 7.95823 18.0387 7.95605C18.132 7.95386 18.2247 7.96964 18.3116 8.00245L19.5398 8.43092C19.9027 8.55589 20.0888 8.93972 19.9585 9.28785C19.8562 9.55564 19.5863 9.72525 19.3072 9.72525V9.73417Z"
                  fill="#3F1462"
                />
                <path
                  d="M7.86223 18.0001C7.61327 17.9978 7.3701 17.9278 7.16094 17.7982C6.95177 17.6687 6.78518 17.4849 6.6805 17.2682L5.09866 14.01C5.02309 13.8489 5.01686 13.6657 5.08133 13.5002C5.1458 13.3348 5.27576 13.2004 5.44294 13.1263L6.23387 12.7693C6.2897 12.7425 6.33622 12.7335 6.39205 12.7157L8.15069 12.3854C8.46706 12.3319 8.78343 12.4836 8.91369 12.7603L10.3094 15.6346C10.4583 15.9381 10.4769 16.2773 10.356 16.5897C10.235 16.9022 9.99307 17.1521 9.6767 17.2949L8.41123 17.8573C8.23443 17.9376 8.04833 17.9733 7.86223 17.9733V18.0001ZM6.65259 14.0547L7.89945 16.6255L9.00674 16.1345L7.87154 13.8047L6.65259 14.0547Z"
                  fill="#3F1462"
                />
              </svg>

              <span>LinkedIn Campaign</span>
            </button>
          </div>

          {/* Recent Searches */}
          <div className="bg-white/50 rounded-2xl border-[3px] border-[#ffffff] p-3 w-full mt-[15px] max-w-xs">
            {/* Header */}
            <h3 className="text-[#6b54a3] tracking-wide font-semibold mb-2 flex items-center gap-2">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.82514 0.25C8.01144 0.258827 6.25191 0.869066 4.82222 1.98511C3.39252 3.10115 2.37344 4.65994 1.92464 6.41725L1.37564 5.587C1.32367 5.50008 1.25463 5.42458 1.17268 5.36507C1.09074 5.30555 0.997593 5.26325 0.898858 5.24071C0.800123 5.21817 0.697845 5.21586 0.598193 5.23392C0.49854 5.25198 0.403578 5.29003 0.319032 5.34579C0.234486 5.40154 0.162108 5.47384 0.106263 5.55833C0.0504175 5.64282 0.0122618 5.73774 -0.00590345 5.83737C-0.0240687 5.937 -0.021867 6.03928 0.000568764 6.13804C0.0230045 6.2368 0.0652096 6.32999 0.124639 6.412L1.77464 8.9125C1.88925 9.07288 2.05824 9.18616 2.25014 9.23125C2.44609 9.27012 2.64948 9.23111 2.81714 9.1225L5.29214 7.45525C5.37747 7.40196 5.45122 7.33205 5.50897 7.24967C5.56673 7.16729 5.60732 7.07414 5.62834 6.97575C5.64935 6.87736 5.65035 6.77575 5.63129 6.67697C5.61222 6.57818 5.57347 6.48424 5.51735 6.40074C5.46123 6.31724 5.38889 6.24589 5.30462 6.19092C5.22035 6.13596 5.12589 6.09851 5.02685 6.08081C4.92782 6.0631 4.82623 6.06551 4.72814 6.08787C4.63005 6.11024 4.53746 6.15211 4.45589 6.211L3.33014 6.97C3.62975 5.75379 4.26519 4.64629 5.16395 3.77385C6.06272 2.90141 7.18861 2.29917 8.41319 2.03583C9.63776 1.7725 10.9117 1.85868 12.0897 2.28454C13.2676 2.7104 14.3021 3.4588 15.0752 4.44433C15.8483 5.42987 16.3288 6.61286 16.4619 7.85834C16.5949 9.10382 16.3753 10.3616 15.8279 11.4883C15.2805 12.6149 14.4274 13.565 13.3661 14.2301C12.3047 14.8952 11.0777 15.2486 9.82514 15.25C8.75139 15.2471 7.69422 14.985 6.7435 14.4859C5.79278 13.9869 4.97661 13.2656 4.36439 12.3835C4.30956 12.2993 4.23837 12.227 4.15505 12.1708C4.07173 12.1147 3.97797 12.0758 3.87935 12.0566C3.78073 12.0374 3.67925 12.0382 3.58095 12.059C3.48264 12.0797 3.38951 12.12 3.30707 12.1775C3.22464 12.2349 3.1546 12.3084 3.10109 12.3934C3.04759 12.4785 3.01172 12.5734 2.99561 12.6726C2.9795 12.7717 2.98349 12.8731 3.00733 12.9707C3.03117 13.0683 3.07438 13.1602 3.13439 13.2408C4.12969 14.6756 5.55901 15.7534 7.2123 16.3157C8.86558 16.8779 10.6556 16.895 12.3193 16.3645C13.9831 15.8339 15.4327 14.7836 16.4553 13.368C17.4778 11.9524 18.0193 10.2462 18.0001 8.5C18.0075 6.32268 17.151 4.23133 15.6184 2.68471C14.0859 1.1381 12.0024 0.2625 9.82514 0.25Z"
                  fill="#3F1462"
                />
                <path
                  d="M9.75 3.9624C9.55109 3.9624 9.36032 4.04142 9.21967 4.18207C9.07902 4.32272 9 4.51349 9 4.7124V8.4999C9.00319 8.69816 9.08177 8.88776 9.21975 9.03015L11.4698 11.3004C11.6109 11.4394 11.8008 11.5177 11.9989 11.5187C12.197 11.5197 12.3877 11.4432 12.5303 11.3057C12.6715 11.1656 12.7512 10.9752 12.7521 10.7763C12.7529 10.5775 12.6748 10.3864 12.5347 10.2452L10.5 8.19165V4.7124C10.5 4.51349 10.421 4.32272 10.2803 4.18207C10.1397 4.04142 9.94891 3.9624 9.75 3.9624Z"
                  fill="#3F1462"
                />
              </svg>
              Recent Search
            </h3>

            {/* Divider */}
            <div className="border-t border-[#e9e4f3] mb-3"></div>

            <div
              className={`overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#e1d6f2] scrollbar-track-transparent transition-all duration-300 ease-in-out`}
              style={{
                maxHeight: expanded ? "16rem" : "8rem",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {history.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white rounded-xl px-3 py-2 mb-2 shadow-sm border border-[#f0ebf8]"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#2d1b4a] truncate max-w-[130px]">
                      {item.title}
                    </span>
                    <span className="text-xs text-[#7965a8]">
                      {item.results} results
                    </span>
                  </div>
                  <span className="text-xs text-[#7965a8] whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* View More / Less */}
            {history.length > 4 && (
              <div className="text-center mt-2">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-l outline-none font-medium px-5 py-2 rounded-full bg-clip-text text-transparent bg-gradient-to-r from-[#3F1562] to-[#DF6789] border border-transparent hover:border-[#DF6789] transition-all duration-300"
                >
                  {expanded ? "View Less" : "View More"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Plan/Credits */}
        <div className={`${sidebarCollapsed ? "lg:hidden" : ""}`}>
          <div className="flex items-center justify-between mb-3 text-[#6b54a3] text-sm h-[30px] px-3 rounded-lg transition-all duration-200 font-medium hover:bg-[rgba(107,84,163,0.05)] cursor-pointer">
            <span>Credits</span>
            <span className="font-bold text-[#4a3761]">12/25</span>
          </div>

          <div className="w-full rounded-xl p-[1.5px] bg-gradient-to-r from-[#BF9CF9] to-[#FFDFA9]">
            <button
              className="w-full rounded-xl bg-white py-2 font-semibold hover:bg-white/90 transition"
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
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.28125 11.6719C4.28125 12.4485 3.65164 13.0781 2.875 13.0781C2.09836 13.0781 1.46875 12.4485 1.46875 11.6719V9.14062C1.46875 8.36399 2.09836 7.73438 2.875 7.73438C3.65164 7.73438 4.28125 8.36399 4.28125 9.14062V11.6719ZM15.5312 11.6719C15.5312 12.4485 14.9016 13.0781 14.125 13.0781C13.3484 13.0781 12.7188 12.4485 12.7188 11.6719V9.14062C12.7188 8.36399 13.3484 7.73438 14.125 7.73438C14.9016 7.73438 15.5312 8.36399 15.5312 9.14062V11.6719Z"
                stroke="#3F1462"
                stroke-width="1.17"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.46875 9.14062V7.73438C1.46875 3.85112 4.61675 0.703125 8.5 0.703125C12.3833 0.703125 15.5312 3.85112 15.5312 7.73438V9.14062M15.5312 11.6719V13.0781C15.5312 14.6314 14.2721 15.8906 12.7188 15.8906H9.90625"
                stroke="#3F1462"
                stroke-width="1.17"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.5 17.2969C9.27665 17.2969 9.90625 16.6673 9.90625 15.8906C9.90625 15.114 9.27665 14.4844 8.5 14.4844C7.72335 14.4844 7.09375 15.114 7.09375 15.8906C7.09375 16.6673 7.72335 17.2969 8.5 17.2969Z"
                stroke="#3F1462"
                stroke-width="1.17"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Support
          </button>
        </div>
      </aside>

      {!isTextEditor && (
        <main
          className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "lg:ml-0" : ""
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
          <div className="flex-1 flex flex-col w-[100%] items-center justify-center px-4 sm:px-6 lg:px-8">
            {!results && (
              <div className="text-center mb-6 sm:mb-8 max-w-3xl w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3F1462] mb-3 sm:mb-4 tracking-tight leading-tight">
                  What Can I Help You With?
                </h1>
                <p className="text-[#1F2937] opacity-40 font-medium text-sm sm:text-base lg:text-lg tracking-wide px-4">
                  Describe your ideal candidate and let AI find the perfect
                  matches
                </p>
              </div>
            )}

            <div className="w-full max-w-2xl flex flex-col items-center gap-3 sm:gap-4">
              {/* Prompt Input */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: moved ? -15 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="w-full sm:w-[780px] flex flex-col sm:flex-row items-stretch sm:items-center bg-white/80 border border-[#f3cde9] rounded-2xl p-3 sm:p-4 shadow-sm gap-2 sm:gap-0">
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
                    <button className="rounded-xl text-[#3D1562] opacity-70 px-3 sm:px-4 py-2 font-semibold hover:bg-[#ead1f7] transition text-xs sm:text-sm flex items-center gap-2">
                      <svg
                        width="26"
                        className="opacity-60"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7549 6.41619L11.4074 8.22807C11.7654 9.22136 12.3381 10.1234 13.0847 10.87C13.8313 11.6166 14.7333 12.1893 15.7266 12.5473L17.5385 13.1998C17.5743 13.2129 17.6052 13.2367 17.627 13.2679C17.6488 13.2991 17.6605 13.3363 17.6605 13.3744C17.6605 13.4125 17.6488 13.4497 17.627 13.481C17.6052 13.5122 17.5743 13.536 17.5385 13.5491L15.7266 14.2016C14.7333 14.5596 13.8313 15.1323 13.0847 15.8789C12.3381 16.6254 11.7654 17.5275 11.4074 18.5208L10.7549 20.3327C10.7418 20.3685 10.718 20.3994 10.6868 20.4212C10.6555 20.443 10.6184 20.4547 10.5803 20.4547C10.5421 20.4547 10.505 20.443 10.4737 20.4212C10.4425 20.3994 10.4187 20.3685 10.4056 20.3327L9.75313 18.5208C9.39513 17.5275 8.82243 16.6254 8.07584 15.8789C7.32926 15.1323 6.42717 14.5596 5.43388 14.2016L3.622 13.5491C3.58623 13.536 3.55534 13.5122 3.53352 13.481C3.5117 13.4497 3.5 13.4125 3.5 13.3744C3.5 13.3363 3.5117 13.2991 3.53352 13.2679C3.55534 13.2367 3.58623 13.2129 3.622 13.1998L5.43388 12.5473C6.42717 12.1893 7.32926 11.6166 8.07584 10.87C8.82243 10.1234 9.39513 9.22136 9.75313 8.22807L10.4056 6.41619C10.4183 6.38005 10.442 6.34876 10.4733 6.32662C10.5045 6.30449 10.5419 6.2926 10.5803 6.2926C10.6186 6.2926 10.656 6.30449 10.6872 6.32662C10.7185 6.34876 10.7422 6.38005 10.7549 6.41619ZM18.9108 2.062L19.2415 2.97932C19.4229 3.48223 19.713 3.93897 20.0911 4.31702C20.4691 4.69507 20.9258 4.98513 21.4288 5.16657L22.3461 5.49725C22.3642 5.50387 22.3799 5.51592 22.391 5.53176C22.4021 5.54761 22.4081 5.56648 22.4081 5.58582C22.4081 5.60516 22.4021 5.62403 22.391 5.63987C22.3799 5.65572 22.3642 5.66776 22.3461 5.67438L21.4288 6.00507C20.9258 6.1865 20.4691 6.47657 20.0911 6.85462C19.713 7.23267 19.4229 7.6894 19.2415 8.19232L18.9108 9.10963C18.9042 9.1278 18.8922 9.1435 18.8763 9.15459C18.8605 9.16569 18.8416 9.17164 18.8223 9.17164C18.8029 9.17164 18.784 9.16569 18.7682 9.15459C18.7524 9.1435 18.7403 9.1278 18.7337 9.10963L18.403 8.19232C18.2216 7.6894 17.9315 7.23267 17.5535 6.85462C17.1754 6.47657 16.7187 6.1865 16.2158 6.00507L15.2984 5.67438C15.2803 5.66776 15.2646 5.65572 15.2535 5.63987C15.2424 5.62403 15.2364 5.60516 15.2364 5.58582C15.2364 5.56648 15.2424 5.54761 15.2535 5.53176C15.2646 5.51592 15.2803 5.50387 15.2984 5.49725L16.2158 5.16657C16.7187 4.98513 17.1754 4.69507 17.5535 4.31702C17.9315 3.93897 18.2216 3.48223 18.403 2.97932L18.7337 2.062C18.7403 2.04383 18.7524 2.02813 18.7682 2.01704C18.784 2.00595 18.8029 2 18.8223 2C18.8416 2 18.8605 2.00595 18.8763 2.01704C18.8922 2.02813 18.9042 2.04383 18.9108 2.062ZM18.9108 17.6401L19.2415 18.5574C19.4229 19.0603 19.713 19.517 20.0911 19.8951C20.4691 20.2731 20.9258 20.5632 21.4288 20.7446L22.3461 21.0753C22.3642 21.0819 22.3799 21.094 22.391 21.1098C22.4021 21.1257 22.4081 21.1445 22.4081 21.1639C22.4081 21.1832 22.4021 21.2021 22.391 21.2179C22.3799 21.2338 22.3642 21.2458 22.3461 21.2524L21.4288 21.5831C20.9258 21.7646 20.4691 22.0546 20.0911 22.4327C19.713 22.8107 19.4229 23.2675 19.2415 23.7704L18.9108 24.6877C18.9042 24.7059 18.8922 24.7216 18.8763 24.7327C18.8605 24.7437 18.8416 24.7497 18.8223 24.7497C18.8029 24.7497 18.784 24.7437 18.7682 24.7327C18.7524 24.7216 18.7403 24.7059 18.7337 24.6877L18.403 23.7704C18.2216 23.2675 17.9315 22.8107 17.5535 22.4327C17.1754 22.0546 16.7187 21.7646 16.2158 21.5831L15.2984 21.2524C15.2803 21.2458 15.2646 21.2338 15.2535 21.2179C15.2424 21.2021 15.2364 21.1832 15.2364 21.1639C15.2364 21.1445 15.2424 21.1257 15.2535 21.1098C15.2646 21.094 15.2803 21.0819 15.2984 21.0753L16.2158 20.7446C16.7187 20.5632 17.1754 20.2731 17.5535 19.8951C17.9315 19.517 18.2216 19.0603 18.403 18.5574L18.7337 17.6401C18.7638 17.5572 18.8816 17.5572 18.9108 17.6401Z"
                          fill="#3D1562"
                        />
                      </svg>
                      Rephrase
                    </button>
                    <button className="rounded-2xl p-2.5 sm:p-3 from-[#de7fdf] to-[#a881fa] hover:scale-105 transition shadow-md">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.1023 11.4108C21.8241 10.9327 21.4227 10.5367 20.8664 10.2268L5.59358 3.24083C4.81429 2.83311 3.92014 2.94945 3.26262 3.54149C2.54595 4.18583 2.3064 5.23691 2.68724 6.20291L5.57551 12.5856C5.68797 12.8618 5.68797 13.1664 5.59065 13.4074L2.68724 19.8253C2.6804 19.8404 2.67355 19.8561 2.66769 19.8722C2.30151 20.8045 2.54791 21.8566 3.2812 22.4896C3.67574 22.8304 4.14945 23 4.61385 23C4.93942 23 5.26112 22.9164 5.54758 22.7502L20.9431 15.7026C21.4237 15.4308 21.8241 15.0343 22.1023 14.5577C22.381 14.0801 22.5279 13.537 22.528 12.984C22.528 12.4312 22.381 11.8882 22.1023 11.4108ZM20.3726 13.5492C20.2724 13.7208 20.1287 13.8625 20.0333 13.9212L4.71458 20.9296C4.68673 20.9424 4.63783 20.9736 4.61142 20.9883C4.59773 20.9834 4.55815 20.9521 4.5303 20.8901C4.50436 20.8329 4.48335 20.7405 4.5249 20.6212L7.43026 14.1974C7.45507 14.1357 7.47795 14.0733 7.49887 14.0101H12.9506V12.0077H7.49273C7.46918 11.9362 7.4433 11.8654 7.41512 11.7956L4.53123 5.42463C4.476 5.28334 4.50679 5.17432 4.54246 5.10786C4.57962 5.03745 4.62754 5.00862 4.71454 5.03894L19.9575 12.0088C20.1291 12.1056 20.2724 12.2478 20.3726 12.4194C20.4728 12.591 20.5256 12.7861 20.5256 12.9841C20.5256 13.1821 20.4728 13.3771 20.3726 13.5492Z"
                          fill="url(#paint0_linear_55_542)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_55_542"
                            x1="0.15484"
                            y1="1.63636"
                            x2="22.3621"
                            y2="20.3867"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#3F1562" />
                            <stop offset="1" stop-color="#DF6789" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
            {results && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center p-4 sm:p-6 text-xs sm:text-[13px] text-[#3D1562] opacity-50 px-4">
            Saral AI simplifies sourcing, but human judgment is still key
          </footer>
        </main>
      )}

    {isTextEditor && (
  <div>
    <motion.h3
      className="text-[#3D1562] font-semibold my-8 mx-14"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      AI message generator
    </motion.h3>

    <motion.div
      className="lg:m-6 sm:w-full sm:flex sm:justify-center sm:items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <RichTextEditor />
    </motion.div>
  </div>
)}

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

function CandidateCard() {
  const [isSaved, setIsSaved] = useState(false);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-[400px] mx-auto"
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
                <span className="text-2xl font-bold text-purple-800">L</span>
              </div>
              <div className="ml-2">
                <h1 className="text-base font-bold text-[#3D1562] mb-0.5">
                  Leslie A.
                </h1>
                <p className="text-xs text-[#3D1562] opacity-50">
                  Frontend Designer
                </p>
              </div>
            </div>
            <div className="bg-transparent border-[2px] border-[#ffffff] rounded-md px-2 py-1">
              <div className="flex items-center space-x-1">
                <span className="text-[#0077B4] text-[15px] font-medium">
                  View on
                </span>
                <svg
                  width="25"
                  height="16"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.42822 2C4.42822 2.37084 4.31826 2.73335 4.11223 3.04169C3.9062 3.35004 3.61337 3.59036 3.27075 3.73227C2.92814 3.87419 2.55114 3.91132 2.18743 3.83897C1.82371 3.76663 1.48962 3.58805 1.2274 3.32583C0.965175 3.0636 0.786598 2.72951 0.714251 2.36579C0.641904 2.00208 0.679035 1.62508 0.820949 1.28247C0.962863 0.939857 1.20319 0.647022 1.51153 0.440994C1.81987 0.234967 2.18238 0.125 2.55322 0.125C3.0505 0.125 3.52742 0.322544 3.87905 0.674175C4.23068 1.02581 4.42822 1.50272 4.42822 2ZM4.00322 5.125V13.4088C4.00355 13.4699 3.9918 13.5304 3.96864 13.587C3.94548 13.6435 3.91138 13.695 3.86828 13.7383C3.82519 13.7816 3.77395 13.816 3.71752 13.8395C3.66109 13.8629 3.60058 13.875 3.53947 13.875H1.56322C1.50211 13.8752 1.44157 13.8632 1.38508 13.8399C1.32859 13.8166 1.27726 13.7824 1.23405 13.7392C1.19084 13.696 1.15659 13.6446 1.13328 13.5881C1.10997 13.5317 1.09806 13.4711 1.09822 13.41V5.125C1.09822 5.00167 1.14721 4.8834 1.23442 4.7962C1.32162 4.70899 1.4399 4.66 1.56322 4.66H3.53947C3.66258 4.66033 3.78054 4.70947 3.86747 4.79664C3.9544 4.88381 4.00322 5.00189 4.00322 5.125ZM14.3332 9.4375V13.4475C14.3334 13.5037 14.3224 13.5594 14.301 13.6113C14.2796 13.6632 14.2481 13.7104 14.2084 13.7502C14.1686 13.7899 14.1215 13.8214 14.0695 13.8428C14.0176 13.8642 13.9619 13.8752 13.9057 13.875H11.7807C11.7245 13.8752 11.6689 13.8642 11.6169 13.8428C11.565 13.8214 11.5178 13.7899 11.4781 13.7502C11.4383 13.7104 11.4069 13.6632 11.3854 13.6113C11.364 13.5594 11.3531 13.5037 11.3532 13.4475V9.56125C11.3532 8.98125 11.5232 7.02125 9.83697 7.02125C8.53072 7.02125 8.26447 8.3625 8.21197 8.965V13.4475C8.21198 13.5598 8.1678 13.6676 8.08898 13.7476C8.01015 13.8276 7.90302 13.8734 7.79072 13.875H5.73822C5.68214 13.875 5.62661 13.8639 5.57482 13.8824C5.52302 13.8209 5.47597 13.7894 5.43638 13.7497C5.39678 13.71 5.36541 13.6629 5.34406 13.611C5.32271 13.5591 5.31181 13.5036 5.31197 13.4475V5.08875C5.31181 5.03267 5.32271 4.97711 5.34406 4.92525C5.36541 4.87339 5.39678 4.82625 5.43638 4.78654C5.47597 4.74682 5.52302 4.71531 5.57482 4.69382C5.62661 4.67232 5.68214 4.66125 5.73822 4.66125H7.79072C7.9041 4.66125 8.01284 4.70629 8.09301 4.78646C8.17318 4.86663 8.21822 4.97537 8.21822 5.08875V5.81125C8.70322 5.08375 9.42197 4.5225 10.9557 4.5225C14.3532 4.5225 14.3332 7.695 14.3332 9.4375Z"
                    fill="#0077B4"
                  />
                </svg>
              </div>
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
                    5 yrs
                  </p>
                </div>
                <div>
                  <p className="text-[#3D1562] text-[13px] mb-0.5 opacity-50">
                    Location
                  </p>
                  <p className="text-base opacity-90 font-bold text-[#3D1562]">
                    Pune, MH
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-14 h-14 mb-8">
                  <HeadScore value={Math.floor(Math.random() * 100)} />
                </div>
                <p className="text-[#3D1562] text-[15px] font-semibold opacity-55">
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
}
