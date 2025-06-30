import type { RouteType } from "@src/types/layout";
import { ACTIONS } from "@utils/constants";
import { lazy } from "solid-js";

// Icons
import {
  CandidateIcon,
  CompanyIcon,
  DashboardIcon,
  SettingCouponIcon,
  SettingPlansIcon,
  UserRolesIcon,
  UserSettingIcon,
} from "@icons/index";

export const routes: RouteType[] = [
  // Public routes
  {
    path: "/login",
    component: lazy(() => import("../views/components/auth/Login")),
    layout: "auth",
    meta: {
      public: true,
    },
  },
  // Private routes
  {
    path: "/dashboard",
    component: lazy(() => import("../views/pages/dashboard")),
    layout: "sidebar",
    label: "Dashboard",
    icon: DashboardIcon,
    meta: {
      inSidebar: true,
    },
  },
  {
    path: "/recruiters",
    component: lazy(() => import("../views/pages/recruiters/CompaniesList")),
    layout: "sidebar",
    label: "Recruiters",
    icon: CompanyIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.recruiter.read],
    },
  },
  {
    path: "/candidates",
    component: lazy(() => import("../views/pages/candidates")),
    layout: "sidebar",
    label: "Candidates",
    icon: CandidateIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.user.read],
    },
  },
  {
    path: "/plans",
    component: lazy(() => import("../views/pages/settings/plans")),
    layout: "sidebar",
    label: "Plans",
    icon: SettingPlansIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.packages.read],
    },
  },
  {
    path: "/coupons",
    component: lazy(() => import("../views/pages/settings/coupon")),
    layout: "sidebar",
    label: "Coupons",
    icon: SettingCouponIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.coupon.read],
    },
  },
  {
    path: "divider-no-path",
    layout: "sidebar",
    group: "Manual",
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.manualRecruiter.read],
    },
  },
  {
    path: "/manual-recruiter",
    component: lazy(() => import("../views/pages/recruiters/manual")),
    layout: "sidebar",
    label: "Recuiters",
    icon: CompanyIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.manualRecruiter.read],
    },
  },
  {
    path: "divider-no-path",
    layout: "sidebar",
    group: "Admin",
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.adminUser.read, ACTIONS.adminRole.read],
    },
  },
  {
    path: "/admin-roles",
    component: lazy(() => import("../views/pages/admin/roles")),
    layout: "sidebar",
    label: "Roles",
    icon: UserRolesIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.adminRole.read],
    },
  },
  {
    path: "/admin-users",
    component: lazy(() => import("../views/pages/admin/users")),
    layout: "sidebar",
    label: "Users",
    icon: UserSettingIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.adminUser.read],
    },
  },
  {
    path: "/admin-users/add",
    component: lazy(() => import("../views/pages/admin/users/AddUser")),
    layout: "main",
    label: "Add User",
  },
  {
    path: "/admin-roles/add",
    component: lazy(() => import("../views/pages/admin/roles/AddRole")),
    layout: "main",
    label: "Add Role",
  },
  {
    path: "/candidates/:id",
    component: lazy(() => import("../views/pages/candidates/view")),
    layout: "main",
    label: "Candidate View",
  },
  {
    path: "/recruiters/:id/view",
    component: lazy(() => import("../views/pages/recruiters/view")),
    layout: "main",
    label: "Recruiters View",
  },
  {
    path: "/plans/add-package",
    component: lazy(() => import("../views/pages/settings/plans/AddPackage")),
    layout: "main",
    label: "Add Package",
  },
  {
    path: "/settings/coupons/add",
    component: lazy(() => import("../views/pages/settings/coupon/AddCoupon")),
    layout: "main",
    label: "Add Coupon",
  },
  {
    path: "/plans/:id/view",
    component: lazy(() => import("../views/pages/settings/plans/ViewPackage")),
    layout: "main",
    label: "View Package",
  },
  {
    path: "/settings/coupons/:id/view",
    component: lazy(() => import("../views/pages/settings/coupon/ViewCoupon")),
    layout: "main",
    label: "View Coupon",
  },
  {
    path: "/manual-recruiter/:id",
    component: lazy(() => import("../views/pages/recruiters/manual/view")),
    layout: "main",
    label: "Manual Recruiter View",
  },
  {
    path: "/manual-recruiter/add",
    component: lazy(() => import("../views/pages/recruiters/manual/AddManualRecruiter")),
    layout: "main",
    label: "Manual Recruiter Add",
  },
  {
    path: "/manual-recruiter/requirement/:id/add",
    component: lazy(() => import("../views/pages/recruiters/manual/view/requirements/AddRequirement")),
    layout: "main",
    label: "Manual Recruiter Requirement Add",
  },
  {
    path: "/manual-recruiter/requirement/:id/view",
    component: lazy(() => import("../views/pages/recruiters/manual/view/requirements/view")),
    layout: "main",
    label: "Requirement View",
  },
  {
    path: "/manual-recruiter/requirement/resume/:id/add",
    component: lazy(() => import("../views/pages/recruiters/manual/view/requirements/view/AddResume")),
    layout: "main",
    label: "Add Resume",
  },
];
