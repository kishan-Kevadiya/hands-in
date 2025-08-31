import axios from "axios"
const BASE_URL = 'http://10.59.22.114:5000'

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

export const enhancePrompt = async (query: string) : Promise<EnhancePromptResponse> => {
  const response = await axios.post(`${BASE_URL}/enhance_prompt`, {
    query: query,  
  });

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
