import api from "../axios";

const getByUserId = async (filters: {
  userId: string;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const { userId, ...params } = filters;
  const response = await api.get("/user-jobs/" + userId, {
    params,
  });
  return response.data;
};

export const userJobsApis = {
  getByUserId,
};
