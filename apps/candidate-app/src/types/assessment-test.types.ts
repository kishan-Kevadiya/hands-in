/* <------ Assessment Test Types -----> */

/* <------ Assessment Test Questions Response -----> */

export enum Options {
    a = "a",
    b = "b",
    c = "c",
    d = "d",
}

export interface Question {
    id: string;
    question: string;
    answer: Options;
    a: string;
    b: string;
    c: string;
    d: string;
    selectedOption: Options | null;
}

export interface GetTestQuestionsResponse {
    testId: string,
    questions: Omit<Question, "answer">[],
    isTestGiven: boolean
}

/* <------ Submit Assessment Test Answers Request -----> */
export interface SubmitTestRequest {
    testId: string;
    userResponses: {
        questionId: string;
        selectedOption: Options;
    }[];
}

/* <------ Submit Assessment Test Answers Response -----> */

export type SubmitTestResponse = {
    obtainedMarks: number,
    roleName: string
}