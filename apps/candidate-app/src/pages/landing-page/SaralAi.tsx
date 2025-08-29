import { useState, useEffect } from "react";
import specification from "@/assets/images/landing-page/SaralAiSpec1.png";
import { ColoredLogo } from "@/assets/images";
import Star from "@/assets/svg/landingPage/Star";
import Homeicon from "@/assets/svg/landingPage/SaralAi/Homeicon";
import InfoIcon from "@/assets/svg/landingPage/SaralAi/InfoIcon";
import { CustomHalfCircle } from "@/assets/svg/landingPage/SaralAi/CustomAssessment";
import RichTextEditor from "./RichTextEditor";
import specificationOne from "@/assets/images/landing-page/SaralAiSpec1.png";
import specificationTwo from "@/assets/images/landing-page/SaralAiSpec2.png";
import specificationThree from "@/assets/images/landing-page/SaralAiSpec3.png";

const SaralAI = () => {
  return (
    <div>
      <HeroSection />
      {/* <PromptScreen />
      <SaralPromptScreen />
      <CandidateCard />
      <RichTextEditor  /> */}
      {/* {/* <Specification /> */}
      <PricingSection />
      <FeaturesSection />
      <FoundersSection />
      <FAQSection />
      <TryNowSection /> 
      <DemoModalCheck />
    </div>
  );
};

export default SaralAI;

function DemoModalCheck() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setIsPricingOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Pricing
      </button>

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  );
}

// function HeroSection() {
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const [hover, setHover] = useState(false);

//   return (
//     <main
//       className="
//         relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 
//         min-h-screen 
//         bg-black bg-[url('src/assets/images/landing-page/Saral-ai-frame.png')] 
//         bg-no-repeat bg-top bg-cover 
//         lg:bg-contain
//         overflow-y-auto
//         pt-20 pb-12
//       "
//     >
//       {/* Top tagline */}
//       <div className="mt-4 mb-6 sm:mt-6 sm:mb-8">
//         <p className="px-4 py-1 text-[10px] sm:text-xs font-medium tracking-wide rounded-full inline-block text-[#F1E4FB] bg-[#3F1562] border border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.2)] backdrop-blur-md">
//           the easiest way to recruit.
//         </p>
//       </div>

//       {/* Main heading */}
//       <div className="mb-10 sm:mb-12">
//         <h1 className="text-7xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
//           <span className="text-white">SARAL </span>
//           <span className="text-[#E06689]">AI</span>
//         </h1>

//         <p className="text-gray-300 text-sm sm:text-base md:text-xl max-w-xl sm:max-w-3xl mx-auto leading-relaxed px-2">
//           Saral is the fastest way to scout top Talent and send{" "}
//           <br className="hidden sm:block" />
//           AI-generated LinkedIn messages to connect instantly.
//         </p>
//       </div>

//       {/* CTA Button */}
//       <div className="mb-12 sm:mb-16">
//         <button
//           onMouseMove={(e) => {
//             const rect = e.currentTarget.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
//             setPos({ x, y });
//           }}
//           onMouseEnter={() => setHover(true)}
//           onMouseLeave={() => setHover(false)}
//           className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white text-sm sm:text-lg font-medium overflow-hidden bg-gradient-to-r from-[#4A2780] to-[#2B0F49] shadow-[0_0_10px_2px_rgba(255,255,255,0.05)] transition-all duration-300 ease-in-out"
//           style={{
//             backgroundImage: hover
//               ? `radial-gradient(circle at ${pos.x}px ${pos.y}px, hsl(${
//                   (pos.x + pos.y) % 360
//                 }, 80%, 70%, 0.1) 0%, transparent 40%), linear-gradient(to right, #4A2780, #2B0F49)`
//               : "linear-gradient(to right, #4A2780, #2B0F49)",
//           }}
//         >
//           Start with 5 Free Credits
//           {/* Subtle border glow */}
//           {hover && (
//             <span
//               className="absolute inset-0 rounded-full pointer-events-none"
//               style={{
//                 boxShadow: `0 0 15px 2px hsl(${
//                   (pos.x + pos.y) % 360
//                 }, 80%, 60%, 0.1) inset`,
//               }}
//             />
//           )}
//         </button>
//       </div>

//       {/* Bottom text */}
//       <div className="pb-6 sm:pb-0">
//         <p className="text-gray-400 text-xs sm:text-sm">
//           <span className="font-medium text-[#E06689]">98%</span>{" "}
//           <span className="text-white">Candidate Acceptance Rate</span>
//         </p>
//       </div>
//     </main>
//   );
// }



//testttt
function HeroSection() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [flip, setFlip] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const itemVariants : any = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip((prev) => !prev);
    }, flip ? 400 : 4000);

    return () => clearInterval(interval);
  }, [flip]);

  return (
    <main
      className="
        relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 
        min-h-screen 
        bg-black bg-[url('src/assets/images/landing-page/Saral-ai-frame.png')] 
        bg-no-repeat bg-top bg-cover 
        lg:bg-contain
        overflow-y-auto
        pt-20 pb-12
      "
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* Top tagline */}
        <motion.div variants={itemVariants} className="mt-4 mb-6 sm:mt-6 sm:mb-8">
          <p className="px-4 py-1 text-[10px] sm:text-xs font-medium tracking-wide rounded-full inline-block text-[#F1E4FB] bg-[#3F1562] border border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.2)] backdrop-blur-md">
            the easiest way to recruit.
          </p>
        </motion.div>

        {/* Main heading with flip animation */}
        <motion.div
          variants={itemVariants}
          animate={{ rotateY: flip ? 180 : 0 }} // Flip effect
          transition={{ duration: 0.6 }} // Duration of the flip
        >
          <h1 className="text-7xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            <span className="text-white">SARAL </span>
            <span className="text-[#E06689]">AI</span>
          </h1>
        </motion.div>
          <p className="text-gray-300 mb-10 text-sm sm:text-base md:text-xl max-w-xl sm:max-w-3xl mx-auto leading-relaxed px-2">
            Saral is the fastest way to scout top Talent and send{" "}
            <br className="hidden sm:block" />
            AI-generated LinkedIn messages to connect instantly.
          </p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
          <button
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              setPos({ x, y });
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white text-sm sm:text-lg font-medium overflow-hidden bg-gradient-to-r from-[#4A2780] to-[#2B0F49] shadow-[0_0_10px_2px_rgba(255,255,255,0.05)] transition-all duration-300 ease-in-out"
            style={{
              backgroundImage: hover
                ? `radial-gradient(circle at ${pos.x}px ${pos.y}px, hsl(${(pos.x + pos.y) % 360}, 80%, 70%, 0.1) 0%, transparent 40%), linear-gradient(to right, #4A2780, #2B0F49)`
                : "linear-gradient(to right, #4A2780, #2B0F49)",
            }}
          >
            Start with 5 Free Credits
            {/* Subtle border glow */}
            {hover && (
              <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: `0 0 15px 2px hsl(${(pos.x + pos.y) % 360}, 80%, 60%, 0.1) inset`,
                }}
              />
            )}
          </button>
        </motion.div>

        {/* Bottom text */}
        <motion.div variants={itemVariants} className="pb-6 sm:pb-0">
          <p className="text-gray-400 text-xs sm:text-sm">
            <span className="font-medium text-[#E06689]">98%</span>{" "}
            <span className="text-white">Candidate Acceptance Rate</span>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}






