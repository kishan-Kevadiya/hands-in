/* <----- Account Setup APIs -----> */

import { PutEducationRequest, PutWorkExperienceRequest, UserOnboardingPIRequest } from "@/types/accountSetup.types";
import { ApiResponse } from "@/types/apiResponse";
import { ApiDelete, ApiPostFormData, ApiPut, ApiPutFormData } from "../api-helper";

/* <----- Personal Information -----> */

export const UserOnboarding = async (formdata: FormData) => {
    try {
        const result = await ApiPutFormData<ApiResponse<UserOnboardingPIRequest>>(
            "/user/onboarding",
            formdata
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};


/* <----- Education -----> */

export const UserEducation = async (educationData: PutEducationRequest) => {
    try {
        const result = await ApiPut<ApiResponse<PutEducationRequest>>(
            "/user/education",
            educationData
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
};


/* <----- Work Experience -----> */

export const UserWorkExperience = async (experienceData: PutWorkExperienceRequest) => {
    try {
        const result = await ApiPut<ApiResponse<PutWorkExperienceRequest>>(
            "/user/work-experience",
            experienceData
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
};


/* <----- Upload Additional Documents -----> */

export const UserAdditionalDocuments = async (formdata: FormData) => {
    try {
        const result = await ApiPostFormData<ApiResponse<string>>(
            "/user/additional-document",
            formdata
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};


/* <----- Delete Additional Documents -----> */

export const UserDeleteAdditionalDocument = async (documentId: string) => {
    try {
        const result = await ApiDelete<ApiResponse<string>>(
            `/user/additional-document/${documentId}`
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};