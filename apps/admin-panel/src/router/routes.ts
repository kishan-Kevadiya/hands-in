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
  UserSettingIcon
} from "@icons/index";

const Login = lazy(() => import("../views/components/auth/Login"));

const Dashboard = lazy(() => import("../views/pages/dashboard"));

// ** Recruiter
const Recruiter = lazy(() => import("../views/pages/recruiters/CompaniesList"));

const ManualRecuiter = lazy(() =>
  import("../views/pages/recruiters/manual"),
);
const ManualRecruiterView = lazy(() =>
  import("../views/pages/recruiters/manual/view"),
);
const AddManualRecruiter = lazy(() =>
  import("../views/pages/recruiters/manual/AddManualRecruiter"),
);

const AddManualRecruiterRequirement = lazy(() =>
  import("../views/pages/recruiters/manual/view/requirements/AddRequirement"),
);

const ViewManualRecruiterRequirement = lazy(() =>
  import("../views/pages/recruiters/manual/view/requirements/view"),
);

const AddResumeToRequirement = lazy(() =>
  import("../views/pages/recruiters/manual/view/requirements/view/AddResume"),
);

const Recruiter_View = lazy(() => import("../views/pages/recruiters/view"));

// ** Candidate (was User)
const Candidate = lazy(() => import("../views/pages/candidates"));
const CandidateView = lazy(() => import("../views/pages/candidates/view"));

// ** Admin Routes
const AdminUsers = lazy(() => import("../views/pages/admin/users"));
const AddUser = lazy(() => import("../views/pages/admin/users/AddUser"));

const AdminRoles = lazy(() => import("../views/pages/admin/roles"));
const AddRole = lazy(() => import("../views/pages/admin/roles/AddRole"));

// ** Setting
const Setting_Plans = lazy(() => import("../views/pages/settings/pricing"));
const Setting_View_Pricing = lazy(
  () => import("../views/pages/settings/pricing/ViewPackage"),
);
const Setting_Pricing_AddPackage = lazy(
  () => import("../views/pages/settings/pricing/AddPackage"),
);
const Setting_Coupon = lazy(() => import("../views/pages/settings/coupon"));
const Setting_Coupon_Add = lazy(
  () => import("../views/pages/settings/coupon/AddCoupon"),
);
const Setting_View_Coupon = lazy(
  () => import("../views/pages/settings/coupon/ViewCoupon"),
);

// Public routes (shown before login)
export const publicRoutes: RouteType[] = [
  {
    path: "/login",
    component: Login,
    layout: "auth",
  },
];

export const SidebarRoutes: RouteType[] = [
  {
    path: "/dashboard",
    layout: "sidebar",
    component: Dashboard,
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/recruiters",
    layout: "sidebar",
    label: "Recruiters",
    component: Recruiter,
    icon: CompanyIcon,
    permission: [ACTIONS.recruiter.read],
  },
  {
    path: "/candidates",
    layout: "sidebar",
    label: "Candidates",
    component: Candidate,
    icon: CandidateIcon,
    permission: [ACTIONS.user.read],
  },
  {
    path: "/plans",
    layout: "sidebar",
    label: "Plans",
    icon: SettingPlansIcon,
    component: Setting_Plans,
    permission: [ACTIONS.packages.read],
  },
  {
    path: "/coupons",
    layout: "sidebar",
    label: "Coupons",
    icon: SettingCouponIcon,
    component: Setting_Coupon,
    permission: [ACTIONS.coupon.read],
  },
    {
    path: "divider-no-path",
    layout: "sidebar",
    group: "Manual",
   },
   {
    path: "/manual-recruiter",
    layout: "sidebar",
    label: "Recuiters",
    icon: CompanyIcon,
    component: ManualRecuiter,
    permission: [ACTIONS.manualRecruiter.read],
  },
   {
    path: "divider-no-path",
    layout: "sidebar",
    group: "Admin",
    permission: [ACTIONS.adminUser.read, ACTIONS.adminRole.read],
   },
   {
    path: "/admin-roles",
    layout: "sidebar",
    label: "Roles",
    icon: UserRolesIcon,
    component: AdminRoles,
    permission: [ACTIONS.adminUser.read],
  },
  {
    path: "/admin-users",
    layout: "sidebar",
    label: "Users",
    icon: UserSettingIcon,
    component: AdminUsers,
    permission: [ACTIONS.adminUser.read],
  },
];

// Private routes (shown after login)
export const privateRoutes: RouteType[] = [
  ...SidebarRoutes,
  {
    path: "/admin/users/add",
    layout: "main",
    label: "Add User",
    component: AddUser,
  },
  {
    path: "/admin/roles/add",
    layout: "main",
    label: "Add Role",
    component: AddRole,
  },
  {
    path: "/candidates/:id",
    layout: "main",
    label: "Candidate View",
    component: CandidateView,
  },
  {
    path: "/recruiters/:id/view",
    layout: "main",
    label: "Recruiters View",
    component: Recruiter_View,
  },
  {
    path: "/settings/pricing/add-package",
    layout: "main",
    label: "Add Package",
    component: Setting_Pricing_AddPackage,
  },
  {
    path: "/settings/coupons/add",
    layout: "main",
    label: "Add Coupon",
    component: Setting_Coupon_Add,
  },
  {
    path: "/settings/pricing/:id/view",
    layout: "main",
    label: "View Package",
    component: Setting_View_Pricing,
  },
  {
    path: "/settings/coupons/:id/view",
    layout: "main",
    label: "View Coupon",
    component: Setting_View_Coupon,
  },
    {
    path: "/manual-recruiter/:id",
    layout: "main",
    label: "Manual Recruiter View",
    component: ManualRecruiterView,
  },
    {
    path: "/manual-recruiter/add",
    layout: "main",
    label: "Manual Recruiter Add",
    component: AddManualRecruiter,
  },
  {
    path: "/manual-recruiter/requirement/:id/add",
    layout: "main",
    label: "Manual Recruiter Requirement Add",
    component: AddManualRecruiterRequirement,
  },
  {
    path: "/manual-recruiter/requirement/:id/view",
    layout: "main",
    label: "Requirement View",
    component: ViewManualRecruiterRequirement,
  },
  {
    path: "/manual-recruiter/requirement/resume/:id/add",
     layout: "main",
    label: "Add Resume",
    component: AddResumeToRequirement,
  }
];
