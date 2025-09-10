import { LOGIN } from "@/routes";
import axios from "axios"
import { useNavigate } from "react-router";
//  const navigate = useNavigate();
const BASE_URL = 'https://saral-ai-api.headsin.co/api/v1/api/v1'
// const BASE_URL = import.meta.env.VITE_API_BASE_URL
const USER_ID = localStorage.getItem("user_id") ?? ' 5733c87a-3bef-49b7-a248-4b4c54c7b781'; 

// if (!USER_ID) {
//  navigate(LOGIN)
// }

export interface HealthCheckResponse {
  status: string;   
  message: string;
}

export interface EnhancePromptResponse {
  success: boolean;
  enhanced_query: string;
}

export interface SearchProfilesResponse {
  success: boolean;
  matched_profiles: {
    name: string;
    headline: string;
    experience: string;
    location: string;
    linkedin_url: string;
    score: number;
  }[];
  unmatched_profiles: any[];
  matched_count: number;
  unmatched_count: number;
  current_page: number;
  total_pages: number;
  total_results: number;
  parsed_data: Record<string, any>;
  has_next: boolean;
  has_prev: boolean;
}

export const healthCheck = async (): Promise<HealthCheckResponse> => {
  const response = await axios.get<HealthCheckResponse>(`${BASE_URL}/health`);
  return response.data;
};

export const enhancePrompt = async (query: string): Promise<EnhancePromptResponse> => {

  const response = await axios.post(
    `${BASE_URL}/ai-query/enhance`,
    { prompt: query }, 
    {
      headers: {
        "X-User-ID": USER_ID,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const searchProfiles = async (
  query: string,
  page: number = 0
): Promise<SearchProfilesResponse> => {
  const response = await axios.post<SearchProfilesResponse>(`${BASE_URL}/search`, {
    query,
    page,
  });

  return response.data;
};

export interface SearchHistoryItem {
  id: string;
  query_text: string;
  total_results: number;
  created_at: string;
}

export interface SearchHistoryResponse {
  data: SearchHistoryItem[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}


export const getSearchHistory = async (
  page: number,
  limit: number,
  profileId: number
): Promise<SearchHistoryResponse> => {
  const response = await axios.get(`${BASE_URL}/search-history`, {
    headers: {
      "X-User-ID": USER_ID,
      "Content-Type": "application/json",
    },
    params: {
      page,
      limit,
      profile_id: profileId, 
    },
  });

  return response.data;
};

export const getSearchHistoryResults = async (
  searchId: string
): Promise<any> => {
  const response = await axios.get<any>(
    `${BASE_URL}/search-history/results`,
    {
      headers: {
        "X-User-ID": USER_ID,
        "Content-Type": "application/json",
      },
      params: {
        search_id: searchId,
      },
    }
  );

  return response.data;
};


export interface DeleteSavedProfileResponse {
  message: string;
  error?: string;
}


export const deleteSavedProfile = async (
  profileId: number,
  id: number
): Promise<DeleteSavedProfileResponse> => {
  try {
    const response = await axios.delete<DeleteSavedProfileResponse>(
      `${BASE_URL}/saved-profile/${id}`,
      {
        headers: {
          "X-User-ID": USER_ID,
          "Content-Type": "application/json",
        },
        data: { profile_id: profileId },
      }
    );

    return response.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "delete_failed",
        message: error.message,
      }
    );
  }
};


export interface SavedProfileData {
  id: number;
  user_id: string;
  profile_id: number;
  saved_at: string;
}

export interface CreateSavedProfileSuccess {
  data: SavedProfileData;
  message: string;
}

export interface CreateSavedProfileError {
  error: string;
  message: string;
}

export type CreateSavedProfileResponse =
  | CreateSavedProfileSuccess
  | CreateSavedProfileError;


  export const createSavedProfile = async (
  profileId: number
): Promise<CreateSavedProfileResponse> => {
  try {
    const response = await axios.post<CreateSavedProfileResponse>(
      `${BASE_URL}/saved-profile`,
      { profile_id: profileId },
      {
        headers: {
          "X-User-ID": USER_ID,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "creation_failed",
        message: error.message,
      }
    );
  }
};
export interface ExperienceItem {
  logo?: string;
  title: string;
  caption: string;
  metadata: string;
  subtitle: string;
  breakdown: boolean;
  companyId?: string;
  companyUrn?: string;
  companyLink1?: string;
  subComponents: Array<{ description: any[] }>;
}

export interface SavedProfile {
  id: number;
  user_id: string;
  profile_id: number;
  saved_at: string;
  name: string;
  email: string;
  location: string;
  skills: string; 
  experience: string; 
  profile_pic: string;
  linkedin_url: string;
  is_complete: boolean;
  headline: string;
  created_at: string;
  about: string;
}

export interface SavedProfilesResponse {
  data: SavedProfile[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface DeleteSavedProfileError {
  error: string;
  message: string;
}


export const getSavedProfiles = async (
  page = 1,
  limit = 10
): Promise<SavedProfilesResponse> => {
  const response = await axios.get<SavedProfilesResponse>(
    `${BASE_URL}/saved-profile?page=${page}&limit=${limit}`,
    {
      headers: {
        "X-User-ID": USER_ID,
      },
    }
  );

  return response.data;
};