function Specification() {
  const SpecData = [
    {
      id: 1,
      label: "Instant Candidate Discovery",
      description: `Type what you're hiring for and let Saral AI 
instantly pull the best-matched profiles.`,
      image: specificationOne,
    },
    {
      id: 2,
      label: "Automated Personalized Outreach",
      description: `Reach out to candidates with AI-generated
LinkedIn messages tailored to each profile.`,
      image: specificationTwo,
    },
    {
      id: 3,
      label: "AI Powered Shortlisting",
      description: `No more manual screening – Saral AI scores 
and ranks candidates for the best fit.`,
      image: specificationThree,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center text-center mt-18 py-12 px-4 sm:px-6">
      {/* Heading */}
      <div className="font-manrope font-bold text-[26px] sm:text-[32px] leading-[34px] sm:leading-[40px] text-[#421F69] mb-2">
        Built for Speed. Designed for Precision
      </div>

      {/* Subtext */}
      <div className="font-manrope font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#6B5E77] mb-10 max-w-[600px]">
        Your hiring, now faster and smarter with Saral AI.
      </div>

      <div className="flex flex-col justify-center items-center text-center mt-4 sm:mt-6 lg:mt-8 py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8">
          {SpecData?.map((spec, i) => (
            <div
              key={i}
              className="flex justify-center"
              style={{ minHeight: "400px", minWidth: "260px" }}
            >
              <div className="relative w-[280px] sm:w-[360px] lg:w-[380px] h-[300px] sm:h-[340px] lg:h-[360px] rounded-[2.5rem] group cursor-pointer">
                {/* Pink box */}
                <div
                  className="
              absolute top-0 left-0 w-[280px] sm:w-[360px] lg:w-[380px] h-[300px] sm:h-[340px] lg:h-[360px] bg-[#FFC0D2]
              rounded-[2.5rem]
              z-0
              translate-y-0
              group-hover:translate-y-[105px] sm:group-hover:translate-y-[105px] lg:group-hover:translate-y-[105px]
              transition-transform duration-500 ease-in-out
              flex items-end justify-center px-3 sm:px-4 pb-3 sm:pb-4 lg:pb-5
              pointer-events-none
            "
                >
                  <p className="font-manrope opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-normal text-base sm:text-lg lg:text-[19px] leading-5 sm:leading-6 lg:leading-7 text-black text-center">
                    {spec?.description}
                  </p>
                </div>

                {/* Image box */}
                <div className="absolute top-0 left-0 w-[280px] sm:w-[360px] lg:w-[380px] h-[300px] sm:h-[340px] lg:h-[360px] rounded-[2.5rem] z-10 overflow-hidden shadow-lg">
                  <img
                    src={spec?.image}
                    alt={spec?.label}
                    className="w-full h-full object-cover rounded-[2.5rem]"
                  />
                  {/* Label */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-2">
                    <p className="font-manrope font-bold text-lg sm:text-xl lg:text-[21px] leading-5 sm:leading-6 lg:leading-7 text-white text-center">
                      {spec?.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Basic",
      description: "Best for personal use.",
      price: 1200,
      features: [
        "Employee directory",
        "Task management",
        "Calendar integration",
        "File storage",
        "Communication tools",
        "Reporting and analytics",
      ],
      highlighted: false,
    },
    {
      name: "Enterprise",
      description: "For large teams & corporations.",
      price: 2500,
      features: [
        "Advanced employee directory",
        "Project management",
        "Resource scheduling",
        "Version control",
        "Team collaboration",
        "Advanced analytics",
      ],
      highlighted: true,
    },
    {
      name: "Business",
      description: "Best for business owners.",
      price: 3500,
      features: [
        "Customizable employee directory",
        "Client project management",
        "Client meeting schedule",
        "Compliance tracking",
        "Client communication",
        "Create custom reports tailored",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="bg-white md:py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
          Plans & Pricing
        </h2>
        <p className="text-gray-600 mt-2 w-3/4 md:w-auto max-w-2xl mx-auto">
          Whether you're hiring for 1 role or 100, Saral AI adapts to your
          needs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-8 md:mx-auto md:my-0">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-[2rem] border border-gray-200 shadow-sm p-8 flex flex-col justify-between overflow-hidden ${
              plan.highlighted
                ? "text-white bg-[url('src/assets/images/landing-page/pricing/pricingFrame.png')] bg-no-repeat bg-cover bg-top "
                : "bg-white text-black"
            }`}
          >
            {/* Plan Header */}
            <div>
              <h3
                className={`text-lg font-semibold ${
                  plan.highlighted ? "text-white" : "text-gray-900"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mt-1 ${
                  plan.highlighted ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {plan.description}
              </p>
              <p className="mt-6 text-3xl font-bold">
                ₹{plan.price}
                <span className="text-base font-normal"> / per month</span>
              </p>
            </div>

            {/* Button */}
            <button
              className={`mt-6 py-2 rounded-lg border transition-colors ${
                plan.highlighted
                  ? "border-purple-300 hover:bg-purple-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              Get Started
            </button>

            {/* Divider */}
            <hr
              className={`my-6 ${
                plan.highlighted
                  ? "border-purple-600 opacity-60"
                  : "border-gray-200"
              }`}
            />

            {/* Features */}
            <div>
              <h4
                className={`font-semibold mb-3 ${
                  plan.highlighted ? "text-white" : "text-black"
                }`}
              >
                Features
              </h4>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span>✔</span>
                    <span
                      className={
                        plan.highlighted ? "text-gray-200" : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "src/assets/images/landing-page/feature/featureOne.png",
      title: "Prompt-Based Sourcing",
      description: "Simply describe what you need, AI does the rest",
    },
    {
      icon: "src/assets/images/landing-page/feature/featureTwo.png",
      title: "Structured Profiles",
      description: "Clean, organized candidate information",
    },
    {
      icon: "src/assets/images/landing-page/feature/featureThree.png",
      title: "Saved Search History",
      description: "Access your previous searches anytime",
    },
    {
      icon: "src/assets/images/landing-page/feature/featureFour.png",
      title: "Fit/Not Fit Scoring",
      description: "AI-powered compatibility assessment",
    },
    {
      icon: "src/assets/images/landing-page/feature/featureFive.png",
      title: "Filters on Searches",
      description: "Refine results with precision filters",
    },
    {
      icon: "src/assets/images/landing-page/feature/featureSix.png",
      title: "One-Click LinkedIn Outreach",
      description: "Simply describe what you need, AI does the rest",
    },
  ];
  const FeatureCardMobile = ({ icon, title, description }: any) => (
    <div className="relative w-full border border-transparent p-5 text-center flex flex-col items-center bg-white transition-all duration-300 group hover:border-gray-300">
      {/* Corner spans */}
      <span className="absolute top-0 left-0 w-2 h-2  bg-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
      <span className="absolute top-0 right-0 w-2 h-2  bg-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
      <span className="absolute bottom-0 left-0 w-2 h-2  bg-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2  bg-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>

      {/* Icon */}
      <div className="w-14 h-14 mb-3 flex items-center justify-center rounded-[18px] bg-[#3F1562] shadow-[0_4px_10px_rgba(63,21,98,0.4)]">
        <img src={icon} alt={title} className="w-9 h-9 object-contain" />
      </div>

      {/* Text */}
      <h3 className="text-[#3F1562] font-semibold text-base">{title}</h3>
      <p className="text-[#9474AE] text-sm mt-1">{description}</p>
    </div>
  );

  // ✅ Desktop card (with hover border animation)
  const FeatureCardDesktop = ({ icon, title, description }: any) => (
    <div className="relative border border-transparent p-8 text-center transition-all duration-300 group hover:border-gray-300 flex flex-col items-center">
      {/* Corner Squares */}
      <span className="absolute top-0 left-0 w-3 h-3 bg-gray-300 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
      <span className="absolute top-0 right-0 w-3 h-3 bg-gray-300 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
      <span className="absolute bottom-0 left-0 w-3 h-3 bg-gray-300 -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>

      {/* Icon */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-[20px] bg-[#3F1562] shadow-[0_4px_10px_rgba(63,21,98,0.4)]">
        <img src={icon} alt={title} className="w-10 h-10 object-contain" />
      </div>
      {/* Text */}
      <h3 className="text-[#3F1562] font-semibold text-lg">{title}</h3>
      <p className="text-[#9474AE] text-sm mt-2">{description}</p>
    </div>
  );

  return (
    <section className="py-8 sm:py-16 bg-white mt-6 sm:mt-8 mb-6">
      {/* Section header */}
      <div className="text-center mb-10 sm:mb-12 px-4">
        <h2 className="text-[20px] sm:text-5xl md:text-3.5xl font-bold text-[#3F1562]">
          Features That Matter
        </h2>
        <p className="text-[#848199] mt-2 text-sm sm:text-base">
          Why Recruiters Love Saral AI
        </p>
      </div>

      {/* Features grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 sm:gap-8">
        {features.map((f, i) => (
          <div key={i}>
            {/* Mobile version */}
            <div className="block md:hidden">
              <FeatureCardMobile {...f} />
            </div>
            {/* Desktop version */}
            <div className="hidden md:block">
              <FeatureCardDesktop {...f} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      id: "01",
      question: "What is an abroad education loan?",
      answer:
        "An abroad education loan helps students finance their studies overseas...",
    },
    {
      id: "02",
      question: "Who is eligible to apply for an abroad education loan ?",
      answer:
        "Eligibility depends on lender criteria such as admission offer, co-signer, and more...",
    },
    {
      id: "03",
      question: "How can UniCreds help me get an abroad education loan ?",
      answer:
        "UniCreds connects you with multiple lenders and helps you compare the best offers...",
    },
    {
      id: "04",
      question:
        "What expenses are covered in education loans for abroad studies ?",
      answer:
        "Abroad Education Loans generally cover tuition fees, living expenses, travel costs, examination fees, and other educational & travel expenses, depending on the lender’s policies.",
    },
    {
      id: "05",
      question:
        "What is the maximum loan amount that can be availed for studying abroad?",
      answer:
        "The maximum amount depends on the lender and your course, but can go up to 1.5 crore INR in some cases.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(3);

  return (
    <section className="lg:py-16 bg-white mb-0 lg:mb-18">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900">FAQs</h2>
        <p className="text-gray-500 mt-2">All your questions answered here</p>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`cursor-pointer rounded-2xl border border-gray-200 p-5 flex items-start gap-4 transition-all duration-300 
            ${isOpen ? "bg-purple-50 shadow-lg" : "bg-white"}`}
            >
              {/* Number Circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-purple-700 font-semibold">
                {faq.id}
              </div>

              {/* Question & Answer */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-purple-900 font-medium">
                    {faq.question}
                  </h3>
                  <span className="text-purple-700 font-bold text-lg">
                    {isOpen ? "×" : "+"}
                  </span>
                </div>
                <div
                  className={`mt-3 text-gray-600 text-sm overflow-hidden transition-all duration-500 ease-in-out
                ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TryNowSection() {
  return (
    <section
      className="
    relative w-[90vw] md:w-[75vw] mx-auto 
      h-[430px] sm:h-[500px] 
    mb-12 mt-12 
    flex flex-col items-center justify-center text-center 
    rounded-3xl overflow-hidden 
    bg-no-repeat bg-cover md:bg-center bg-top
  "
      style={{
        backgroundImage: "url('src/assets/images/landing-page/TryNow.png')",
        backgroundColor: "#050014",
      }}
    >
      <div className="h-full flex flex-col items-center justify-center text-center px-4 mb-38">
        {/* Main Heading */}
        <h1
          className="
    text-white 
    text-2xl sm:text-3xl md:text-4xl lg:text-4xl 
    font-bold 
    max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl 
    leading-snug sm:leading-snug md:leading-normal lg:leading-relaxed 
    z-10
  "
        >
          when Saral AI does it in 10 seconds & minimal cost
        </h1>

        {/* Subtext */}
        <p className="text-purple-300 mt-3 z-10 text-sm sm:text-base">
          why waste 10 days & ₹10,000 to hire ?
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 z-10">
          <button className="px-6 sm:px-8 py-3 rounded-xl border border-purple-500 text-white bg-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 hover:border-transparent transition-all duration-300 shadow-md shadow-purple-500/50 hover:shadow-xl">
            Try Now
          </button>

          <button className="text-white hover:text-purple-400 transition">
            See pricing
          </button>
        </div>
      </div>
    </section>
  );
}

function FoundersSection() {
  const audience = [
    {
      number: "01",
      title: "Hiring Manager",
      description: "tired of delays and ready to source top talent themselves.",
    },
    {
      number: "02",
      title: "Startup Founders",
      description: "who need fast, no-fuss hiring without middlemen.",
    },
    {
      number: "03",
      title: "Agencies",
      description:
        "From your application to receiving funds, our expert service guarantees a process that’s easy, seamless, and lightning-fast.",
    },
    {
      number: "04",
      title: "Recruiters",
      description:
        "Apply for multiple lenders and track live updates on your dashboard.",
    },
  ];

  const profiles = [
    {
      img: "src/assets/images/landing-page/team-member/teamMemberOne.png",
      name: "Kashyap Shah",
      role: "Recruitment Head",
      company: "Lottie Techbar",
    },
    {
      img: "src/assets/images/landing-page/team-member/teamMemberTwo.png",
      name: "Kristin D.",
      role: "Founder & CEO",
      company: "Neno Finance",
    },
    {
      img: "src/assets/images/landing-page/team-member/teamMemberThree.png",
      name: "Anuj Datta",
      role: "CTO",
      company: "Bootstrap Startup",
    },
    {
      img: "src/assets/images/landing-page/team-member/teamMemberFour.png",
      name: "John S.",
      role: "Head of People",
      company: "Sprine Systems",
    },
  ];

  return (
    <section className="bg-[#F8EFFF] py-16 px-6 md:px-12 mb-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl font-extrabold sm:text-4xl sm:font-bold md:text-5xl lg:text-6xl text-[#3F1562] mb-10 leading-tight">
            Built for founders & fast-growing teams
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-0">
            {audience.map((item) => (
              <div key={item.number}>
                <div className="text-xl sm:text-2xl font-bold text-purple-800 flex items-center flex-wrap">
                  <span className="text-[#3F1562] text-3xl sm:text-4xl mr-1">
                    {item.number}
                  </span>
                  <span className="font-semibold text-[#3F1562] text-base sm:text-lg">
                    {item.title}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[#848199] w-full sm:w-3/4 mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 sm:gap-6 px-2 sm:px-0">
          {profiles.map((profile, idx) => (
            <div
              key={idx}
              className={`flex ${
                idx % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`flex items-center bg-[#F8EFFF] rounded-2xl shadow-sm px-3 sm:px-4 py-2 sm:py-3 w-full sm:w-auto gap-3 sm:gap-4 max-w-full sm:max-w-none`}
              >
                <img
                  src={profile.img}
                  alt={profile.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="font-semibold text-[#3F1562] text-sm sm:text-base truncate">
                    {profile.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#717171] truncate">
                    {profile.role}
                  </p>
                </div>

                {/* Desktop company */}
                <span className="border border-[#DFDFDF] rounded-sm px-2 sm:px-3 py-1 text-xs text-[#9692A3] bg-[#F8EFFF] flex-shrink-0 hidden xs:inline-block">
                  {profile.company}
                </span>

                {/* Mobile company short */}
                <span className="border border-[#DFDFDF] rounded-sm px-2 py-1 text-xs text-[#9692A3] bg-[#F8EFFF] flex-shrink-0 xs:hidden">
                  {profile.company.length > 8
                    ? profile.company.substring(0, 8) + "..."
                    : profile.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromptScreen() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-[#ede6fb] to-[#fff1e2]">
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
            />

            <button className="flex gap-1 items-center text-[royalPurple] opacity-80 font-semibold px-3 py-2 hover:scale-105 transition text-sm sm:text-base shrink-0">
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
    </div>
  );
}

const history = [
  {
    title: "Senior React Developer...",
    results: "45 results",
    time: "2 hours ago",
  },
  {
    title: "Lorem Ipsum is simply dummy",
    results: "45 results",
    time: "2 hours ago",
  },
  {
    title: "Lorem Ipsum is simply dummy",
    results: "45 results",
    time: "2 hours ago",
  },
  {
    title: "Lorem Ipsum is simply dummy",
    results: "45 results",
    time: "2 hours ago",
  },
  {
    title: "Lorem Ipsum is simply dummy",
    results: "45 results",
    time: "2 hours ago",
  },
];

function SaralPromptScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [results, setResults] = useState(true);

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
          stroke="deepViolet"
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
                src="src/assets/images/landing-page/icons/userIcon.png"
                alt="userIcon"
                className="h-full w-auto"
              />
            </div>

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
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[deepViolet]"
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
              className="flex items-center justify-center w-full bg-white/40 border border-[#a693c4] rounded-xl py-3 px-4
               transition-all duration-300 ease-in-out group
               hover:bg-purple-100 hover:shadow-lg hover:scale-[1]"
            >
              <svg
                className="w-5 h-5 text-[#6f47c7] group-hover:text-[#5a3a9f] transition-colors duration-300 ease-in-out"
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
                  fill="deepViolet"
                  stroke="white"
                  strokeWidth="0.277778"
                />
              </svg>
              <span>Saved Profiles</span>
              <span
                className="ml-auto text-xs bg-[#dcd4e0] h-6x  text-base
 px-2 py-0.5 rounded-sm text-[deepViolet] font-medium"
              >
                3
              </span>
            </button>

            <button className="flex items-center text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-white/60 rounded-lg transition font-medium">
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
                  fill="deepViolet"
                />
                <path
                  d="M6.51286 14.0545C6.24302 14.0545 6.00109 13.9028 5.88012 13.6707L2.93976 7.60969C2.87974 7.48398 2.86183 7.34351 2.88849 7.20762C2.91516 7.07174 2.98508 6.94713 3.08864 6.85095L9.78821 0.602485C10.3093 0.191871 10.9327 0.0490489 11.5375 0.182945C12.1424 0.31684 12.6448 0.700675 12.9054 1.24518L17.3811 10.4483C17.6416 10.9839 17.6323 11.5998 17.3438 12.1354C17.0554 12.662 16.5529 13.0369 15.9388 13.144L8.32733 13.7332L6.64313 14.0545C6.64313 14.0545 6.55008 14.0635 6.51286 14.0635V14.0545ZM4.40994 7.4758L6.91298 12.6263L8.14123 12.3942L15.7527 11.8051C15.8643 11.7783 16.0132 11.6712 16.097 11.5105C16.1807 11.3498 16.19 11.1624 16.1063 11.0017L11.6399 1.79862C11.6 1.71817 11.5416 1.64745 11.469 1.59179C11.3965 1.53613 11.3118 1.49697 11.2212 1.47727C11.0444 1.44156 10.849 1.47727 10.7094 1.59331L4.40994 7.4758ZM14.7943 2.53951C14.7112 2.54124 14.6288 2.52603 14.5523 2.49488C14.3784 2.43445 14.2366 2.31024 14.1581 2.14956C14.0796 1.98887 14.0708 1.80485 14.1336 1.63794L14.5803 0.459663C14.6095 0.374661 14.6562 0.296148 14.7176 0.228768C14.7791 0.161387 14.854 0.106507 14.9379 0.0673728C15.0218 0.0282388 15.113 0.00564572 15.2062 0.000929824C15.2994 -0.00378607 15.3926 0.00947101 15.4803 0.0399169C15.5681 0.0703628 15.6486 0.117379 15.7171 0.178186C15.7855 0.238992 15.8406 0.312353 15.879 0.393931C15.9174 0.475509 15.9384 0.563646 15.9406 0.653131C15.9429 0.742615 15.9265 0.831629 15.8923 0.914908L15.4456 2.09319C15.3433 2.36098 15.0734 2.53058 14.7943 2.53058V2.53951ZM17.6695 5.3781C17.409 5.3781 17.1577 5.23528 17.0368 4.99426C16.9582 4.83323 16.9493 4.64888 17.0121 4.48157C17.0749 4.31427 17.2042 4.17765 17.3718 4.10163L18.5535 3.57497C18.9071 3.41429 19.3165 3.56604 19.484 3.89632C19.6515 4.23552 19.4933 4.62828 19.149 4.78896L17.9673 5.31561C17.8742 5.36025 17.7719 5.3781 17.6695 5.3781ZM19.3072 9.73417C19.2234 9.73417 19.149 9.72525 19.0653 9.68954L17.837 9.26107C17.7484 9.23302 17.6666 9.18821 17.5963 9.12928C17.5261 9.07036 17.4689 8.99852 17.4281 8.91802C17.3873 8.83752 17.3637 8.74998 17.3588 8.6606C17.3539 8.57121 17.3677 8.48178 17.3995 8.39761C17.4312 8.31344 17.4802 8.23622 17.5436 8.17054C17.607 8.10485 17.6834 8.05202 17.7685 8.01518C17.8535 7.97834 17.9454 7.95823 18.0387 7.95605C18.132 7.95386 18.2247 7.96964 18.3116 8.00245L19.5398 8.43092C19.9027 8.55589 20.0888 8.93972 19.9585 9.28785C19.8562 9.55564 19.5863 9.72525 19.3072 9.72525V9.73417Z"
                  fill="deepViolet"
                />
                <path
                  d="M7.86223 18.0001C7.61327 17.9978 7.3701 17.9278 7.16094 17.7982C6.95177 17.6687 6.78518 17.4849 6.6805 17.2682L5.09866 14.01C5.02309 13.8489 5.01686 13.6657 5.08133 13.5002C5.1458 13.3348 5.27576 13.2004 5.44294 13.1263L6.23387 12.7693C6.2897 12.7425 6.33622 12.7335 6.39205 12.7157L8.15069 12.3854C8.46706 12.3319 8.78343 12.4836 8.91369 12.7603L10.3094 15.6346C10.4583 15.9381 10.4769 16.2773 10.356 16.5897C10.235 16.9022 9.99307 17.1521 9.6767 17.2949L8.41123 17.8573C8.23443 17.9376 8.04833 17.9733 7.86223 17.9733V18.0001ZM6.65259 14.0547L7.89945 16.6255L9.00674 16.1345L7.87154 13.8047L6.65259 14.0547Z"
                  fill="deepViolet"
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
                  fill="deepViolet"
                />
                <path
                  d="M9.75 3.9624C9.55109 3.9624 9.36032 4.04142 9.21967 4.18207C9.07902 4.32272 9 4.51349 9 4.7124V8.4999C9.00319 8.69816 9.08177 8.88776 9.21975 9.03015L11.4698 11.3004C11.6109 11.4394 11.8008 11.5177 11.9989 11.5187C12.197 11.5197 12.3877 11.4432 12.5303 11.3057C12.6715 11.1656 12.7512 10.9752 12.7521 10.7763C12.7529 10.5775 12.6748 10.3864 12.5347 10.2452L10.5 8.19165V4.7124C10.5 4.51349 10.421 4.32272 10.2803 4.18207C10.1397 4.04142 9.94891 3.9624 9.75 3.9624Z"
                  fill="deepViolet"
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
                  className="text-l font-medium px-5 py-2 rounded-full bg-clip-text text-transparent bg-gradient-to-r from-[#3F1562] to-[#DF6789] border border-transparent hover:border-[#DF6789] transition-all duration-300"
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

          <div className="w-full rounded-xl p-[1.5px] bg-gradient-to-r from-[#BF9CF9] to-[peach]">
            <button className="w-full rounded-xl bg-white py-2 font-semibold hover:bg-white/90 transition">
              <span className="bg-gradient-to-r from-[peach] to-[#BF9CF9] bg-clip-text text-transparent">
                Upgrade Plan
              </span>
            </button>
          </div>

          <button className="w-full rounded-xl py-2 mt-2 flex items-center justify-center gap-2 text-[deepViolet] text-base font-semibold hover:bg-white/20 transition">
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.28125 11.6719C4.28125 12.4485 3.65164 13.0781 2.875 13.0781C2.09836 13.0781 1.46875 12.4485 1.46875 11.6719V9.14062C1.46875 8.36399 2.09836 7.73438 2.875 7.73438C3.65164 7.73438 4.28125 8.36399 4.28125 9.14062V11.6719ZM15.5312 11.6719C15.5312 12.4485 14.9016 13.0781 14.125 13.0781C13.3484 13.0781 12.7188 12.4485 12.7188 11.6719V9.14062C12.7188 8.36399 13.3484 7.73438 14.125 7.73438C14.9016 7.73438 15.5312 8.36399 15.5312 9.14062V11.6719Z"
                stroke="deepViolet"
                stroke-width="1.17"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.46875 9.14062V7.73438C1.46875 3.85112 4.61675 0.703125 8.5 0.703125C12.3833 0.703125 15.5312 3.85112 15.5312 7.73438V9.14062M15.5312 11.6719V13.0781C15.5312 14.6314 14.2721 15.8906 12.7188 15.8906H9.90625"
                stroke="deepViolet"
                stroke-width="1.17"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.5 17.2969C9.27665 17.2969 9.90625 16.6673 9.90625 15.8906C9.90625 15.114 9.27665 14.4844 8.5 14.4844C7.72335 14.4844 7.09375 15.114 7.09375 15.8906C7.09375 16.6673 7.72335 17.2969 8.5 17.2969Z"
                stroke="deepViolet"
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

      {/* Main content */}
      <main
        className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-0" : ""
        }`}
      >
        <div className="flex items-center justify-end p-4 sm:p-6 lg:px-8 pt-6 lg:pt-6">
          {/* Info Icon */}
          <button className="group flex items-center justify-center mx-4 w-[33px] h-[33px] bg-white hover:bg-purple-200 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
            <InfoIcon />
          </button>

          {/* Home Section */}
          <button className="group flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[deepViolet] mb-3 sm:mb-4 tracking-tight leading-tight">
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
            <div className="w-full sm:w-[780px] flex flex-col sm:flex-row items-stretch sm:items-center bg-white/80 border border-[#f3cde9] rounded-2xl p-3 sm:p-4 shadow-sm gap-2 sm:gap-0">
              <input
                className="flex-1 min-w-0 bg-transparent outline-none text-base sm:text-lg placeholder-[#A6A6A6] truncate"
                placeholder="when an unknown printer took a galley of type and scrambled."
                autoFocus
              />
              <div className="flex items-center gap-2 justify-end">
                <button className="rounded-xl text-[royalPurple] opacity-70 px-3 sm:px-4 py-2 font-semibold hover:bg-[#ead1f7] transition text-xs sm:text-sm flex items-center gap-2">
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
                      fill="royalPurple"
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
        <footer className="text-center p-4 sm:p-6 text-xs sm:text-[13px] text-[royalPurple] opacity-50 px-4">
          Saral AI simplifies sourcing, but human judgment is still key
        </footer>
      </main>
    </div>
  );
}

function CandidateCard() {
  const [isSaved, setIsSaved] = useState(false);
  const [size, setSize] = useState(150);

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
                  <CustomHalfCircle percentage={100} size={size} />
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

import { motion, AnimatePresence } from "framer-motion";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full" | "xl";
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  "2xl": "max-w-4xl", // wider
  full: "max-w-[80vw]", // take 90% of screen width
};

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "md",
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-[#D4B062]/20 to-[#3F1562]/20 bg-transparent backdrop-blur-sm px-2 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative w-full ${sizeClasses[size]} bg-white/80 rounded-2xl border-[2px] border-[#3d156236] p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto`}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Plan = {
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  credits: string;
  profiles: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Lorem",
    price: "₹0",
    credits: "450",
    profiles: "450",
    features: [
      "Lorem Ipsum is simply",
      "Lorem Ipsum is simply",
      "Reachout Score (Fit / Not Fit indicator)",
    ],
  },
  {
    name: "Standard",
    price: "₹2,249",
    oldPrice: "₹3000",
    discount: "25% OFF",
    credits: "450",
    profiles: "450",
    features: [
      "All Free features",
      "Unlimited saved search history",
      "Filters on saved searches",
      "Reachout Score (Fit / Not Fit indicator)",
      "HeadScore AI match via natural language prompts",
      "Flexible credit allocation (5 or 10 per prompt)",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: "₹5,499",
    credits: "1000",
    profiles: "1000",
    features: [
      "All Standard features",
      "Dedicated support (2-hour SLA)",
      "AI-generated LinkedIn message templates",
      "Priority profile delivery",
      "Early access to upcoming AI features",
    ],
  },
];

function PricingModal({ isOpen, onClose }: PricingModalProps) {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="full">
      {/* Header */}
      <div className="text-center pt-2 sm:pt-4 pb-2 sm:pb-4 mb-2 sm:mb-4 px-2 sm:px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#3F1562] mb-1 sm:mb-2">
          Upgrade Your Plan
        </h2>
        <p className="text-[royalPurple]/50 text-xs sm:text-sm md:text-base">
          Choose the perfect plan for your recruiting needs
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-3 md:px-4 lg:px-6 pb-3 sm:pb-4 md:pb-6">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`
              relative rounded-lg md:rounded-xl p-3 sm:p-4 lg:p-5 transition-all
              ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-[#3F1562]/50 shadow-lg sm:scale-105"
                  : "bg-white border border-gray-200 hover:shadow-lg"
              }
            `}
          >
            {/* Most Popular Badge */}
            <div className="h-[85%] sm:h-[90%] flex items-center flex-col justify-center">
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#3F1562] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-2 sm:mb-3 mt-1 sm:mt-2">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#3F1562]">
                  {plan.price}{" "}
                  <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-normal text-[royalPurple]/40">
                    /month
                  </span>
                </div>
                {plan.oldPrice && plan.discount && (
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mt-1">
                    <span className="text-[royalPurple]/40 line-through text-xs sm:text-sm">
                      {plan.oldPrice}
                    </span>
                    <span className="bg-gradient-to-r from-[peach]/60 to-[#BF9CF9]/80 rounded-2xl text-white px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold">
                      {plan.discount}
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Credits */}
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#3F1562] mb-0.5 sm:mb-1">
                {plan.name}
              </h3>
              <p className="text-[royalPurple]/50 mb-3 sm:mb-4 text-[10px] sm:text-xs md:text-sm">
                {plan.credits} credits → {plan.profiles} profiles
              </p>

              {/* Features */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <span className="mr-1.5 sm:mr-2 mt-1 flex-shrink-0 text-sm">
                      <svg
                        width="11"
                        height="8"
                        viewBox="0 0 13 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="sm:w-[13px] sm:h-[10px]"
                      >
                        <path
                          d="M11.9391 1.43858L5.96981 9.64444C5.82745 9.83578 5.61517 9.96115 5.38066 9.99238C5.14616 1.0236 4.9091 9.95808 4.72276 9.81052L0.460123 6.35821C0.0839729 6.05328 0.023065 5.4972 0.324082 5.11616C0.625098 4.73512 1.17405 4.67342 1.5502 4.97835L5.10472 7.8591L10.5351 0.393523C10.7131 0.122841 11.0236 -0.0268124 11.3433 0.00397824C11.663 0.0347689 11.9401 0.241022 12.0646 0.540849C12.1891 0.840676 12.1409 1.18556 11.9391 1.43858Z"
                          fill="#C55A83"
                        />
                      </svg>
                    </span>
                    <span className="text-[royalPurple] font-semibold text-[10px] sm:text-xs md:text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button className="w-full px-4 sm:px-6 py-2 sm:py-2 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-r from-yellow-800 via-purple-800 to-pink-500 bg-clip-text text-transparent border-[2px] border-[#3d156236] transition duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] hover:border-purple-50">
                Choose plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </CommonModal>
  );
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const planItems = [
    {
      title: "Standard Plan (1 Month)",
      description: "• 450 Credits → Access 450 Profiles",
      price: "₹3,000",
    },
    {
      title: "Plan Discount (13%)",
      price: "-₹750.99",
    },
    {
      title: "Sub Total",
      price: "₹2,249",
    },
    {
      title: "GST (18%)",
      price: "₹404.82",
    },
    {
      title: (
        <>
          Total{" "}
          <span className="text-sm font-normal text-[#231D4F]/60">
            (Inc Tax)
          </span>
        </>
      ),
      price: "₹2,653",
      highlight: true,
    },
  ];

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex items-center mb-6">
        <button
          onClick={onClose}
          className="mr-3 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-[#3F1562]">Checkout</h2>
      </div>

      <div className="bg-gradient-to-r from-[#3F1562]/3 to-[#DF6789]/5 p-4 rounded-2xl border-[2px] border-[#3d156236]">
        <div className="bg-transparent rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-[#231D4F] mb-4">
            Purchase summary
          </h3>

          <div className="space-y-3">
            {planItems.map((item, index) => (
              <div key={index}>
                {index === 0 ? (
                  // Plan block (with description)
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-[#231D4F]">
                        {item.title}
                      </div>
                      <div className="text-sm text-[royalPurple]">
                        {item.description}
                      </div>
                    </div>
                    <div className="font-medium text-[#231D4F]">
                      {item.price}
                    </div>
                  </div>
                ) : item.highlight ? (
                  // Total block
                  <>
                    <hr className="my-3 border-gray-300" />
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#231D4F]">
                        {item.title}
                      </span>
                      <span className="text-xl font-bold text-[#231D4F]">
                        {item.price}
                      </span>
                    </div>
                  </>
                ) : (
                  // Normal row
                  <>
                    {item.title.toString().includes("Sub Total") && (
                      <hr className="my-3 border-gray-300" />
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#231D4F]">{item.title}</span>
                      <span
                        className={`${
                          item.title.toString().includes("Sub Total")
                            ? "font-semibold"
                            : "font-medium"
                        } text-[#231D4F]`}
                      >
                        {item.price}
                      </span>
                    </div>
                    {item.title.toString().includes("GST") && (
                      <hr className="my-3 border-gray-300" />
                    )}
                  </>
                )}
              </div>
            ))}

            <div className=" w-full flex items-center justify-center mt-3 p-3 bg-gradient-to-r from-[#BF9CF9]/30 to-[peach]/30 rounded-md">
              <span className="text-sm mr-2">✅</span>
              <span className="text-[13px] font-semibold text-[#221D4F]">
                Yay! You saved <strong>₹750</strong> on this plan.
              </span>
            </div>
          </div>
        </div>

        <button
          className="w-full px-6 py-2 rounded-lg font-medium text-sm
  bg-gradient-to-r from-yellow-800 via-purple-800 to-pink-500 
  bg-clip-text text-transparent border-[2px] border-[#3d156236]
  transition duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] hover:border-purple-50"
        >
          Proceed to Pay ₹2,653
        </button>
      </div>

      <div className="text-center space-y-2 mt-2">
        <p className="text-sm text-gray-500">
          Need help? Reach out to our support team anytime.
        </p>
        <div className="flex items-center justify-center text-xs text-gray-800">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          100% secure payment · No hidden charges
        </div>
      </div>
    </CommonModal>
  );
}

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const features = [
    {
      title: "Smart Search",
      description:
        'Type what you\'re looking for (e.g., "Front-end developer with React and 2+ years experience"). Saral AI will do the rest, instantly.',
      icon: (
        <svg
          width="24"
          height="27"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.6878 21.3106L18.8642 18.4969C20.3949 16.6059 21.1416 14.1996 20.9504 11.7742C20.7591 9.34883 19.6445 7.0893 17.8363 5.46154C16.0281 3.83379 13.6643 2.96192 11.2322 3.02573C8.80014 3.08954 6.48527 4.08416 4.76494 5.80449C3.04461 7.52482 2.04999 9.83969 1.98618 12.2718C1.92237 14.7038 2.79424 17.0677 4.42199 18.8759C6.04975 20.684 8.30928 21.7987 10.7347 21.9899C13.16 22.1812 15.5664 21.4344 17.4574 19.9037L20.271 22.7273C20.3638 22.8208 20.4741 22.8951 20.5957 22.9457C20.7173 22.9964 20.8477 23.0225 20.9794 23.0225C21.1111 23.0225 21.2415 22.9964 21.3631 22.9457C21.4847 22.8951 21.595 22.8208 21.6878 22.7273C21.7813 22.6346 21.8555 22.5242 21.9062 22.4026C21.9568 22.2811 21.9829 22.1507 21.9829 22.0189C21.9829 21.8872 21.9568 21.7568 21.9062 21.6352C21.8555 21.5137 21.7813 21.4033 21.6878 21.3106ZM4.01793 12.5405C4.01793 11.0605 4.4568 9.61372 5.27904 8.38315C6.10128 7.15257 7.26997 6.19346 8.63731 5.62709C10.0046 5.06072 11.5092 4.91253 12.9608 5.20126C14.4123 5.49 15.7457 6.20268 16.7922 7.2492C17.8387 8.29571 18.5514 9.62906 18.8401 11.0806C19.1289 12.5322 18.9807 14.0368 18.4143 15.4041C17.8479 16.7714 16.8888 17.9401 15.6583 18.7624C14.4277 19.5846 12.9809 20.0235 11.5009 20.0235C9.51631 20.0235 7.61298 19.2351 6.20965 17.8318C4.80631 16.4284 4.01793 14.5251 4.01793 12.5405Z"
            fill="royalPurple"
          />
        </svg>
      ),
    },
    {
      title: "Fast & Focused",
      description:
        "No filters, no forms. Just natural language. Get real profiles that match what you said.",
      icon: (
        <svg
          width="24"
          height="27"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_158_297)">
            <path
              d="M11.983 18.0226C9.22597 18.0226 6.98291 15.7795 6.98291 13.0225C6.98291 10.2655 9.22597 8.02246 11.983 8.02246C14.74 8.02246 16.983 10.2655 16.983 13.0225C16.983 15.7795 14.74 18.0226 11.983 18.0226ZM11.983 9.52246C10.053 9.52246 8.48291 11.0926 8.48291 13.0225C8.48291 14.9525 10.053 16.5226 11.983 16.5226C13.9129 16.5226 15.483 14.9525 15.483 13.0225C15.483 11.0926 13.9129 9.52246 11.983 9.52246Z"
              fill="royalPurple"
            />
            <path
              d="M11.9828 23.0223C6.4688 23.0223 1.98291 18.5364 1.98291 13.0224C1.98291 7.5084 6.46885 3.02246 11.9828 3.02246C17.4968 3.02246 21.9828 7.5084 21.9828 13.0224C21.9828 18.5364 17.4968 23.0223 11.9828 23.0223ZM11.9828 4.52246C7.29591 4.52246 3.48291 8.33546 3.48291 13.0224C3.48291 17.7093 7.29591 21.5223 11.9828 21.5223C16.6698 21.5223 20.4828 17.7093 20.4828 13.0224C20.4828 8.33546 16.6698 4.52246 11.9828 4.52246Z"
              fill="royalPurple"
            />
            <path
              d="M11.9829 6.02252C11.5689 6.02252 11.2329 5.68652 11.2329 5.27252V1.77246C11.2329 1.35846 11.5689 1.02246 11.9829 1.02246C12.3969 1.02246 12.7329 1.35846 12.7329 1.77246V5.27252C12.7329 5.68652 12.3969 6.02252 11.9829 6.02252ZM11.9829 25.0225C11.5689 25.0225 11.2329 24.6865 11.2329 24.2725V20.7724C11.2329 20.3584 11.5689 20.0224 11.9829 20.0224C12.3969 20.0224 12.7329 20.3584 12.7329 20.7724V24.2725C12.7329 24.6865 12.3969 25.0225 11.9829 25.0225ZM4.23297 13.7725H0.73291C0.31891 13.7725 -0.0170898 13.4365 -0.0170898 13.0225C-0.0170898 12.6085 0.31891 12.2725 0.73291 12.2725H4.23297C4.64697 12.2725 4.98297 12.6085 4.98297 13.0225C4.98297 13.4365 4.64697 13.7725 4.23297 13.7725ZM23.2329 13.7725H19.7328C19.3188 13.7725 18.9828 13.4365 18.9828 13.0225C18.9828 12.6085 19.3188 12.2725 19.7328 12.2725H23.2329C23.6469 12.2725 23.9829 12.6085 23.9829 13.0225C23.9829 13.4365 23.6469 13.7725 23.2329 13.7725Z"
              fill="royalPurple"
            />
          </g>
          <defs>
            <clipPath id="clip0_158_297">
              <rect width="24" height="27" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Private & Safe",
      description:
        "Your prompts are secure and only used to fetch results. Nothing is stored or shared.",
      icon: (
        <svg
          width="24"
          height="27"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9829 24.0225C11.8846 24.0225 11.7863 24.0018 11.6948 23.9592L9.63579 23.0091C5.21516 20.9686 2.35791 16.5033 2.35791 11.6337V4.77246C2.35784 4.60353 2.41997 4.44048 2.53245 4.31444C2.64493 4.1884 2.79987 4.10818 2.96772 4.08909C4.33001 3.93326 5.68341 3.70769 7.0226 3.41327C8.62568 3.06 10.2055 2.60861 11.7533 2.06165C11.9018 2.0094 12.064 2.0094 12.2118 2.06165C13.7598 2.60863 15.3399 3.06002 16.9432 3.41327C18.2756 3.70684 19.6403 3.9344 20.9981 4.08909C21.1659 4.10818 21.3209 4.1884 21.4334 4.31444C21.5458 4.44048 21.608 4.60353 21.6079 4.77246V11.6344C21.6079 16.504 18.7513 20.9686 14.33 23.0091L12.271 23.9592C12.1806 24.0008 12.0824 24.0224 11.9829 24.0225ZM3.73291 5.38159V11.6344C3.73691 13.7639 4.34873 15.8481 5.49644 17.6419C6.64415 19.4356 8.28007 20.8645 10.2119 21.7606L11.9829 22.5766L13.7539 21.7592C15.6855 20.8633 17.3213 19.4346 18.469 17.6411C19.6167 15.8475 20.2286 13.7637 20.2329 11.6344V5.38159C17.4238 5.01737 14.6594 4.36634 11.9829 3.43871C9.30645 4.36614 6.54202 5.01762 3.73291 5.38159Z"
            fill="royalPurple"
          />
          <path
            d="M14.7329 17.835H9.23291C8.4746 17.835 7.85791 17.2183 7.85791 16.46V11.6475C7.85791 10.8891 8.4746 10.2725 9.23291 10.2725H14.7329C15.4912 10.2725 16.1079 10.8891 16.1079 11.6475V16.46C16.1079 17.2183 15.4912 17.835 14.7329 17.835ZM9.23291 11.6475V16.46H14.7343L14.7329 11.6475H9.23291Z"
            fill="royalPurple"
          />
          <path
            d="M14.0454 11.6475H9.92041C9.73807 11.6475 9.56321 11.575 9.43427 11.4461C9.30534 11.3172 9.23291 11.1423 9.23291 10.96V9.58496C9.23291 8.06834 10.4663 6.83496 11.9829 6.83496C13.4995 6.83496 14.7329 8.06834 14.7329 9.58496V10.96C14.7329 11.1423 14.6605 11.3172 14.5315 11.4461C14.4026 11.575 14.2277 11.6475 14.0454 11.6475ZM10.6079 10.2725H13.3579V9.58496C13.3579 8.82665 12.7412 8.20996 11.9829 8.20996C11.2246 8.20996 10.6079 8.82665 10.6079 9.58496V10.2725Z"
            fill="royalPurple"
          />
        </svg>
      ),
    },
    {
      title: "Results may vary",
      description:
        "Saral AI can make mistakes. Please review results before taking action.",
      icon: (
        <svg
          width="24"
          height="27"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.10742 22.1875H18.8574C20.1518 22.1875 21.2012 21.1382 21.2012 19.8438C21.2012 19.4269 21.0924 19.0355 20.9016 18.6964L14.0266 6.19637C13.625 5.48234 12.86 5 11.9824 5C11.1048 5 10.3399 5.48234 9.93824 6.19637L3.06324 18.6964C2.8725 19.0355 2.76367 19.4269 2.76367 19.8438C2.76367 21.1382 3.81301 22.1875 5.10742 22.1875Z"
            stroke="royalPurple"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.9824 10.4688V15.1562"
            stroke="royalPurple"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.7637 18.2812C12.7637 18.7127 12.4139 19.0625 11.9824 19.0625C11.5509 19.0625 11.2012 18.7127 11.2012 18.2812C11.2012 17.8498 11.5509 17.5 11.9824 17.5C12.4139 17.5 12.7637 17.8498 12.7637 18.2812Z"
            fill="royalPurple"
          />
        </svg>
      ),
    },
  ];

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="lg">
      <h2 className="text-xl font-bold text-[royalPurple] mb-2">
        Welcome to Saral AI
      </h2>
      <p className="text-sm text-[royalPurple] opacity-40 mb-6">
        Get real candidate profiles in seconds—just type what you need.
      </p>

      <div className="space-y-5 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-1.5">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-[royalPurple] opacity-95 text-lg mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-[royalPurple] text-md opacity-70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="px-6 py-2 rounded-lg font-medium text-sm
  bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-500
  bg-clip-text text-transparent border-[2px] border-[#3d156236]
  transition duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] hover:border-purple-50"
        >
          Continue
        </button>
      </div>
    </CommonModal>
  );
}

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SupportModal({ isOpen, onClose }: SupportModalProps) {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[royalPurple] mb-1">
          Contact Support
        </h2>
        <p className="text-[#3D15623D1562] opacity-40 text-sm">
          We're here to help you succeed
        </p>
      </div>

      {/* Wrapper for both cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-2xl p-4 shadow-md">
        {/* Email Support */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h4 className="font-semibold text-[royalPurple] mb-1">Email Support</h4>
          <p className="text-[royalPurple] opacity-40 text-sm mb-4">
            Get help via email within 24 hours
          </p>
          <div className="flex items-center gap-2 text-[royalPurple]">
            {/* Email Icon */}
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1172 14.3281H4.14844C2.59513 14.3281 1.33594 13.0689 1.33594 11.5156V4.48438C1.33594 2.93107 2.59513 1.67188 4.14844 1.67188H15.1172C16.6705 1.67188 17.9297 2.93107 17.9297 4.48438V11.5156C17.9297 13.0689 16.6705 14.3281 15.1172 14.3281Z"
                stroke="royalPurple"
                stroke-width="1.40625"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.14844 4.48438L8.63845 9.11502C9.18763 9.66419 10.078 9.66419 10.6272 9.11502L15.1172 4.48438M4.14844 11.5156L7.52344 8M11.7422 8L15.1172 11.5156"
                stroke="royalPurple"
                stroke-width="1.40625"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-sm text-[royalPurple] font-medium">
              support@headsin.com
            </span>
          </div>
        </div>

        {/* Contact Number */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h4 className="font-semibold text-[royalPurple] mb-1">Contact No.</h4>
          <p className="text-[royalPurple] opacity-40 text-sm mb-4">
            Chat with our support team
          </p>
          <div className="flex items-center gap-2 text-[royalPurple]">
            {/* Mobile Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.25 1.5H5.75C4.64543 1.5 3.75 2.39543 3.75 3.5V15.5C3.75 16.6046 4.64543 17.5 5.75 17.5H13.25C14.3546 17.5 15.25 16.6046 15.25 15.5V3.5C15.25 2.39543 14.3546 1.5 13.25 1.5Z"
                stroke="royalPurple"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 14.25H12"
                stroke="royalPurple"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm text-[royalPurple] font-medium">
              +91 97734-97763
            </span>
          </div>
        </div>
      </div>
    </CommonModal>
  );
}
