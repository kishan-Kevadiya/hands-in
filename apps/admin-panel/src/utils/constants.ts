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
  COMPANY: {
    ALL: "company-all",
    ONE: "company-one",
    COUNT: "company-count",
    JOBS: "company-jobs",
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
});

export const ACTIONS = Object.freeze({
    company: {
        read: "company.read",
        create: "company.create",
        update: "company.update",
        delete: "company.delete",
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
    discount: {
        read: "discount.read",
        create: "discount.create",
        update: "discount.update",
        delete: "discount.delete",
    },
    subscription: {
        read: "subscription.read",
    },
});
