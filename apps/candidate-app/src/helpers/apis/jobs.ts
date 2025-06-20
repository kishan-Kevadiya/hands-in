/* <------ Jobs APIs -------> */

/* <------ Get Jobs ------ */

import { ApiResponse } from "@/types/apiResponse";
import { GetCityListResponse, GetJobDetailsResponse, GetJobsAndApplicationRequest, GetJobsAndApplicationResponse, GetQualificationListResponse } from "@/types/jobs.types";
import { ApiGet, ApiPatch } from "../api-helper";

export const getJobs = async ({ companyId, searchText, onlySaved, experience, workSchedule, workModel, minimumSalary, maximumSalary, workLocation, qualification, pageSize, page }: GetJobsAndApplicationRequest) => {
    try {
        let url = `/user/job?page=${page}&pageSize=${pageSize}`

        if (companyId) {
            url += `&companyId=${companyId}`
        }
        if (searchText) {
            url += `&searchText=${searchText}`
        }

        if (onlySaved) {
            url += `&onlySaved=${onlySaved}`
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


/* <----- Save Job -----> */

export const saveJob = async (jobId: string) => {
    try {
        const response = await ApiPatch<ApiResponse<string>>(
            `/job/save/${jobId}`
            , {});
        return response;
    } catch (error) {
        console.error(error);
    }
}


/* <----- get job details -----> */

export const getJobDetails = async (jobId: string) => {
    try {
        const response = await ApiGet<ApiResponse<GetJobDetailsResponse>>(
            `/job/one/${jobId}`
        );
        if (response) {
            // clear jobId from local storage
            localStorage.removeItem("jobId");
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}


/* <----- Get Qualification List -----> */
export const getQualificationList = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetQualificationListResponse>>(
            `/system/qualification`
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}


/* <----- Get City List -----> */
export const getCityList = async () => {
    try {
        const result = await ApiGet<ApiResponse<GetCityListResponse>>(
            `/system/city`
        );
        return result.data;
    } catch (error) {
        console.error(error);
    }
}