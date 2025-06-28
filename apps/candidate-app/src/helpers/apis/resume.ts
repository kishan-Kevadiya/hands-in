/* <----- Resume APIs -----> */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://5530-150-107-241-196.ngrok-free.app/api/v1';

import { ApiResponse } from "@/types/apiResponse";
import { GetResumeResponse } from "@/types/resumeSetupField.types";
import { ApiGet, ApiPutFormData } from "../api-helper";

/* <----- Get Resume -----> */

export const getResume = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetResumeResponse>>(
            "/resume"
        );
        return result.data || null;
    } catch (error) {
        console.error(error);
    }
};

/* <----- Create Resume -----> */

export const createResume = async (formdata: FormData) => {
    try {
        const result = await ApiPutFormData<ApiResponse<string>>(
            "/resume",
            formdata
        );
        return result;
    } catch (error) {
        console.error(error);
    }
};


/* <----- Get Resume Link -----> */
export const getResumePdfLink = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/resume-link`,
            {
                credentials: "include",
            }
        );

        const blob = await response.blob();
        const file = new File([blob], "resume.pdf", {
            type: "application/pdf",
        });

        return URL.createObjectURL(file);
    } catch (error) {
        console.error(error);
    }
};
