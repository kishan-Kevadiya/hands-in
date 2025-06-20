import { ApiResponse } from "@/types/apiResponse";
import { GetCompaniesForChat, GetCompaniesForChatRequest, GetMessagesRequest, GetMessagesResponse, SendMessageRequest } from "@/types/message";
import { ApiGet, ApiPost } from "../api-helper";

export const getCompaniesForChat = async ({ searchText, page, pageSize }: GetCompaniesForChatRequest) => {
    try {
        let url = `/chat/companies?page=${page}&pageSize=${pageSize}`

        if (searchText) {
            url += `&searchText=${searchText}`
        }

        const response = await ApiGet<ApiResponse<GetCompaniesForChat>>(url);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getMessages = async ({ applicationId, page, pageSize }: GetMessagesRequest) => {
    if (applicationId === undefined) return
    try {
        let url = `/message?page=${page}&pageSize=${pageSize}`

        if (applicationId) {
            url += `&applicationId=${applicationId}`
        }

        const result = await ApiGet<ApiResponse<GetMessagesResponse>>(url);
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export const sendMessage = async (request: SendMessageRequest) => {
    try {
        const url = "/message"

        await ApiPost<ApiResponse<string>>(url, request)
    } catch (error) {
        console.error(error);
    }
}