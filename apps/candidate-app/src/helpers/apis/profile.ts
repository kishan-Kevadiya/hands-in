/* <-------- Profile APIs --------> */

import { ApiResponse } from "@/types/apiResponse";
import { ApiGet } from "../api-helper";
import { GetProfileResponse, GetRolesResponse } from "@/types/profileSetup.types";

/* <-------- Get Profile --------> */

export const getProfile = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetProfileResponse>>(
            "/user"
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
};


/* <-------- Get Roles --------> */

export const getRoles = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetRolesResponse>>(
            "/role"
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
};