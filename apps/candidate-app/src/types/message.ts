
export interface GetCompaniesForChatRequest {
    searchText?: string;
    pageSize: number;
    page: number;
}

export type GetCompaniesForChat = {
    companies: {
        companyId: string;
        companyName: string | null;
        logo: string ;
        messageMetadata: {
            latestMessage: string | null;
            latestMessageTime: string | null;
            unreadCount: number;
        }
    }[];
    totalCount: number;
}

export interface GetMessagesRequest {
    applicationId?: string;
    pageSize: number;
    page: number;
}

export enum UserType {
    user = "USER",
    company = "COMPANY",
};

export interface Message {
    id?: string;
    message: string;
    sender: UserType;
    createdAt?: string;
}

export type GetMessagesResponse = {
    messages: Message[];
    companyLogo: string | null;
    totalCount: number;
}

export type SendMessageRequest = {
    applicationId: string;
    message: string;
}