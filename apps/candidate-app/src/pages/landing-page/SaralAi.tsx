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
      <HeroSection />
      {/* <PromptScreen />
            <SaralPromptScreen />
            <CandidateCard />
            <RichTextEditor  /> */}
      <Specification />
      <PricingSection />
      <FeaturesSection />
      <FoundersSection />
      <FAQSection />
      <TryNowSection />
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
            className={`relative rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col justify-between overflow-hidden ${
              plan.highlighted
                ? "text-white bg-[url('src/assets/images/landing-page/pricing/pricingFrame.png')] bg-cover bg-top"
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
      <div className="flex flex-1 flex-col justify-center items-center w-full">
        <h1 className="text-7xl font-bold text-[#3c295d] mb-12 drop-shadow-[0_5px_15px_rgba(60,41,93,0.17)]">
          <span
            className="opacity-80"
            style={{
              textShadow: "0 8px 24px rgba(60,41,93,0.25)",
            }}
          >
            SARAL AI
          </span>
        </h1>
        {/* Prompt Bar */}
        <div className="w-full max-w-2xl flex items-center bg-white/60 rounded-full border border-pink-300 shadow-md px-6 py-4">
          <input
            className="flex-1 bg-transparent outline-none text-lg placeholder-gray-400"
            placeholder="Type what you need. We’ll deliver who you need."
          />
          <button className="flex gap-1 text-[#3D1562] font-semibold px-6 py-2 ml-2  hover:scale-105 transition text-base">
            <Star />
            Rephrase
          </button>
          <button className="ml-2 p-2 rounded-xl w-[42px] h-[42px] bg-white/80 hover:bg-pink-50 border border-pink-200 flex items-center">
            <img
              src={ColoredLogo}
              alt="coloredLogo"
              className="aspect-[1] w-full"
            />
          </button>
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

function SaralPromptScreen() {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#ede6fb] to-[#fff1e2]">
      {/* Sidebar */}
      <aside className="w-[320px] bg-white/40 border-r border-[#ede6fb] p-6 flex flex-col justify-between">
        {/* Logo and menu */}
        <div>
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
              className="rounded-xl pl-10 pr-4 py-2 bg-[#fdefff]/70 focus:bg-white w-full placeholder:text-[#a47acf] border border-[#e2d6fa] text-[#574065] outline-none"
              placeholder="Search"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a47acf]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {/* Menu */}
          <div className="mt-7 flex flex-col gap-1">
            <button className="flex items-center text-[#41316b] gap-2 py-2 px-2 hover:bg-[#e9d8f3] rounded-lg transition font-medium">
              <span>Saved Profiles</span>
              <span className="ml-auto text-xs bg-[#bb9efa]/60 px-2 py-0.5 rounded-xl text-[#5d488e]">
                3
              </span>
            </button>
            <button className="flex items-center text-[#41316b] gap-2 py-2 px-2 hover:bg-[#e9d8f3] rounded-lg transition font-medium">
              <span>LinkedIn Outreach</span>
            </button>
          </div>
          {/* Recent Searches */}
          <div className="mt-10">
            <h3 className="text-[#9677c4] tracking-wide font-semibold mb-2 ml-1 text-sm">
              Recent Searches
            </h3>
            <div className="flex flex-col gap-1 h-40 overflow-auto pr-3">
              <button className="flex items-center hover:bg-[#f4edfa] px-2 py-2 rounded-xl justify-between">
                <span className="truncate text-left text-[#492e75] text-sm font-medium">
                  Senior React Developer...
                </span>
                <span className="text-xs text-[#b698db]">2 hours ago</span>
              </button>
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  className="flex items-center hover:bg-[#f4edfa] px-2 py-2 rounded-xl justify-between"
                >
                  <span className="truncate text-left text-[#492e75] text-sm font-medium">
                    Lorem Ipsum is simply dummy
                  </span>
                  <span className="text-xs text-[#b698db]">2 hours ago</span>
                </button>
              ))}
            </div>
            <button className="text-[#7c5dbc] mt-2 text-xs font-medium hover:underline ml-1">
              View More
            </button>
          </div>
        </div>
        {/* Plan/Credits */}
        <div>
          <div className="flex items-center justify-between mb-3 text-[#8a76b6] text-sm">
            <span>Credits</span>
            <span className="font-bold text-[#5d488e]">12/25</span>
          </div>
          <button className="w-full rounded-xl border border-[#b1a1dc] bg-white/80 py-2 mb-2 text-[#7e2fdc] hover:bg-[#f7ecff] font-semibold transition">
            Upgrade Plan
          </button>
          <button className="w-full rounded-xl py-2 flex items-center justify-center gap-2 text-[#7c5dbc] text-sm hover:bg-[#f7ecff] transition">
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

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-2">
        <div className="flex items-center justify-between">
          {/* Info Icon */}
          <button className="group flex items-center justify-center w-[33px] h-[33px] bg-white hover:bg-purple-200 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
            <InfoIcon />
          </button>

          {/* Home Section */}
          <button className="group flex items-center space-x-3 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
            <Homeicon />
            <span className="text-purple-700 font-medium group-hover:text-purple-800">
              Home
            </span>
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl font-bold text-[#4e356e] mb-2 tracking-tight">
            Get Start With SARAL AI
          </h1>
          <p className="text-[#ba9acc] font-medium text-base tracking-wide">
            No filters. No forms. Just the right candidates, right now.
          </p>
        </div>
        <form className="w-full max-w-2xl flex flex-col items-center gap-4">
          {/* Prompt Input */}
          <div className="w-full flex items-center bg-white/80 border border-[#f3cde9] rounded-2xl p-4 shadow-sm">
            <input
              className="flex-1 bg-transparent outline-none text-base md:text-lg placeholder-[#b79ad6] font-medium pr-3"
              placeholder="Describe your ideal candidate..."
              autoFocus
            />
            <button
              type="button"
              className="rounded-xl bg-[#f0e3ff] text-[#a14cc9] px-4 py-2 font-semibold hover:bg-[#ead1f7] transition text-sm flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
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
              type="submit"
              className="ml-2 rounded-full p-3 bg-gradient-to-br from-[#de7fdf] to-[#a881fa] hover:scale-105 transition shadow-md"
            >
              <svg
                className="w-6 h-6 text-white"
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
          {/* Suggestion Chips */}
          <div className="w-full flex flex-wrap gap-2 mt-1">
            <span className="bg-[#f5ecff] text-[#775499] rounded-xl px-4 py-2 text-sm font-medium">
              When an unknown printer took a galley of type and scrambled.
            </span>
            <span className="bg-[#f5ecff] text-[#775499] rounded-xl px-4 py-2 text-sm font-medium">
              Sales Manager fluent in Hindi and English, 3+ years experience
            </span>
            <span className="bg-[#f5ecff] text-[#775499] rounded-xl px-4 py-2 text-sm font-medium">
              Senior Graphic Designer with branding experience from Nasik
            </span>
          </div>
        </form>
        {/* Footer */}
        <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[13px] text-[#ad90c9]">
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
