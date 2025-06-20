import AccountSetupLayout from "@/components/layouts/account-setup";
import AuthLayout from "@/components/layouts/auth";
import MainLayout from "@/components/layouts/main";
import { getUser } from "@/helpers/apis/auth";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import AccountSetup from "@/pages/account-setup/AccountSetup";
import BrowseJobs from "@/pages/account-setup/browse-jobs/BrowseJobs";
import CompleteProfile from "@/pages/account-setup/complete-profile/CompleteProfile";
import Assessment from "@/pages/assessment/Assessment";
import Headscore from "@/pages/assessment/Headscore";
import EmailVerification from "@/pages/auth/email-verification/EmailVerification";
import ForgotPassword from "@/pages/auth/forgot-password/ForgotPassword";
import Login from "@/pages/auth/login/Login";
import VerifyOtp from "@/pages/auth/otp-verification/VerifyOtp";
import Register from "@/pages/auth/register/Register";
import CodeofConduct from "@/pages/code-of-conduct/CodeofConduct";
import AboutUs from "@/pages/landing-page/AboutUs";
import BuildResume from "@/pages/landing-page/BuildResume";
import Candidate from "@/pages/landing-page/Candidate";
import Company from "@/pages/landing-page/Company";
import ContactUs from "@/pages/landing-page/ContactUs";
import Discover from "@/pages/landing-page/Discover";
import DiscoverDetail from "@/pages/landing-page/DiscoverDetail";
import Home from "@/pages/landing-page/Home";
import LandingPage from "@/pages/landing-page/LandingPage";
import PageNotFound from "@/pages/landing-page/PageNotFound";
import AcceptedRejected from "@/pages/main/jobs/accepted_rejected/AcceptedRejected";
import AppliedJobs from "@/pages/main/jobs/applied/AppliedJobs";
import CompanyDetails from "@/pages/main/jobs/company-details/CompanyDetails";
import JobDetails from "@/pages/main/jobs/job-details/JobDetails";
import Jobs from "@/pages/main/jobs/Jobs";
import RecommendedJobs from "@/pages/main/jobs/recommended/RecommendedJobs";
import SavedJobs from "@/pages/main/jobs/saved/SavedJobs";
import Messages from "@/pages/main/messages/Messages";
import EditProfile from "@/pages/main/profile/EditProfile";
import ProfilePreview from "@/pages/main/profile/ProfilePreview";
import Resume from "@/pages/main/Resume/Resume";
import Support from "@/pages/main/support/Support";
import PrivacyPolicy from "@/pages/privacy-policy/PrivacyPolicy";
import TermsofService from "@/pages/terms-of-service/TermsofService";
import React from "react";
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "react-router";
import { JOBS } from ".";
import ProtectedRouter from "./ProtectedRouter";

const AppRoutes: React.FC = () => {
    const rotues = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "build-resume-page",
                    element: <BuildResume />,
                },
                {
                    path: "discover",
                    element: <Discover />,
                },
                {
                    path: "discover/:slug",
                    element: <DiscoverDetail />,
                },
                {
                    path: "about-us",
                    element: <AboutUs />,
                },
                {
                    path: "candidate",
                    element: <Candidate />,
                },
                {
                    path: "company",
                    element: <Company />,
                },
                {
                    path: "contact-us",
                    element: <ContactUs />,
                },
            ],
        },
        {
            path: "/dashboard",
            element: (
                <ProtectedRouter>
                    <MainLayout />
                </ProtectedRouter>
            ),
            children: [
                {
                    index: true,
                    element: <Navigate to={JOBS} />,
                },
                {
                    path: "jobs",
                    element: <Jobs />,
                    children: [
                        {
                            index: true,
                            element: <RecommendedJobs />,
                        },
                        {
                            path: ":id",
                            element: <JobDetails />,
                        },
                        {
                            path: "applied",
                            element: <AppliedJobs />,
                        },
                        {
                            path: "accepted-rejected",
                            element: <AcceptedRejected />,
                        },
                        {
                            path: "saved",
                            element: <SavedJobs />,
                        },
                        {
                            path: "company-details/:id",
                            element: <CompanyDetails />,
                        },
                    ],
                },
                {
                    path: "messages",
                    element: <Messages />,
                },
                {
                    path: "resume",
                    element: <Resume />,
                },
                {
                    path: "profile",
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <ProfilePreview />,
                        },
                        {
                            path: "edit-profile",
                            element: <EditProfile />,
                        },
                    ],
                },
                {
                    path: "support",
                    element: <Support />,
                },
                {
                    path: "account-setup",
                    element: <AccountSetupLayout />,
                    children: [
                        {
                            index: true,
                            element: <AccountSetup />,
                        },
                        {
                            path: "complete-profile",
                            element: <CompleteProfile />,
                        },
                    ],
                },
                {
                    path: "browse-jobs",
                    element: <BrowseJobs />,
                },
                {
                    path: "assessment/:roleId",
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <Assessment />,
                        },
                        {
                            path: "score",
                            element: <Headscore />,
                        },
                    ],
                },
            ],
        },
        {
            path: "/auth",
            element: <AuthLayout />,
            loader: async () => {
                try {
                    const data = await queryClient.ensureQueryData({
                        queryKey: [USE_QUERY_KEYS.IS_VALID_USER],
                        queryFn: () => getUser(),
                        staleTime: 10 * 60 * 1000,
                    });
                    if (data) return (window.location.href = "/dashboard");
                } catch (error) {
                    console.error(error);
                }
            },
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "verify-otp",
                    element: <VerifyOtp />,
                },
                {
                    path: "forgot-password",
                    element: <EmailVerification />,
                },
                {
                    path: "reset-password",
                    element: <ForgotPassword />,
                },
            ],
        },
        {
            path: "code-of-conduct",
            element: <CodeofConduct />,
        },
        {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
        },
        {
            path: "terms-and-conditions",
            element: <TermsofService />,
        },
        {
            path: "*",
            element: <PageNotFound />,
        },
    ]);

    return <RouterProvider router={rotues} />;
};

export default AppRoutes;
