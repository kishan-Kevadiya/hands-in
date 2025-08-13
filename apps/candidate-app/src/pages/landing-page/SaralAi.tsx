import { useState } from 'react'
import specification from '@/assets/images/landing-page/SaralAiSpec1.png'
import { ColoredLogo } from '@/assets/images'
import Star from '@/assets/svg/landingPage/Star'
import Homeicon from '@/assets/svg/landingPage/SaralAi/Homeicon'
import InfoIcon from '@/assets/svg/landingPage/SaralAi/InfoIcon'
import { CustomHalfCircle } from '@/assets/svg/landingPage/SaralAi/CustomAssessment'
import RichTextEditor from './RichTextEditor'

const SaralAI = () => {

    return (
        <div>
            <HeroSection />
            <PromptScreen />
            <SaralPromptScreen />
            <CandidateCard />
            <RichTextEditor  />
            <Specification />
            <PricingSection />
            <FeaturesSection />
            <FoundersSection />
            <FAQSection />
            <TryNowSection />
        </div>
    )
}

export default SaralAI

function HeroSection() {
    return (<main className="relative z-10 flex flex-col items-center justify-center text-center px-8" style={{ minHeight: 'calc(100vh - 100px)' }}>
        {/* Top tagline */}
        <div className="mb-8">
            <p className="text-gray-400 text-sm uppercase tracking-widest">
                The easiest way to recruit
            </p>
        </div>

        {/* Main heading */}
        <div className="mb-12">
            <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight">
                <span className="text-white">SARAL </span>
                <span className="">AI</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Saral is the fastest way to scout top Talent and send<br />
                AI-generated LinkedIn messages to connect instantly.
            </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity shadow-lg">
                Start with 5 Free Credits
            </button>
        </div>

        {/* Bottom text */}
        <div>
            <p className="text-gray-400 text-sm">
                <span className="text-red-400 font-medium">98%</span> Candidate Acceptance Rate
            </p>
        </div>
    </main>)
}

