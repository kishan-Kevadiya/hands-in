import { ApiResponse } from "@/types/apiResponse";
import { ApiGet, ApiPatch } from "../api-helper";

export const unsubscribeMe = async (email: string, reasons?: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/subscribers`,
            { byEmail: email, reasons, data: { isSubscribed: false } }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getSubscriberByEmail = async (email: string) => {
    try {
        const result = await ApiGet<ApiResponse<string>>(
            `/subscribers/by-email?email=${email}` ,
        );

        return result;
    } catch (error) {
        console.error(error);
    }
}