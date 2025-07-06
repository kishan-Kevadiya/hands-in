import api from "../axios";


const getCountByTitle = async () => {
    const response = await api.get("/jobs/count-by-title");
    return response.data;
};

const getCountByDate = async (filters?: {
  startDate: string;
  endDate: string;
}) => {
  const response = await api.get("/jobs/jobs-count-by-date", {
    params: {
      ...filters,
    },
  });
  return response.data;
};


export const jobApis = {
    getCountByTitle,
    getCountByDate
}