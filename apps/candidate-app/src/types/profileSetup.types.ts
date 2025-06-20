/* <----- Types for account setup page ----- /> */

import { z } from "zod";
import { EducationTable, Gender, WorkExperienceTable } from "./accountSetup.types";
import { FileType, ImageMetaData } from "./general.types";


export interface GenderEnum {
    [Gender.male]: Gender.male;
    [Gender.female]: Gender.female;
}

/* <----- profile setup  ----- /> */
export const profileSetupSchema = z.object({
    profileImage: z.union([z.instanceof(File), ImageMetaData], { required_error: "Image is required" }).nullable(),
    firstName: z.string().nonempty("First Name is required").min(2, "First Name must be at least 2 characters").max(50, "First Name must be less than 50 characters"),
    lastName: z.string().nonempty("Last Name is required").min(2, "Last Name must be at least 2 characters").max(50, "Last Name must be less than 50 characters"),
    gender: z.nativeEnum(Gender, { required_error: "Gender is required" }),
    experience: z.number().default(0),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phone: z.string().nonempty("Phone Number is required"),
    bio: z.string().nonempty("Bio is required"),
    workPortfolio: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    city: z.string().nonempty("City is required"),
    postalCode: z.string({ required_error: "Postal Code is required" }).min(6, "Pincode min 6 digits").max(6, "Pincode max 6 digits"),
    educations: z.array(z.object({
        id: z.string().optional(),
        schoolName: z.string().nonempty("School Name is required"),
        degreeType: z.string().nonempty("Degree Type is required"),
        course: z.string().nonempty("Course is required"),
        startYear: z.date({ required_error: "Start Year is required" }),
        endYear: z.date({ required_error: "End Year is required" }).nullable(),
        isPresent: z.boolean().default(false),
    })),
    experiences: z.array(z.object({
        id: z.string().optional(),
        jobTitle: z.string().nonempty("Job Name is required"),
        jobDescription: z.string().nonempty("Job Description is required").max(500, "Job Description must be less than 500 characters"),
        companyName: z.string().nonempty("Company Name is required").max(100, "Company Name must be less than 100 characters"),
        jobType: z.string(),
        startYear: z.date({ required_error: "Start Year is required" }),
        endYear: z.date({ required_error: "End Year is required" }).nullable(),
        isCurrentlyWorking: z.boolean().default(false),
    })),
    resume: z.union([z.instanceof(File), FileType])
        .refine(
            (file) =>
                ["application/pdf",].includes(file.type),
            { message: "Invalid document file type" }
        ).nullable(),
    otherDocument: z.object({
        documentName: z.string().optional(),
        document: z.union([z.instanceof(File), ImageMetaData], { required_error: "Document is required" }).nullable().optional(),
    }).optional(),
    roles: z.array(z.object({
        roleId: z.string(),
        roleName: z.string(),
        experience: z.number(),
    })).optional(),
});

export type ProfileSetupField = z.infer<typeof profileSetupSchema>;


/* <----- get profile response type ----- /> */

export type OtherDoument = {
    id: string;
    name: string;
}
export interface UserProfileResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    isEmailVerified: boolean;
    password: string;
    phone: string;
    countryCode: string;
    bio: string;
    city: string;
    postalCode: string;
    avatar: File | ImageMetaData;
    resume: string;
    otherDocuments: OtherDoument[];
    experience: number;
    website: string;
    linkedIn: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetProfileResponse_Test {
    roleId: string;
    roleName: string;
    experience: number;
    obtainedMarks: number | null;
    canGiveTest: boolean
    canGiveTestDaysAfter: number
}

export interface GetProfileResponse {
    user: {
        resume: {
            id: string;
            name: string;
            url: string;
        } | null,
        otherDocuments: {
            id: string;
            url: string;
            name: string
        }[]
    } & Omit<UserProfileResponse, "resume" | "otherDocuments">,
    educations: EducationTable[],
    workExperiences: WorkExperienceTable[],
    tests: GetProfileResponse_Test[]
}

/* <----- get roles response type ----- /> */

export interface RoleTable {
    id: string;
    title: string;
    isTestGiven?: boolean;
    canGiveTest?: boolean
    canGiveTestDaysAfter?: number
}

export interface GetRolesResponse {
    roles: RoleTable[]
}
