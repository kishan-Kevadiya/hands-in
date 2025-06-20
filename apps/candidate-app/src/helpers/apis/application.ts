/* <------ Applications APIs -------> */

/* <------ Get Applications ------ */

import { ApiResponse } from "@/types/apiResponse";
import { CreateApplicationRequest, GetJobsAndApplicationRequest, GetJobsAndApplicationResponse } from "@/types/jobs.types";
import { ApiGet, ApiPost } from "../api-helper";

export const getApplications = async ({ companyId, status, searchText, experience, workSchedule, workModel, minimumSalary, maximumSalary, workLocation, qualification, pageSize, page }: GetJobsAndApplicationRequest) => {
    try {
        let url = `/user/application?`

        if (page) {
            url += `&page=${page}`
        }
        if (pageSize) {
            url += `&pageSize=${pageSize}`
        }

        if (status) {
            status.map((item, index) => {
                url += `&status[${index}]=${item}`
            })
        }
        
        if (companyId) {
            url += `&companyId=${companyId}`
        }

        if (searchText) {
            url += `&searchText=${searchText}`
        }

        if (experience) {
            url += `&experience=${experience}`
        }

        if (workSchedule) {
            workSchedule.map((item, index) => {
                url += `&workSchedule[${index}]=${item}`
            })
        }

        if (workModel) {
            workModel.map((item, index) => {
                url += `&workModel[${index}]=${item}`
            })
        }

        if (minimumSalary) {
            url += `&minimumSalary=${minimumSalary}`
        }

        if (maximumSalary) {
            url += `&maximumSalary=${maximumSalary}`
        }

        if (workLocation) {
            url += `&workLocation=${workLocation}`
        }

        if (qualification) {
            url += `&qualification=${qualification}`
        }

        const response = await ApiGet<ApiResponse<GetJobsAndApplicationResponse>>(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCompanyApplications = async ({ companyId }: { companyId?: string }): Promise<GetJobsAndApplicationResponse | undefined> => {
    try {
        if (!companyId) return { data: [], totalCount: 0 };

        const data = await getApplications({ companyId: companyId });
        return data;
    } catch (error) {
        console.error(error);
    }
}


/* <------ Apply Application ------> */

export const applyApplication = async ({ jobId, resumeType }: CreateApplicationRequest) => {
    try {
        const response = await ApiPost<ApiResponse<string>>(
            `/application`
            , { jobId, resumeType });
        return response;
    } catch (error) {
        console.error(error);
    }
}