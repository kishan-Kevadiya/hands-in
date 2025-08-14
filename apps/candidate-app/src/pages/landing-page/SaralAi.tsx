import { useState } from "react";
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
      {/* <HeroSection /> */}
      {/* <PromptScreen /> */}
      <SaralPromptScreen />
      {/* <CandidateCard />
            <RichTextEditor  /> */}
      {/* <Specification />
      <PricingSection />
      <FeaturesSection />
      <FoundersSection />
      <FAQSection />
      <TryNowSection /> */}
    </div>
  );
};

export default SaralAI;

function HeroSection() {
  return (
    <main
      className="
  relative z-10 flex flex-col items-center justify-center text-center px-8 
  min-h-[calc(100vh-100px)] 
  bg-black 
  bg-[url('src/assets/images/landing-page/Saral-ai-frame.png')] 
  bg-no-repeat 
  bg-top bg-cover   /* Mobile priority */
  lg:bg-contain     /* Large screen back to contain */
"
    >
      {/* Top tagline */}
      <div className="mt-6 mb-8">
        <p className="px-6 py-1.5 text-xs font-medium tracking-wide rounded-full inline-block text-[#F1E4FB] bg-[#3F1562] border border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.2)] backdrop-blur-md">
          the easiest way to recruit.
        </p>
      </div>

      {/* Main heading */}
      <div className="mb-12">
        <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-white">SARAL </span>
          <span className="text-[#E06689]">AI</span>
        </h1>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
          Saral is the fastest way to scout top Talent and send
          <br />
          AI-generated LinkedIn messages to connect instantly.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mb-16">
        <button
          className="px-8 py-4 rounded-full text-white text-lg font-medium relative overflow-hidden 
             bg-gradient-to-r from-[#4A2780] to-[#2B0F49] 
             shadow-[0_0_10px_2px_rgba(255,255,255,0.15)] 
             hover:bg-gradient-to-r hover:from-[#7A4E8D] hover:to-[#3A1646] 
             hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.2)] 
             transition-all duration-300 ease-in-out"
        >
          Start with 5 Free Credits
          <span
            className="absolute inset-0 rounded-full 
               bg-[radial-gradient(circle_at_center,_rgba(255,_255,_255,_0.25),_transparent_70%)] 
               pointer-events-none 
               hover:bg-[radial-gradient(circle_at_center,_rgba(255,_255,_255,_0.35),_transparent_70%)] 
               transition-all duration-300 ease-in-out"
          />
        </button>
      </div>

      {/* Bottom text */}
      <div>
        <p className="text-gray-400 text-sm">
          <span className="font-medium text-[#E06689]">98%</span>{" "}
          <span className="text-white ">Candidate Acceptance Rate</span>
        </p>
      </div>
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
    <section className="py-16 bg-white">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col justify-between overflow-hidden ${plan.highlighted
              ? "text-white bg-[url('src/assets/images/landing-page/pricing/pricingFrame.png')] bg-cover bg-top"
              : "bg-white text-black"
              }`}
          >
            {/* Plan Header */}
            <div>
              <h3
                className={`text-lg font-semibold ${plan.highlighted ? "text-white" : "text-gray-900"
                  }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mt-1 ${plan.highlighted ? "text-gray-300" : "text-gray-500"
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
              className={`mt-6 py-2 rounded-lg border transition-colors ${plan.highlighted
                ? "border-purple-300 hover:bg-purple-700"
                : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              Get Started
            </button>

            {/* Divider */}
            <hr
              className={`my-6 ${plan.highlighted
                ? "border-purple-600 opacity-60"
                : "border-gray-200"
                }`}
            />

            {/* Features */}
            <div>
              <h4
                className={`font-semibold mb-3 ${plan.highlighted ? "text-white" : "text-black"
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

  const FeatureCard = ({ icon, title, description }: any) => {
    return (
      <div className="relative border border-transparent p-8 text-center transition-all duration-300 group hover:border-gray-300 transition duration-900 ease-in-out flex flex-col items-center">
        {/* Corner Squares */}
        <span className="absolute top-0 left-0 w-3 h-3 bg-gray-300 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-900"></span>
        <span className="absolute top-0 right-0 w-3 h-3 bg-gray-300 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-900"></span>
        <span className="absolute bottom-0 left-0 w-3 h-3 bg-gray-300 -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-900"></span>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-900"></span>

        {/* Icon */}
        <div className="w-16 h-16 mb-4 flex items-center justify-start rounded-[20px] bg-[#3F1562] shadow-[0_4px_10px_rgba(63,21,98,0.4)]">
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-contain rounded-[20px] shadow-[0_6px_15px_rgba(63,21,98,0.3)]"
          />
        </div>

        {/* Text */}
        <h3 className="text-[#3F1562] font-semibold">{title}</h3>
        <p className="text-[#9474AE] w-45 text-sm mt-1">{description}</p>
      </div>
    );
  };

  return (
    <section className="py-16 bg-white mt-8 mb-6">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-[20px] sm:text-5xl md:text-3.5xl font-bold text-[#3F1562]">
          Features That Matter
        </h2>

        <p className="text-[#848199] mt-2">Why Recruiters Love Saral AI</p>
      </div>

      {/* Features grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard
            key={i}
            icon={f.icon}
            title={f.title}
            description={f.description}
          />
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
    <section className="py-16 bg-white mb-18">
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
                <p className="text-sm sm:text-base text-[#848199]  w-3/4 mt-2">
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
              className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"
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
      [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]
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
    </div>
  );
}




const history = [
  { title: "Senior React Developer...", results: "45 results", time: "2 hours ago" },
  { title: "Lorem Ipsum is simply dummy", results: "45 results", time: "2 hours ago" },
  { title: "Lorem Ipsum is simply dummy", results: "45 results", time: "2 hours ago" },
  { title: "Lorem Ipsum is simply dummy", results: "45 results", time: "2 hours ago" },
  { title: "Lorem Ipsum is simply dummy", results: "45 results", time: "2 hours ago" },
];

function SaralPromptScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#ede6fb] to-[#fff1e2]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#6f47c7] text-white p-2 rounded-lg shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Made Sticky */}
      <aside className={`w-80 lg:w-[320px] md:w-72 sm:w-64 bg-gradient-to-b from-[#F7EEFF] to-[#FFFFFF] border-r border-[#a693c4] p-6 flex flex-col justify-between h-screen z-40 transition-all duration-300 ${isOpen ? 'fixed top-0 left-0 translate-x-0' : 'fixed top-0 -translate-x-full lg:sticky lg:top-0 lg:left-0 lg:translate-x-0'
        }`}>
        {/* Logo and menu */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#6f47c7] rounded-xl w-10 h-10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="3"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              className="rounded-xl pl-10 pr-4 py-2 bg-white/50 focus:bg-white w-full placeholder:text-[#8b7aa8] border border-[#a693c4] text-[#4a3d5e] outline-none"
              placeholder="Search"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b7aa8]"
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
            <button className="flex items-center text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-white/30 rounded-lg transition font-medium">
              <span>Saved Profiles</span>
              <span className="ml-auto text-xs bg-white/60 px-2 py-0.5 rounded-xl text-[#6b47a3]">
                3
              </span>
            </button>
            <button className="flex items-center text-[#2d1b4a] gap-2 py-2 px-2 hover:bg-white/30 rounded-lg transition font-medium">
              <span>LinkedIn Outreach</span>
            </button>
          </div>

          {/* Recent Searches */}
<div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm">
  {/* Header */}
  <h3 className="text-[#6b54a3] tracking-wide font-semibold mb-3 flex items-center gap-2">
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_55_475)">
<path d="M9.82514 1.25C8.01144 1.25883 6.25191 1.86907 4.82222 2.98511C3.39252 4.10115 2.37344 5.65994 1.92464 7.41725L1.37564 6.587C1.32367 6.50008 1.25463 6.42458 1.17268 6.36507C1.09074 6.30555 0.997593 6.26325 0.898858 6.24071C0.800123 6.21817 0.697845 6.21586 0.598193 6.23392C0.49854 6.25198 0.403578 6.29003 0.319032 6.34579C0.234486 6.40154 0.162108 6.47384 0.106263 6.55833C0.0504175 6.64282 0.0122618 6.73774 -0.00590345 6.83737C-0.0240687 6.937 -0.021867 7.03928 0.000568764 7.13804C0.0230045 7.2368 0.0652096 7.32999 0.124639 7.412L1.77464 9.9125C1.88925 10.0729 2.05824 10.1862 2.25014 10.2313C2.44609 10.2701 2.64948 10.2311 2.81714 10.1225L5.29214 8.45525C5.37747 8.40196 5.45122 8.33205 5.50897 8.24967C5.56673 8.16729 5.60732 8.07414 5.62834 7.97575C5.64935 7.87736 5.65035 7.77575 5.63129 7.67697C5.61222 7.57818 5.57347 7.48424 5.51735 7.40074C5.46123 7.31724 5.38889 7.24589 5.30462 7.19092C5.22035 7.13596 5.12589 7.09851 5.02685 7.08081C4.92782 7.0631 4.82623 7.06551 4.72814 7.08787C4.63005 7.11024 4.53746 7.15211 4.45589 7.211L3.33014 7.97C3.62975 6.75379 4.26519 5.64629 5.16395 4.77385C6.06272 3.90141 7.18861 3.29917 8.41319 3.03583C9.63776 2.7725 10.9117 2.85868 12.0897 3.28454C13.2676 3.7104 14.3021 4.4588 15.0752 5.44433C15.8483 6.42987 16.3288 7.61286 16.4619 8.85834C16.5949 10.1038 16.3753 11.3616 15.8279 12.4883C15.2805 13.6149 14.4274 14.565 13.3661 15.2301C12.3047 15.8952 11.0777 16.2486 9.82514 16.25C8.75139 16.2471 7.69422 15.985 6.7435 15.4859C5.79278 14.9869 4.97661 14.2656 4.36439 13.3835C4.30956 13.2993 4.23837 13.227 4.15505 13.1708C4.07173 13.1147 3.97797 13.0758 3.87935 13.0566C3.78073 13.0374 3.67925 13.0382 3.58095 13.059C3.48264 13.0797 3.38951 13.12 3.30707 13.1775C3.22464 13.2349 3.1546 13.3084 3.10109 13.3934C3.04759 13.4785 3.01172 13.5734 2.99561 13.6726C2.9795 13.7717 2.98349 13.8731 3.00733 13.9707C3.03117 14.0683 3.07438 14.1602 3.13439 14.2408C4.12969 15.6756 5.55901 16.7534 7.2123 17.3157C8.86558 17.8779 10.6556 17.895 12.3193 17.3645C13.9831 16.8339 15.4327 15.7836 16.4553 14.368C17.4778 12.9524 18.0193 11.2462 18.0001 9.5C18.0075 7.32268 17.151 5.23133 15.6184 3.68471C14.0859 2.1381 12.0024 1.2625 9.82514 1.25Z" fill="#3F1462"/>
<path d="M9.75 4.9624C9.55109 4.9624 9.36032 5.04142 9.21967 5.18207C9.07902 5.32272 9 5.51349 9 5.7124V9.4999C9.00319 9.69816 9.08177 9.88776 9.21975 10.0302L11.4698 12.3004C11.6109 12.4394 11.8008 12.5177 11.9989 12.5187C12.197 12.5197 12.3877 12.4432 12.5303 12.3057C12.6715 12.1656 12.7512 11.9752 12.7521 11.7763C12.7529 11.5775 12.6748 11.3864 12.5347 11.2452L10.5 9.19165V5.7124C10.5 5.51349 10.421 5.32272 10.2803 5.18207C10.1397 5.04142 9.94891 4.9624 9.75 4.9624Z" fill="#3F1462"/>
</g>
<defs>
<clipPath id="clip0_55_475">
<rect width="18" height="18" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>

    Recent Search
  </h3>

  {/* Divider */}
  <div className="border-t border-[#e9e4f3] mb-3"></div>

  {/* History List */}
  <div
    className={`flex flex-col gap-2 transition-all duration-300 ease-in-out ${
      expanded ? "max-h-[400px]" : "max-h-40 overflow-hidden"
    }`}
  >
    {history.map((item, i) => (
      <button
        key={i}
        className="flex justify-between items-center bg-white hover:bg-[rgba(111,71,199,0.05)] px-4 py-3 rounded-xl shadow-sm transition-colors border border-transparent hover:border-[#a693c4]/30"
      >
        <div className="flex flex-col text-left">
          <span className="truncate w-full max-w-[130px] overflow-hidden whitespace-nowrap">
            {item.title}
          </span>
          <span className="text-xs text-[#7965a8]">{item.results}</span>
        </div>
        <span className="text-xs text-[#7965a8] whitespace-nowrap">
          {item.time}
        </span>
      </button>
    ))}
  </div>

  {/* View More / Less */}
  {history.length > 4 && (
   <button
  onClick={() => setExpanded(!expanded)}
  className="mt-4 text-xs font-medium px-4 py-2 rounded-full transition-all bg-clip-text text-transparent"
  style={{
    backgroundImage: "linear-gradient(90deg, #3F1562 0%, #DF6789 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  {expanded ? "View Less" : "View More"}
</button>

  )}
</div>


        </div>

        {/* Plan/Credits */}
        <div>
          <div className="flex items-center justify-between mb-3 text-[#6b54a3] text-sm">
            <span>Credits</span>
            <span className="font-bold text-[#4a3761]">12/25</span>
          </div>
          <button className="w-full rounded-xl border border-[#8b7aa8] bg-white/60 py-2 mb-2 text-[#6b47a3] hover:bg-white/80 font-semibold transition">
            Upgrade Plan
          </button>
          <button className="w-full rounded-xl py-2 flex items-center justify-center gap-2 text-[#5b4791] text-sm hover:bg-white/20 transition">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-6h6v6"
              ></path>
              <circle cx="12" cy="12" r="10" />
            </svg>
            Support
          </button>
        </div>
      </aside>

      {/* Main content - Adjusted positioning */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Header with Info and Home buttons */}
        <div className="flex items-center justify-between p-4 sm:p-6 lg:px-8 pt-16 lg:pt-6">
          {/* Info Icon */}
          <button className="group flex items-center justify-center w-[33px] h-[33px] bg-white hover:bg-purple-200 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
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
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 max-w-3xl w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#4e356e] mb-3 sm:mb-4 tracking-tight leading-tight">
              What Can I Help You With?
            </h1>
            <p className="text-[#ba9acc] font-medium text-sm sm:text-base lg:text-lg tracking-wide px-4">
              Describe your ideal candidate and let AI find the perfect matches
            </p>
          </div>

          <div className="w-full max-w-2xl flex flex-col items-center gap-3 sm:gap-4">
            {/* Prompt Input */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center bg-white/80 border border-[#f3cde9] rounded-2xl p-3 sm:p-4 shadow-sm gap-2 sm:gap-0">
              <input
                className="flex-1 bg-transparent outline-none text-sm sm:text-base md:text-lg placeholder-[#b79ad6] font-medium sm:pr-3 min-h-[40px] sm:min-h-0"
                placeholder="when an unknown printer took a galley of type and scrambled"
                autoFocus
              />
              <div className="flex items-center gap-2 justify-end">
                <button
                  className="rounded-xl bg-[#f0e3ff] text-[#a14cc9] px-3 sm:px-4 py-2 font-semibold hover:bg-[#ead1f7] transition text-xs sm:text-sm flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 19v-6" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Rephrase
                </button>
                <button
                  className="rounded-full p-2.5 sm:p-3 bg-gradient-to-br from-[#de7fdf] to-[#a881fa] hover:scale-105 transition shadow-md"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center p-4 sm:p-6 text-xs sm:text-[13px] text-[#ad90c9] px-4">
          Saral AI simplifies sourcing, but human judgment is still key
        </footer>
      </main>
    </div>
  );
}




function CandidateCard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-xl">
        {/* Main Card */}
        <div className="p-[4px] rounded-3xl bg-gradient-to-r gradient-purple-pink">
          <div className="bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 rounded-3xl p-8 relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-12">
              <div className="flex items-center space-x-6">
                {/* Large L Avatar */}
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center border-2 border-purple-300">
                  <span className="text-6xl font-bold text-purple-800">L</span>
                </div>

                {/* Name and Title */}
                <div>
                  <h1 className="text-4xl font-bold text-purple-800 mb-2">
                    Leslie A.
                  </h1>
                  <p className="text-2xl text-gray-500">Frontend Designer</p>
                </div>
              </div>

              {/* LinkedIn Button */}
              <div className="bg-white rounded-2xl px-6 py-3 shadow-md">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500 text-xl font-medium">
                    View on
                  </span>
                  <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                    <span className="text-white font-bold text-sm">in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-12">
                {/* Left Side */}
                <div className="space-y-8">
                  {/* Experience */}
                  <div>
                    <p className="text-gray-500 text-xl mb-2">Experience</p>
                    <p className="text-4xl font-bold text-purple-800">5 yrs</p>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-gray-500 text-xl mb-2">Location</p>
                    <p className="text-4xl font-bold text-purple-800">
                      Pune, MH
                    </p>
                  </div>
                </div>

                {/* Right Side - Assessment Score */}
                <div className="flex flex-col items-center justify-center">
                  {/* Circular Progress */}
                  <div className="relative w-48 h-48 mb-4">
                    <CustomHalfCircle percentage={20} />
                  </div>

                  {/* Assessment Label */}
                  <p className="text-gray-500 text-xl">Assessment score</p>
                </div>
              </div>

              {/* Saved Text */}
              <div className="text-center mt-8">
                <p className="text-3xl font-bold text-gradient-purple-pink">
                  Saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
