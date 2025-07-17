export const QUERY_KEYS = Object.freeze({
  AUTH: {
    USER: "auth-user",
    LOGIN: "auth-login",
    LOGOUT: "auth-logout",
    CHECK_AUTH: "auth-check",
  },
  ADMIN: {
    USERS: "admin-users",
    ROLES: "admin-roles",
  },
  RECRUITER: {
    // changed from COMPANY to RECRUITER
    ALL: "recruiter-all",
    ONE: "recruiter-one",
    COUNT: "recruiter-count",
    JOBS: "recruiter-jobs",
  },
  JOBS: {
    COUNT_BY_TITLE: "count-by-title",
    COUNT_BY_DATE: "count-by-date",
  },
  USER: {
    ALL: "users-all",
    ONE: "users-one",
    COUNT: "users-count",
    JOBS: "users-jobs",
    DELETE: "users-remove",
  },
  ROLES: {
    PERMISSIONS: "roles-permissions",
  },
  PACKAGES: {
    CREATE: "packages-create",
    READ: "packages-read",
    ONE: "packages-one",
    DELETE: "packages-remove",
  },
  COUPONS: {
    CREATE: "coupons-create",
    READ: "coupons-read",
    ONE: "coupons-one",
  },
  MANUAL_RECRUITER: {
    CREATE: "manual-recruiter-create",
    READ: "manual-recruiter-read",
    ONE: "manual-recruiter-one",
    DELETE: "manual-recruiter-remove",
    REQ_ONE: "manual-requirement-one",
    REQ_READ: "manual-requirement-read",
    REQ_CREATE: "manual-requirement-create",
    REQ_RESUME_READ: "manual-requirement-resume-read",
    REQ_RESUME_CREATE: "manual-requirement-resume-create",
    REQ_RESUME_COMMENT_READ: "manual-requirement-resume-comment-read",
    REQ_RESUME_COMMENT_CREATE: "manual-requirement-resume-comment-create",
  },
  FINANCES: {
    READ: "finances-read",
    CREATE: "finances-create",
    ANALYTICS: "finances-analytics",
  },
});

export const ACTIONS = Object.freeze({
  recruiter: {
    read: "recruiter.read",
    create: "recruiter.create",
    update: "recruiter.update",
    delete: "recruiter.delete",
  },
  manualRecruiter: {
    read: "manualRecruiter.read",
    create: "manualRecruiter.create",
    update: "manualRecruiter.update",
    delete: "manualRecruiter.delete",
  },
  financialTransaction: {
    read: "financialTransaction.read",
    create: "financialTransaction.create",
    update: "financialTransaction.update",
    delete: "financialTransaction.delete",
  },
  userJob: {
    read: "user:job.read",
  },
  user: {
    read: "user.read",
    create: "user.create",
    update: "user.update",
    delete: "user.delete",
  },
  adminUser: {
    read: "admin:user.read",
    create: "admin:user.create",
    update: "admin:user.update",
    delete: "admin:user.delete",
  },
  adminRole: {
    read: "admin:role.read",
    create: "admin:role.create",
    update: "admin:role.update",
    delete: "admin:role.delete",
  },
  packages: {
    read: "package.read",
    create: "package.create",
    update: "package.update",
    delete: "package.delete",
  },
  coupon: {
    read: "coupon.read",
    create: "coupon.create",
    update: "coupon.update",
    delete: "coupon.delete",
  },
  subscription: {
    read: "subscription.read",
  },
  reviews: {
    read: "reviews.read",
  },
});

// PHone types
export const PhoneTypes = ["personal", "office", "whatsapp", "other"];

export const TransactionType = ["expense", "revenue"];

export const PriorityTypes = ["high", "medium", "low"];

// ** Assets ** //
export const ASSETS = Object.freeze({
  RESUMES: "assets/resumes",
});
