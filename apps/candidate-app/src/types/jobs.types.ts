/* <----- Types for jobs  page -----> */

import { EducationTable, WorkExperienceTable } from "./accountSetup.types";
import { RoleTable } from "./profileSetup.types";
import { ResumeTable } from "./resumeSetupField.types";

export enum ApplicationStatus {
    pending = "PENDING",
    shortListed = "SHORT_LISTED",
    accepted = "ACCEPTED",
    rejected = "REJECTED"
}

export enum JobType {
    contract = "CONTRACT",
    parttime = "PARTTIME",
    fulltime = "FULLTIME",
}

export const jobTypeObj = {
    CONTRACT: "Contract",
    PARTTIME: "Part-time",
    FULLTIME: "Full Time",
}

export enum WorkModel {
    onsite = "ONSITE",
    hybrid = "HYBRID",
    remote = "REMOTE",
}

export enum SalaryPeriod {
    month = "MONTH",
    year = "YEAR",
}


export enum IncentivePeriod {
    month = "MONTH",
    year = "YEAR",
}

export enum Gender {
    male = "MALE",
    female = "FEMALE",
}

export enum LanguageProficiency {
    beginner = "BEGINNER",
    intermediate = "INTERMEDIATE",
    proficient = "PROFICIENT"
}

export interface Language {
    language: string,
    proficiency: LanguageProficiency
}

/* <----- Jobs And Application request -----> */

export interface GetJobsAndApplicationRequest {
    companyId?: string;
    status?: ApplicationStatus[];
    searchText?: string;
    onlySaved?: boolean;
    workSchedule?: JobType[];
    workModel?: WorkModel[];
    experience?: number;
    minimumSalary?: number;
    maximumSalary?: number;
    workLocation?: string;
    qualification?: string;
    pageSize?: number;
    page?: number;
}


/* <----- Jobs And Application response -----> */

export interface JobTable {
    id: string;
    title: string;
    description: string;
    jobType: JobType;
    vacancy: number;
    minimumSalary?: number;
    maximumSalary?: number;
    salaryPeriod?: SalaryPeriod;
    incentiveAmount?: number;
    incentivePeriod?: IncentivePeriod;
    expiry: string;
    isExpired: boolean;
    experience: number;
    workModel: WorkModel;
    location?: string;
    gender?: Gender;
    requiredQualification: string[];
    hardSkills: string[];
    softSkills: string[];
    languages?: Language[];
    perks: string[];
    companyId: string;
    createdAt: string;
    updatedAt: string;
}
export interface JobData {
    job: JobTable,
    application: {
        id: string,
        status: ApplicationStatus
    } | null,
    applicationCount: number,
    company: {
        linkedIn: string,
        logo: string,
        images: string[]
        name: string
    },
    isSaved: boolean,
    messageCount: number,
    matchedRoles: RoleTable[],
}

export interface GetJobsAndApplicationResponse {
    data: JobData[],
    totalCount: number
}

export interface CompanyTable {
    id: string;
    email: string;
    password: string;
    companyName: string;
    phone: string | null;
    countryCode: string | null;
    description: string | null;
    address: string | null;
    postalCode: string | null;
    gst: string | null;
    isEmailVerified: boolean;
    logo: string;
    website: string;
    employeeSize: number | null;
    linkedin: string;
    twitter: string;
    companyImages: string[];
    isOnboardingCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}

/* <----- get job details response -----> */
export type SubmissionSnapshot = {
    job: JobTable,
    user: {
        id: string,
        email: string,
        firstName: string,
        lastName: string,
        avatar: string
    },
    testDetails: {
        score: number,
        experience: number,
        strenghs: string | null,
        growthAreas: string | null
    }
    educations: EducationTable[],
    workExperiences: WorkExperienceTable[],
    headsInResume: ResumeTable | null,
}

export type GetJobDetailsResponse = {
    job: JobTable,
    application: {
        id: string,
        status: ApplicationStatus,
        submissionSnapShot: SubmissionSnapshot
    } | null,
    isSaved: boolean,
    totalApplicationCount: number,
    company: CompanyTable,
    matchedRoles: RoleTable[],
}

/* <----- Create Application Request -----> */

export enum ResumePlatformType {
    headsInResume = "HEADS_IN_RESUME",
    uploadedResume = "UPLOADED_RESUME"
}

export interface CreateApplicationRequest {
    jobId: string;
    resumeType: ResumePlatformType;
}

/* <----- Get Qualification List Response Types[Start] -----> */
export interface GetQualificationListResponse {
    qualifications: string[];
}
/* <----- Get Qualification List Response Types[End] -----> */


/* <----- Get City List Response Types[Start] -----> */
export interface GetCityListResponse {
    cities: string[];
}
/* <----- Get City List Response Types[End] -----> */