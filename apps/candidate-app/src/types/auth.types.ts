/* <----- Types for auth pages ----- /> */

import { z } from "zod";

/* <----- Login ----- /> */
export const loginSchema = z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
});

export type LoginField = z.infer<typeof loginSchema>;


/* <----- Register ----- /> */
export const registerSchema = z.object({
    firstName: z.string().nonempty("First Name is required").min(2, "First Name must be at least 2 characters").max(50, "First Name must be less than 50 characters"),
    lastName: z.string().nonempty("Last Name is required").min(2, "Last Name must be at least 2 characters").max(50, "Last Name must be less than 50 characters"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special characters (@ $ ! % * ? & _)"),
    emailConsent: z.boolean().default(false),
});

export type RegisterField = z.infer<typeof registerSchema>;


/* <----- Email Verification ----- /> */
export const emailVerificationSchema = z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
});

export type EmailVerificationField = z.infer<typeof emailVerificationSchema>;


/* <----- Forgot Password ----- /> */
export const forgotPasswordSchema = z.object({
    newPassword: z.string().nonempty("New Password is required").min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special characters (@ $ ! % * ? & _)"),
    confirmNewPassword: z.string().nonempty("Confirm New Password is required").min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords does not match'
});

export type ForgotPasswordField = z.infer<typeof forgotPasswordSchema>;


/* <----- Reset Password ----- */
export const resetPasswordSchema = z.object({
    oldPassword: z.string().nonempty("Old Password is required"),
    newPassword: z.string().nonempty("New Password is required").min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special characters (@ $ ! % * ? & _)"),
    confirmNewPassword: z.string().nonempty("Confirm New Password is required").min(8, "Password must be at least 8 characters"),
}).refine((data) => data.oldPassword !== data.newPassword, {
    path: ['newPassword'],
    message: 'Old Password and New Password cannot be same',
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords does not match'
});

export type ResetPasswordField = z.infer<typeof resetPasswordSchema>;


/* <----- Get Auth User Response -----> */

export type RemainingProfileModules = {
    isPersonalInfoCompleted: boolean;
    isResumeUploaded: boolean;
    isWorkExperienceCompleted: boolean;
    isEducationCompleted: boolean;
    areRolesSelected: boolean;
}

export interface GetAuthUserResponse {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string;
    remainingProfileModules: RemainingProfileModules;
    bio: string | null;
    hasHeadsinResumeCreated: boolean;
    uploadedResumeName: string | null;
}

export type GetGoogleAuthUrlRequest = {
    authUrl: string;
}