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

// ** Company
const Company = lazy(() => import("../views/pages/recuiters/CompaniesList"));
const Company_View = lazy(() => import("../views/pages/recuiters/view"));

const User = lazy(() => import("../views/pages/candidates"));
const UserView = lazy(() => import("../views/pages/candidates/view"));

// ** User Routes
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
    component: Company,
    icon: CompanyIcon,
    permission: ACTIONS.company.read,
  },
  {
    path: "/candidates",
    layout: "sidebar",
    label: "Candidates",
    component: User,
    icon: CandidateIcon,
    permission: ACTIONS.user.read,
  },
  {
    path: "/plans",
    layout: "sidebar",
    label: "Plans",
    icon: SettingPlansIcon,
    component: Setting_Plans,
    permission: ACTIONS.packages.read,
  },
  {
    path: "/coupons",
    layout: "sidebar",
    label: "Coupons",
    icon: SettingCouponIcon,
    component: Setting_Coupon,
    permission: ACTIONS.coupon.read,
  },
   {
    path: "divider-no-path",
    layout: "sidebar",
    group: "Admin",
   },
   {
    path: "/admin-roles",
    layout: "sidebar",
    label: "Roles",
    icon: UserRolesIcon,
    component: AdminRoles,
    permission: ACTIONS.adminUser.read,
  },
  {
    path: "/admin-users",
    layout: "sidebar",
    label: "Users",
    icon: UserSettingIcon,
    component: AdminUsers,
    permission: ACTIONS.adminUser.read,
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
    path: "/users/:id",
    layout: "main",
    label: "User View",
    component: UserView,
  },
  {
    path: "/companies/:id/view",
    layout: "main",
    label: "Companies View",
    component: Company_View,
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
];
