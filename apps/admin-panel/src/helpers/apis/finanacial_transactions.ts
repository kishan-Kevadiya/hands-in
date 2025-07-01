import type { FiltersOptions } from "@src/types";
import api from "../axios";

const getAll = async (filters?: FiltersOptions) => {
  const response = await api.get("/financial-transactions", {
    params: {
      ...filters,
    },
  });
  return response.data;
};

const create = async (data: any) => {
  const response = await api.post("/financial-transactions", data);
  return response.data;
};

const getSummary = async () => {
  const response = await api.get("/financial-transactions/summary");
  return response.data;
};


const removeTransaction = async (id: string) => {
  const response = await api.delete("/financial-transactions", {
    params: {
      id,
    },
  });
  return response.data;
};

export const financialTransactionsApis = {
  getAll,
  create,
  getSummary,
  removeTransaction
};
