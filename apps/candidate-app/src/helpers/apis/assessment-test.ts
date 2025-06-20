/* <------ Assessment Test APIs -------> */

import { ApiResponse } from "@/types/apiResponse";
import { ApiGet, ApiPut } from "../api-helper";
import { GetTestQuestionsResponse, SubmitTestRequest, SubmitTestResponse } from "@/types/assessment-test.types";


/* <------ Get test questions ------> */

export const getTestQuestions = async (roleId: string) => {
    try {
        const response = await ApiGet<ApiResponse<GetTestQuestionsResponse>>(
            `/questions/${roleId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


/* <------ Submit test answers ------> */

export const submitTestAnswers = async ({ testId, userResponses }: SubmitTestRequest) => {
    try {
        const response = await ApiPut<ApiResponse<SubmitTestResponse>>(
            `/test/submit`, { testId, userResponses });
        return response;
    } catch (error) {
        console.error(error);
    }
}