import { ApiResponse } from "@/types/apiResponse";
import { ApiGet, ApiPatch, ApiPost } from "../api-helper";
import { GetAuthUserResponse, GetGoogleAuthUrlRequest } from "@/types/auth.types";

/* <----- Register -----> */
export const createUser = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
        const result = await ApiPost<ApiResponse<string>>(
            "/user/register",
            { firstName, lastName, email, password }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
};

/* <----- Login -----> */
export const loginUser = async (email: string, password: string) => {
    try {
        const result = await ApiPost<ApiResponse<{ isEmailVerified: boolean }>>(
            "/user/login",
            { email, password }
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/* <----- Email Verification -----> */
export const sendVerificationMail = async (email: string) => {
    try {
        const result = await ApiPost<ApiResponse<string>>(
            `/user/send-email-verification`,
            { email }
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};


/* <----- Login Otp Verification -----> */
export const verifyOtp = async (email: string, otp: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/user/verify-email`,
            { email, otp }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
};

/* <----- Forgot Password Otp Verification -----> */
export const forgotPasswordVerifyOtp = async (email: string, otp: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/user/forgot-password-verify-otp`,
            { email, otp }
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}


/* <----- Forgot Password -----> */
export const forgotPassword = async (password: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/user/forgot-password`,
            { password }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
}

/* <----- Reset Password -----> */
export const resetPassword = async (oldPassword: string, newPassword: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/user/reset-password`,
            { oldPassword, newPassword }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
}

/* <----- Logout -----> */
export const logoutUser = async () => {
    try {
        const result = await ApiGet<ApiResponse<string>>(
            "/user/logout"
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};

/* <----- Get user -----> */
export const getUser = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetAuthUserResponse>>(
            "/user/auth"
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const getGoogleAuthUrl = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetGoogleAuthUrlRequest>>(
            "/user/google/url"
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const getLinkedinAuthUrl = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetGoogleAuthUrlRequest>>(
            "/user/linkedin/url"
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}