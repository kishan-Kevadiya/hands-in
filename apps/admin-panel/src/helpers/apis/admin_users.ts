import api from "../axios";

const loginUser = async (data: any) => {
  const response = await api.post("/admin-users/login", data);
  return response.data;
};

const logout = async () => {
  const response = await api.post("/admin-users/logout");
  return response.data;
};

const getAllUsers = async (filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await api.get("/admin-users/get-all", {
    params: filters,
  });
  return response.data;
};

const remove = async (id: string) => {
  const response = await api.delete("/admin-users/remove", {
    params: {
      id,
    },
  });
  return response.data;
};

const create = async (data: any) => {
  const response = await api.post("/admin-users/create", data);
  return response.data;
};

const userAuth = async () => {
  const response = await api.get("/admin-users/auth");
  return response.data;
};

export const adminUsersApis = {
  userAuth,
  getAllUsers,
  loginUser,
  logout,
  remove,
  create,
};
