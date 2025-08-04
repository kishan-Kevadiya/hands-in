import api from "../axios";

const searchRoles = async (filters?: {
  search?: string;
}) => {
  const response = await api.get("/roles", {
    params: {
      search: filters?.search,
    },
  });
  return response.data;
};


export const rolesApis = { searchRoles }