function Specification() {

    const SpecData = [
        {
            id: 1,
            label: 'Instant Candidate Discovery',
            description: `Type what you're hiring for and let Saral AI 
instantly pull the best-matched profiles.`,
            image: specification

        },
        {
            id: 2,
            label: 'Instant Candidate Discovery',
            description: `Type what you're hiring for and let Saral AI 
instantly pull the best-matched profiles.`,
            image: specification

        },
        {
            id: 3,
            label: 'Instant Candidate Discovery',
            description: `Type what you're hiring for and let Saral AI 
instantly pull the best-matched profiles.`,
            image: specification

        }

    ]

    return (
        <div className="flex flex-col justify-center items-center text-center" >
            <div className="">
                Built for Speed. Designed for Precision
            </div>
            <div>
                Your hiring, now faster and smarter with Saral AI.
            </div>

            <div className='flex gap-8'>
                {SpecData?.map((spec, i) => (
                    <div
                        key={i}
                        className="group relative w-[400px] h-[409px] rounded-3xl overflow-hidden shadow-lg"
                    >
                        {/* base image */}
                        <img
                            src={spec?.image}
                            alt={spec?.label}
                            className="w-full h-full object-cover"
                        />

                        {/* centered label on image */}
                        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                            <p className="text-white text-center text-lg font-medium px-4">
                                {spec?.label}
                            </p>
                        </div>
                        <div className='relative'>
                            {/* PINK drawer (starts hidden above, slides down on hover) */}
                            <div className="group bg-pink-300 absolute w-[400px] h-[511px] rounded-3xl overflow-hidden shadow-lg ">
                                <p className="text-black text-center text-sm">{spec?.description}</p>
                            </div>
                        </div >
                    </div >
                ))
                }

            </div >

        </div >
    )
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
            highlighted: true, // middle card highlight
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
        }
    ]

    return (
        <section className="py-16 bg-white">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
                    Plans & Pricing
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Whether you're hiring for 1 role or 100, Saral AI adapts to your
                    needs.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col justify-between ${plan.highlighted
                            ? "bg-gradient-to-b from-purple-800 to-purple-900 text-white"
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
                            className={`my-6 ${plan.highlighted ? "border-purple-500" : "border-gray-200"
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
                                    <li
                                        key={idx}
                                        className="flex items-center gap-2"
                                    >
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
};

function FeaturesSection() {
    const features = [
        {
            icon: "/icons/lightning.svg",
            title: "Prompt-Based Sourcing",
            description: "Simply describe what you need, AI does the rest",
        },
        {
            icon: "/icons/structured.svg",
            title: "Structured Profiles",
            description: "Clean, organized candidate information",
        },
        {
            icon: "/icons/search.svg",
            title: "Saved Search History",
            description: "Access your previous searches anytime",
        },
        {
            icon: "/icons/target.svg",
            title: "Fit/Not Fit Scoring",
            description: "AI-powered compatibility assessment",
        },
        {
            icon: "/icons/filter.svg",
            title: "Filters on Searches",
            description: "Refine results with precision filters",
        },
        {
            icon: "/icons/chat.svg",
            title: "One-Click LinkedIn Outreach",
            description: "Simply describe what you need, AI does the rest",
        },
    ];

    const FeatureCard = ({ icon, title, description }: any) => {
        return (
            <div className="relative border border-transparent p-8 text-center transition-all duration-300 group hover:border-gray-300">
                {/* Corner Squares */}
                <span className="absolute top-0 left-0 w-3 h-3 bg-gray-300 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 right-0 w-3 h-3 bg-gray-300 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-0 w-3 h-3 bg-gray-300 -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-lg bg-purple-900">
                    <img src={icon} alt={title} width={28} height={28} />
                </div>

                {/* Text */}
                <h3 className="text-purple-900 font-semibold">{title}</h3>
                <p className="text-purple-500 text-sm mt-1">{description}</p>
            </div>
        );
    };

    return (
        <section className="py-16 bg-white">
            {/* Section header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
                    Features That Matter
                </h2>
                <p className="text-gray-600 mt-2">
                    Why Recruiters Love Saral AI
                </p>
            </div>

            {/* Features grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3">
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
            answer: "An abroad education loan helps students finance their studies overseas...",
        },
        {
            id: "02",
            question: "Who is eligible to apply for an abroad education loan ?",
            answer: "Eligibility depends on lender criteria such as admission offer, co-signer, and more...",
        },
        {
            id: "03",
            question: "How can UniCreds help me get an abroad education loan ?",
            answer: "UniCreds connects you with multiple lenders and helps you compare the best offers...",
        },
        {
            id: "04",
            question: "What expenses are covered in education loans for abroad studies ?",
            answer:
                "Abroad Education Loans generally cover tuition fees, living expenses, travel costs, examination fees, and other educational & travel expenses, depending on the lender’s policies.",
        },
        {
            id: "05",
            question: "What is the maximum loan amount that can be availed for studying abroad?",
            answer:
                "The maximum amount depends on the lender and your course, but can go up to 1.5 crore INR in some cases.",
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(3);

    return (
        <section className="py-16 bg-white">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900">FAQs</h2>
                <p className="text-gray-500 mt-2">All your questions answered here</p>
            </div>

            {/* FAQ Grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {faqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                        <div
                            key={i}
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className={`cursor-pointer rounded-2xl border border-gray-200 p-5 flex items-start gap-4 transition-all duration-300 
              ${isOpen ? "bg-purple-50 shadow-[0_0_40px_-10px_rgba(168,85,247,0.7)]" : "bg-white"}`}
                        >
                            {/* Number Circle */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-purple-700 font-semibold">
                                {faq.id}
                            </div>

                            {/* Question & Answer */}
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-purple-900 font-medium">{faq.question}</h3>
                                    <span className="text-purple-700 font-bold text-lg">
                                        {isOpen ? "×" : "+"}
                                    </span>
                                </div>
                                {isOpen && (
                                    <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
                                )}
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
        <section className="relative w-full h-[500px] flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#050014] to-[#0b001f] rounded-3xl overflow-hidden">
            {/* Glow Arc at Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <img
                    src="/arc-glow.svg" // Use your glowing arc image
                    alt="Glow"
                    width={1200}
                    height={200}
                />
            </div>

            {/* Main Heading */}
            <h1 className="text-white text-4xl font-bold max-w-3xl leading-snug">
                when Saral AI does it in 10 seconds & minimal cost
            </h1>

            {/* Subtext */}
            <p className="text-purple-300 mt-3">
                why waste 10 days & ₹10,000 to hire ?
            </p>

            {/* Buttons */}
            <div className="flex gap-6 mt-6">
                <button className="px-8 py-3 rounded-xl border border-purple-500 text-white hover:bg-purple-600 transition">
                    Try Now
                </button>
                <button className="text-white hover:text-purple-400 transition">
                    See pricing
                </button>
            </div>
        </section>
    )
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
            img: "https://via.placeholder.com/40", // Replace with real image
            name: "Kashyap Shah",
            role: "Recruitment Head",
            company: "Lottie Techbar",
        },
        {
            img: "https://via.placeholder.com/40",
            name: "Kristin D.",
            role: "Founder & CEO",
            company: "Neno Finance",
        },
        {
            img: "https://via.placeholder.com/40",
            name: "Anuj Datta",
            role: "CTO",
            company: "Bootstrap Startup",
        },
        {
            img: "https://via.placeholder.com/40",
            name: "John S.",
            role: "Head of People",
            company: "Sprine Systems",
        },
    ]

    return (
        <section className="bg-purple-200 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                {/* Left Column */}
                <div>
                    <h2 className="text-4xl font-bold text-purple-900 mb-10 leading-tight">
                        Built for founders & fast-growing teams
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {audience.map((item) => (
                            <div key={item.number}>
                                <div className="text-2xl font-bold text-purple-800">
                                    {item.number}{" "}
                                    <span className="font-semibold text-purple-900">
                                        {item.title}
                                    </span>
                                </div>
                                <p className="text-sm text-purple-700 mt-2">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    {profiles.map((profile, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center ${idx === 1 || idx === 3 ? "ml-40" : ""} bg-white rounded-2xl shadow-sm px-4 py-3 w-fit gap-4`}
                        >
                            <img
                                src={profile.img}
                                alt={profile.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="font-semibold text-purple-900">
                                    {profile.name}
                                </h4>
                                <p className="text-sm text-gray-600">{profile.role}</p>
                            </div>
                            <span className="ml-auto border rounded-full px-3 py-1 text-xs text-gray-600 bg-gray-50">
                                {profile.company}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function PromptScreen() {
    return (
        <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-[#ede6fb] to-[#fff1e2]">
            {/* Heading */}
            <div className="flex flex-1 flex-col justify-center items-center w-full">
                <h1 className="text-7xl font-bold text-[#3c295d] mb-12 drop-shadow-[0_5px_15px_rgba(60,41,93,0.17)]">
                    <span className="opacity-80" style={{
                        textShadow: '0 8px 24px rgba(60,41,93,0.25)'
                    }}>
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
                Saral AI v1.0x | Powered by <span className="text-[#663eb7] font-semibold hover:underline cursor-pointer">HeadsIn</span>
            </footer>
        </div>
    )
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
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                                <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" />
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
                            <span className="ml-auto text-xs bg-[#bb9efa]/60 px-2 py-0.5 rounded-xl text-[#5d488e]">3</span>
                        </button>
                        <button className="flex items-center text-[#41316b] gap-2 py-2 px-2 hover:bg-[#e9d8f3] rounded-lg transition font-medium">
                            <span>LinkedIn Outreach</span>
                        </button>
                    </div>
                    {/* Recent Searches */}
                    <div className="mt-10">
                        <h3 className="text-[#9677c4] tracking-wide font-semibold mb-2 ml-1 text-sm">Recent Searches</h3>
                        <div className="flex flex-col gap-1 h-40 overflow-auto pr-3">
                            <button className="flex items-center hover:bg-[#f4edfa] px-2 py-2 rounded-xl justify-between">
                                <span className="truncate text-left text-[#492e75] text-sm font-medium">Senior React Developer...</span>
                                <span className="text-xs text-[#b698db]">2 hours ago</span>
                            </button>
                            {[...Array(4)].map((_, i) => (
                                <button key={i} className="flex items-center hover:bg-[#f4edfa] px-2 py-2 rounded-xl justify-between">
                                    <span className="truncate text-left text-[#492e75] text-sm font-medium">Lorem Ipsum is simply dummy</span>
                                    <span className="text-xs text-[#b698db]">2 hours ago</span>
                                </button>
                            ))}
                        </div>
                        <button className="text-[#7c5dbc] mt-2 text-xs font-medium hover:underline ml-1">View More</button>
                    </div>
                </div>
                {/* Plan/Credits */}
                <div>
                    <div className="flex items-center justify-between mb-3 text-[#8a76b6] text-sm">
                        <span>Credits</span>
                        <span className="font-bold text-[#5d488e]">12/25</span>
                    </div>
                    <button className="w-full rounded-xl border border-[#b1a1dc] bg-white/80 py-2 mb-2 text-[#7e2fdc] hover:bg-[#f7ecff] font-semibold transition">Upgrade Plan</button>
                    <button className="w-full rounded-xl py-2 flex items-center justify-center gap-2 text-[#7c5dbc] text-sm hover:bg-[#f7ecff] transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h6v6"></path>
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
                        <span className="text-purple-700 font-medium group-hover:text-purple-800">Home</span>
                    </button>
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl font-bold text-[#4e356e] mb-2 tracking-tight">Get Start With SARAL AI</h1>
                    <p className="text-[#ba9acc] font-medium text-base tracking-wide">No filters. No forms. Just the right candidates, right now.</p>
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
                            <svg className="w-5 h-5" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 19v-6" strokeLinecap="round" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            Rephrase
                        </button>
                        <button
                            type="submit"
                            className="ml-2 rounded-full p-3 bg-gradient-to-br from-[#de7fdf] to-[#a881fa] hover:scale-105 transition shadow-md"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    {/* Suggestion Chips */}
                    <div className="w-full flex flex-wrap gap-2 mt-1">
                        <span className="bg-[#f5ecff] text-[#775499] rounded-xl px-4 py-2 text-sm font-medium">When an unknown printer took a galley of type and scrambled.</span>
                        <span className="bg-[#f5ecff] text-[#775499] rounded-xl px-4 py-2 text-sm font-medium">Sales Manager fluent in Hindi and English, 3+ years experience</span>
                        <span className="bg-[#f5ecff] text-[#775499] rounded-xl px-4 py-2 text-sm font-medium">Senior Graphic Designer with branding experience from Nasik</span>
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
                                    <h1 className="text-4xl font-bold text-purple-800 mb-2">Leslie A.</h1>
                                    <p className="text-2xl text-gray-500">Frontend Designer</p>
                                </div>
                            </div>

                            {/* LinkedIn Button */}
                            <div className="bg-white rounded-2xl px-6 py-3 shadow-md">
                                <div className="flex items-center space-x-2">
                                    <span className="text-blue-500 text-xl font-medium">View on</span>
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
                                        <p className="text-4xl font-bold text-purple-800">Pune, MH</p>
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
                                <p className="text-3xl font-bold text-gradient-purple-pink">Saved</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}