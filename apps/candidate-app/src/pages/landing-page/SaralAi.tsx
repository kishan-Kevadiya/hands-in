import { useRef, useState, useEffect } from "react";
import specificationOne from "@/assets/images/landing-page/SaralAiSpec1.png";
import specificationTwo from "@/assets/images/landing-page/SaralAiSpec2.png";
import specificationThree from "@/assets/images/landing-page/SaralAiSpec3.png";
import { motion } from "framer-motion";

const SaralAI = () => {
  return (
    <div>
      <HeroSection />
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

function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function NeuralNetwork() {
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full">
        {nodes.map((node, index) => (
          <g key={node.id}>
            {/* Connections */}
            {nodes.slice(index + 1).map((targetNode) => (
              <motion.line
                key={`${node.id}-${targetNode.id}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke="url(#gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Nodes */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="#E06689"
              animate={{
                r: [2, 4, 2],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          </g>
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A2780" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E06689" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(224, 102, 137, 0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "20%", left: "10%" }}
      />

      {/* Medium orb */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(74, 39, 128, 0.4) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [50, -50, 50],
          y: [30, -30, 30],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "60%", right: "15%" }}
      />

      {/* Small orb */}
      <motion.div
        className="absolute w-32 h-32 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(241, 228, 251, 0.3) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          x: [-30, 30, -30],
          y: [-40, 40, -40],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: "40%", left: "70%" }}
      />
    </div>
  );
}

function DataStream() {
  const streams = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {streams.map((stream) => (
        <motion.div
          key={stream}
          className="absolute w-px bg-gradient-to-b from-transparent via-[#E06689] to-transparent"
          style={{
            left: `${20 + stream * 15}%`,
            height: "200px",
          }}
          animate={{
            y: [-200, window.innerHeight + 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: stream * 0.5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

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
      {/* Animated Background Effects */}
      <FloatingParticles />
      <GradientOrbs />
      <NeuralNetwork />
      <DataStream />
      <PremiumFloatingOrbs />
      <AdvancedParticles />
      <CinematicLightRays />
      <EnergyWaves />

      {/* Animated overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"
        animate={{
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content Container with higher z-index */}
      <div className="relative z-20 w-full">
        {/* Top tagline */}
        <motion.div
          className="mt-4 mb-6 sm:mt-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="px-4 py-1 text-[10px] sm:text-xs font-medium tracking-wide rounded-full inline-block text-[#F1E4FB] bg-[#3F1562] border border-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.2)] backdrop-blur-md"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(224, 102, 137, 0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            the easiest way to recruit.
          </motion.p>
        </motion.div>

        {/* Main heading */}
        <motion.div
          className="mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-7xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            <motion.span
              className="text-white"
              animate={{
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 10px rgba(255,255,255,0.3)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              SARAL
            </motion.span>
            <motion.span
              className="text-[#E06689] ml-4 font-bold"
              animate={{
                textShadow: [
                  "0 0 4px rgba(224,102,137,0.4), 0 0 8px rgba(224,102,137,0.3)",
                  "0 0 10px rgba(224,102,137,0.5), 0 0 15px rgba(224,102,137,0.4)",
                  "0 0 4px rgba(224,102,137,0.4), 0 0 8px rgba(224,102,137,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              AI
            </motion.span>
          </h1>

          <motion.p
            className="text-gray-300 text-sm sm:text-base md:text-xl max-w-xl sm:max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Saral is the fastest way to scout top Talent and send{" "}
            <br className="hidden sm:block" />
            AI-generated LinkedIn messages to connect instantly.
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
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
                ? `radial-gradient(circle at ${pos.x}px ${pos.y}px, hsl(${
                    (pos.x + pos.y) % 360
                  }, 80%, 70%, 0.1) 0%, transparent 40%), linear-gradient(to right, #4A2780, #2B0F49)`
                : "linear-gradient(to right, #4A2780, #2B0F49)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(224, 102, 137, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 10px 2px rgba(255,255,255,0.05)",
                "0 0 15px 3px rgba(224,102,137,0.2)",
                "0 0 10px 2px rgba(255,255,255,0.05)",
              ],
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            Start with 5 Free Credits
            {/* Subtle border glow */}
            {hover && (
              <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: `0 0 15px 2px hsl(${
                    (pos.x + pos.y) % 360
                  }, 80%, 60%, 0.1) inset`,
                }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          className="pb-6 sm:pb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-gray-400 text-xs sm:text-sm">
            <motion.span
              className="font-medium text-[#E06689]"
              animate={{
                color: ["#E06689", "#F1E4FB", "#E06689"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              98%
            </motion.span>{" "}
            <span className="text-white">Candidate Acceptance Rate</span>
          </p>
        </motion.div>
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

// Premium floating orbs with physics
function PremiumFloatingOrbs() {
  const orbs = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 40,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    color: i % 3 === 0 ? "#8B5CF6" : i % 3 === 1 ? "#A855F7" : "#C084FC",
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}40, ${orb.color}10, transparent)`,
            filter: "blur(20px)",
            left: `${orb.initialX}%`,
            top: `${orb.initialY}%`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.3, 0.8, 0.4, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Advanced particle system
function AdvancedParticles() {
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Cinematic light rays
function CinematicLightRays() {
  const rays = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {rays.map((ray) => (
        <motion.div
          key={ray}
          className="absolute w-1 bg-gradient-to-t from-transparent via-purple-400 to-transparent"
          style={{
            height: "200%",
            left: `${10 + ray * 12}%`,
            transformOrigin: "bottom",
          }}
          animate={{
            rotate: [0, 2, -2, 0],
            opacity: [0.2, 0.8, 0.2],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + ray * 0.5,
            repeat: Infinity,
            delay: ray * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Premium energy waves
function EnergyWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 w-full h-full"
          style={{
            background: `conic-gradient(from ${
              i * 90
            }deg, transparent, rgba(139, 92, 246, 0.3), transparent)`,
            transformOrigin: "bottom center",
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Interactive button with advanced effects
function PremiumButton({ children, onClick, variant = "primary" }: any) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  const handleMouseMove = (e: any) => {
    if (buttonRef.current) {
      // @ts-expect-error
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const primaryStyles =
    variant === "primary"
      ? {
          background:
            "linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(168, 85, 247, 0.8))",
          border: "1px solid rgba(139, 92, 246, 0.6)",
        }
      : {};

  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative px-6 sm:px-8 py-3 rounded-xl text-white font-medium overflow-hidden
        ${
          variant === "primary"
            ? "border border-purple-500 shadow-lg shadow-purple-500/30"
            : "hover:text-purple-400"
        }
      `}
      style={primaryStyles}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow:
          variant === "primary"
            ? "0 20px 40px rgba(139, 92, 246, 0.4)"
            : "none",
      }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow:
          variant === "primary"
            ? [
                "0 10px 20px rgba(139, 92, 246, 0.3)",
                "0 15px 30px rgba(168, 85, 247, 0.4)",
                "0 10px 20px rgba(139, 92, 246, 0.3)",
              ]
            : [],
      }}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Ripple effect */}
      {isHovered && variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 255, 255, 0.2) 0%, 
              rgba(139, 92, 246, 0.1) 30%, 
              transparent 60%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Cursor following border */}
      {isHovered && variant === "primary" && (
        <motion.div
          className="absolute -inset-[1px] rounded-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 255, 255, 0.8), 
              rgba(139, 92, 246, 0.6) 40%, 
              transparent 70%)`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        />
      )}

      {/* Shimmer effect */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Main component
function TryNowSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
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
      initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              rotateX: 0,
            }
          : {}
      }
      transition={{
        duration: 1.2,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 30px 60px rgba(139, 92, 246, 0.3)",
      }}
    >
      {/* Premium Background Effects */}

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"
        animate={{
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content Container */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 mb-38"
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Main Heading with Premium Typography */}
        <motion.h1
          className="
            text-white 
            text-2xl sm:text-3xl md:text-4xl lg:text-4xl 
            font-bold 
            max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl 
            leading-snug sm:leading-snug md:leading-normal lg:leading-relaxed 
            relative
          "
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Text glow effect */}
          <motion.span
            className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            when Saral AI does it in 10 seconds & minimal cost
          </motion.span>

          <span className="relative">
            when Saral AI does it in 10 seconds & minimal cost
          </span>

          {/* Sparkle effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.h1>

        {/* Subtext with typing effect */}
        <motion.p
          className="text-purple-300 mt-3 text-sm sm:text-base relative"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.span
            animate={{
              color: ["#C084FC", "#A855F7", "#8B5CF6", "#C084FC"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            why waste 10 days & ₹10,000 to hire ?
          </motion.span>
        </motion.p>

        {/* Premium Button Container */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 relative"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <PremiumButton variant="primary">Try Now</PremiumButton>

          <PremiumButton variant="secondary">See pricing</PremiumButton>

          {/* Button glow backdrop */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 rounded-full blur-xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Premium floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                left: `${15 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Premium border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.3), transparent, rgba(168, 85, 247, 0.3), transparent)",
          backgroundSize: "300% 300%",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.section>
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
