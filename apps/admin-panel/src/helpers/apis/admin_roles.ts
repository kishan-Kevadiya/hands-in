import api from "../axios";

const create = async (data: any) => {
  const response = await api.post("/admin-role/create", data);
  return response.data;
};

const getPermissions = async () => {
  const response = await api.get("/admin-role/role-permissions");
  return response.data;
};

const getAll = async (filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await api.get("/admin-role/get", {
    params: {
      ...filters,
    },
  });
  return response.data;
};

const deleteRoles = async (id: string) => {
  const response = await api.delete("/admin-role/remove", {
    params: {
      id,
    },
  });
  return response.data;
};

export const adminRolesApi = {
  getAll,
  create,
  deleteRoles,
  getPermissions,
};
