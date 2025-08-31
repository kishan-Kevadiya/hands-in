import MainLayout from "@/components/layouts/main";
import AccountSetup from "@/pages/account-setup/AccountSetup";
import EmailVerification from "@/pages/auth/email-verification/EmailVerification";
import Login from "@/pages/auth/login/Login";
import VerifyOtp from "@/pages/auth/otp-verification/VerifyOtp";
import Register from "@/pages/auth/register/Register";
import ForgotPassword from "@/pages/auth/forgot-password/ForgotPassword";
import AcceptedAndRejectedTab from "@/pages/jobs/application-tabs/AcceptedAndRejectedTab";
import AIRecommendedTab from "@/pages/jobs/application-tabs/AIRecommendedTab";
import AppliedTab from "@/pages/jobs/application-tabs/AppliedTab";
import ShortlistedTab from "@/pages/jobs/application-tabs/ShortlistedTab";
import CreateJob from "@/pages/jobs/create-job/CreateJob";
import JobApplications from "@/pages/jobs/JobApplications";
import JobDetails from "@/pages/jobs/JobDetails";
import JobDetailsWrapper from "@/pages/jobs/JobDetailsWrapper";
import JobsDashboard from "@/pages/jobs/JobsDashboard";
import Dashboard from "@/pages/main/dashboard/Dashboard";
import Messages from "@/pages/main/messages/Messages";
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import AuthLayout from "../components/layouts/auth";
import Support from "@/pages/main/support/Support";
import CreateProfile from "@/pages/main/profile/CreateProfile";
import ApplicationDetails from "@/pages/jobs/application-tabs/ApplicationDetails";
import Profile from "@/pages/main/profile/Profile";
import { APPLICATION_TABS_TYPE, USE_QUERY_KEYS } from "@/helpers/constants";
import queryClient from "@/helpers/query.config";
import { getCompanyAuth } from "@/helpers/apis/auth";
import ProtectedRouter from "./ProtectedRouter";
import PageNotFound from "@/pages/main/PageNotFound";
import PreviewJob from "@/pages/jobs/PreviewJob";
import PrivacyPolicy from "@/pages/privacy-policy/PrivacyPolicy";
import TermsofService from "@/pages/terms-of-service/TermsofService";
import CodeofConduct from "@/pages/code-of-conduct/CodeofConduct";
import { PromptScreen } from "@/pages/fresh-saral-ai/FreshSaralAi";
import SaralPromptScreen from "@/pages/saral-ai/SaralAi";
import RichTextEditor from "@/components/ui/rich-text-editor/RichTextEditor";

const AppRoutes: React.FC = () => {
  const rotues = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRouter>
          <MainLayout />
        </ProtectedRouter>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "messages",
          element: <Messages />,
        },
        {
          path: "jobs",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <JobsDashboard />,
            },
            {
              path: "edit/:id",
              element: <CreateJob />,
            },
            {
              path: "preview",
              element: <PreviewJob />,
            },
            {
              path: "create-job",
              element: <CreateJob />,
            },
            {
              path: ":jobId",
              element: <JobDetailsWrapper />,
              children: [
                {
                  index: true,
                  element: <JobDetails />,
                },
                {
                  path: "applications",
                  element: <JobApplications />,
                  children: [
                    {
                      index: true,
                      element: <AIRecommendedTab />,
                    },
                    {
                      path: ":userId",
                      element: (
                        <ApplicationDetails
                          tab={APPLICATION_TABS_TYPE.AI_RECOMMENDED}
                        />
                      ),
                    },
                    {
                      path: "applied",
                      element: (
                        <div className="h-full w-full">
                          <Outlet />
                        </div>
                      ),
                      children: [
                        {
                          index: true,
                          element: <AppliedTab />,
                        },
                        {
                          path: ":id",
                          element: (
                            <ApplicationDetails
                              tab={APPLICATION_TABS_TYPE.APPLIED}
                            />
                          ),
                        },
                      ],
                    },
                    {
                      path: "shortlisted",
                      element: (
                        <div className="h-full w-full">
                          <Outlet />
                        </div>
                      ),
                      children: [
                        {
                          index: true,
                          element: <ShortlistedTab />,
                        },
                        {
                          path: ":id",
                          element: (
                            <ApplicationDetails
                              tab={APPLICATION_TABS_TYPE.SHORTLISTED}
                            />
                          ),
                        },
                      ],
                    },
                    {
                      path: "accepted-rejected",
                      element: (
                        <div className="h-full w-full">
                          <Outlet />
                        </div>
                      ),
                      children: [
                        {
                          index: true,
                          element: <AcceptedAndRejectedTab />,
                        },
                        {
                          path: ":id",
                          element: (
                            <ApplicationDetails
                              tab={APPLICATION_TABS_TYPE.ACCEPTED_REJECTED}
                            />
                          ),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "profile",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <Profile />,
            },
            {
              path: "create-profile",
              element: <CreateProfile />,
            },
          ],
        },
        {
          path: "support",
          element: <Support />,
        },
        {
          path: "/account-setup",
          element: <AccountSetup />,
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
            queryFn: () => getCompanyAuth(),
            staleTime: 10 * 60 * 1000,
          });
          if (data) return (window.location.href = "/");
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
    {
      path: "saral-ai",
      element: <Outlet />, // parent placeholder
      children: [
        {
          index: true, // /saral-ai
          element: <PromptScreen />,
        },
        {
          path: "result", // /saral-ai/result
          element: <SaralPromptScreen query="" />, // wrapper with sidebar
          children: [
            {
              path: "linkdin-campaign", // /saral-ai/result/linkdin-campaign
              element: <RichTextEditor />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={rotues} />;
};

export default AppRoutes;
