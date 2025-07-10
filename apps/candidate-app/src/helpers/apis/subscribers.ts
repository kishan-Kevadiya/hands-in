import { ApiResponse } from "@/types/apiResponse";
import { ApiGet, ApiPatch } from "../api-helper";

export const unsubscribeMe = async (email: string, reasons?: string) => {
    try {
        const result = await ApiPatch<ApiResponse<string>>(
            `/subscribers`,
            { byEmail: email, reasons, data: { isSubscribed: false } },
            {
                headers: {
                    'X-Subscriber-Api-Key': import.meta.env.VITE_SUBSCRIBER_SECRET_KEY || ""
                }
            }
        );

        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getSubscriberByEmail = async (email: string) => {
    try {
        const result = await ApiGet<ApiResponse<string>>(
            `/subscribers/by-email?email=${email}`,
            {
                headers: {
                    'X-Subscriber-Api-Key': import.meta.env.VITE_SUBSCRIBER_SECRET_KEY || ""
                }
            }
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}