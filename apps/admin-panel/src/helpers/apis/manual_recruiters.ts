import type { FiltersOptions } from "@src/types";
import api from "../axios";

const getAll = async (filters?: FiltersOptions) => {
    const response = await api.get("/manual-recruiters", {
        params: { ...filters },
    });
    return response.data;
};

const getById = async (id: number) => {
    const response = await api.get(`/manual-recruiters/${id}`);
    return response.data;
};

const create = async (data: any) => {
    const response = await api.post("/manual-recruiters", data);
    return response.data;
};

const getRequirementsByRecruiterId = async (id: number, filters: FiltersOptions) => {
    const response = await api.get(`/manual-recruiters/${id}/requirements`, { params: filters });
    return response.data;
};

const createRequirement = async (data: any) => {
    const response = await api.post("/manual-recruiters/requirements", data);
    return response.data;
};

const getRequirementById = async (requirementId: number) => {
    const response = await api.get(`/manual-recruiters/${requirementId}/requirement`);
    return response.data;
};

const addResumeToRequirement = async (requirementId: number, data: any) => {
    const response = await api.post(`/manual-recruiters/resume/${requirementId}`, data);
    return response.data;
};

const getResumesWithCommentsByRequirementId = async (requirementId: number, filters: FiltersOptions) => {
    const response = await api.get(`/manual-recruiters/resume/${requirementId}`, {
        params: filters
    });
    return response.data;
};

const addResume = async (requirementId: number, data: FormData) => {
    const response = await api.post(`/manual-recruiters/resume/${requirementId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

const addCommentToResume = async (resumeId: number, data: any) => {
    const response = await api.post(`/manual-recruiters/resume/${resumeId}/comment`, data);
    return response.data;
};

const getCommentsByResumeId = async (resumeId: number) => {
    const response = await api.get(`/manual-recruiters/resume/${resumeId}/comments`);
    return response.data;
};

export const manualRecruitersApis = {
    getAll,
    getById,
    create,
    getRequirementsByRecruiterId,
    createRequirement,
    getRequirementById,
    addResumeToRequirement,
    getResumesWithCommentsByRequirementId,
    addResume,
    addCommentToResume,
    getCommentsByResumeId
};
