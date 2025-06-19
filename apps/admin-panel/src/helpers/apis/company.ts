import api from "../axios";

const getAll = async (filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await api.get("/company/get", {
    params: {
      ...filters,
    },
  });
  return response.data;
};

const getCountByDate = async (filters?: {
  startDate: string;
  endDate: string;
}) => {
  const response = await api.get("/company/company-count-by-date", {
    params: {
      ...filters,
    },
  });
  return response.data;
};

const getCompanyJobs = async (companyId: string) => {
  const response = await api.get(`/company/${companyId}/jobs`);
  return response.data;
};

const getDaashboardDataCount = async () => {
  const response = await api.get(`/company/data-count`);
  return response.data;
};

const getCompanyById = async (companyId: string) => {
  const response = await api.get(`/company/${companyId}`);
  return response.data;
};

export const companyApis = {
  getAll,
  getCountByDate,
  getCompanyJobs,
  getDaashboardDataCount,
  getCompanyById,
};
