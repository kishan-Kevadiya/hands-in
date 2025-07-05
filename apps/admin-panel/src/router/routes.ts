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
  RevenueIcon
} from "@icons/index";

const OtherRoutes: RouteType[] = [
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
  {
    path: "/finances/add",
    component: lazy(() => import("../views/pages/finances/AddFinance")),
    layout: "main",
    label: "Add Finances"
  }
];

export const routes: RouteType[] = [
  {
    path: "/",
    component: lazy(() => import("../views/components/auth/Login")),
    layout: "auth",
    meta: {
      public: true,
    },
  },
  {
    path: "/login",
    component: lazy(() => import("../views/components/auth/Login")),
    layout: "auth",
    meta: {
      public: true,
    },
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../views/pages/dashboard")),
    label: "Dashboard",
    icon: DashboardIcon,
    meta: {
      inSidebar: true,
    },
  },
  {
    path: "/finances",
    component: lazy(() => import("../views/pages/finances")),
    label: "Finance",
    icon: RevenueIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.financialTransaction.read],
    },
  },
  {
    path: "/recruiters",
    component: lazy(() => import("../views/pages/recruiters/CompaniesList")),
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
    label: "Coupons",
    icon: SettingCouponIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.coupon.read],
    },
  },

  {
    path: "divider-no-path",
    group: "Manual",
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.manualRecruiter.read],
    },
  },
  {
    path: "/manual-recruiter",
    component: lazy(() => import("../views/pages/recruiters/manual")),
    label: "Manual Recuiters",
    icon: CompanyIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.manualRecruiter.read],
    },
  },
  {
    path: "divider-no-path",
    group: "Admin",
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.adminUser.read, ACTIONS.adminRole.read],
    },
  },
  {
    path: "/admin-roles",
    component: lazy(() => import("../views/pages/admin/roles")),
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
    label: "Users",
    icon: UserSettingIcon,
    meta: {
      inSidebar: true,
      permissions: [ACTIONS.adminUser.read],
    },
  },
  ...OtherRoutes
];
