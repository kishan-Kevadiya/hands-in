import HappyEmoji from "@/assets/svg/support/emojis/Happy"
import JoyEmoji from "@/assets/svg/support/emojis/Joy"
import NeutralEmoji from "@/assets/svg/support/emojis/Neutral"
import SadEmoji from "@/assets/svg/support/emojis/Sad"
import SmileEmoji from "@/assets/svg/support/emojis/Smile"
import { JSX } from "react"

export enum JOB_STATUS {
    ON_GOING = "ON_GOING",
    EXPIRED = "EXPIRED",
}

export const RATING_EMOJI: Array<{ label: React.FC<JSX.IntrinsicElements["svg"]>; value: number }> = [
    { label: SadEmoji, value: 1 },
    { label: NeutralEmoji, value: 2 },
    { label: SmileEmoji, value: 3 },
    { label: HappyEmoji, value: 4 },
    { label: JoyEmoji, value: 5 },
];

export enum USE_QUERY_KEYS {
    SEND_OTP = "sendOtp",
    GET_USER = "getUser",
    GET_JOBS = "getJobs",
    GET_JOB_DETAILS = "getJobDetails",
    GET_APPLICATIONS = "getApplications",
    GET_ROLES = "getRoles",
    GET_PROFILE = "getProfile",
    IS_VALID_USER = "isValidUser",
    GET_TEST_QUESTIONS = "getTestQuestions",
    GET_RESUME = "getResume",
    GET_COMPANY_APPLICATIONS = "getCompanyApplications",
    GET_MESSAGES = "getMessages",
    GET_COMPANIES_FOR_CHAT = "getCompaniesForChat",
    GET_RESUME_LINK = "getResumeLink",
    GET_QUALIFICATIONS = "getQualifications",
    GET_CITIES = "getCities"
}

export const FAQs = [
    {
        question: "What is HeadsIn and how is it different from other platforms?",
        answer: "HeadsIn is a smart, AI-powered hiring platform built for today’s workforce. Unlike traditional job portals, we focus on true-fit matchmaking—connecting the right talent to the right roles, faster. With pre-assessments, live application tracking, and private communication, we make hiring smarter and job-hunting simpler."
    },
    {
        question: "Is HeadsIn free to use?",
        answer: "Yes! 🎉 HeadsIn is currently 100% free for both candidates and recruiters during our launch phase. No hidden fees. No surprises."
    },
    {
        question: "How does the AI match candidates with jobs?",
        answer: "Our AI looks beyond keywords. It evaluates skill match, role relevance, candidate intent, and pre-assessment results to ensure high-quality, role-specific connections—on both sides."
    },
    {
        question: "What is the 240-seconds pre-assessment?",
        answer: "It’s a short, role-based test taken by every candidate. It helps us understand your real potential beyond your resume and provides recruiters with an instant scorecard to assess fit quickly."
    },
    {
        question: "Can I track the status of my job application?",
        answer: "Yes! With our two-way traceability, you’ll know exactly when your resume is viewed, shortlisted, or rejected—no more wondering."
    },
    {
        question: "How do recruiters communicate with candidates?",
        answer: "Through our in-app chat. It’s private, secure, and avoids sharing personal contact details until both parties are ready."
    },
    {
        question: "As a recruiter, can I see candidate activity or intent?",
        answer: "Absolutely. See who's exploring your job, who applied, and how active they are. Our insights help recruiters prioritize interested and engaged talent."
    },
    {
        question: "How do I post a job or create a profile?",
        answer: "It’s quick and intuitive. Sign up, fill in your profile or job description, and let our AI do the heavy lifting."
    }
];