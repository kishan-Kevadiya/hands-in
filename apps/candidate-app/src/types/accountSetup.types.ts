/* <----- Types for account setup page -----> */

import { z } from "zod";
import { FileType, ImageMetaData } from "./general.types";


export enum Gender {
    male = "MALE",
    female = "FEMALE",
}

export enum JobType {
    contract = "CONTRACT",
    parttime = "PARTTIME",
    fulltime = "FULLTIME",
}

/* <----- Types for personal information  -----> */
export const personalInformationSchema = z.object({
    logo: z.union([z.instanceof(File), ImageMetaData], { required_error: "Image is required" }).nullable(),
    firstName: z.string().nonempty("First Name is required").min(2, "First Name must be at least 2 characters").max(50, "First Name must be less than 50 characters"),
    lastName: z.string().nonempty("Last Name is required").min(2, "Last Name must be at least 2 characters").max(50, "Last Name must be less than 50 characters"),
    gender: z.nativeEnum(Gender, { message: "Gender is required" }),
    experience: z.number().default(0),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phone: z.string().nonempty("Phone Number is required"),
    bio: z.string().nonempty("Bio is required"),
    city: z.string().nonempty("City is required"),
    postalCode: z.string({ required_error: "Postal Code is required" }).min(6, "Pincode max 6 digits").max(6, "Pincode max 6 digits"),
    workPortfolio: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
});

export type PersonalInformationField = z.infer<typeof personalInformationSchema>;


/* <----- Types for education -----> */

export const educationSchema = z.object({
    educations: z.array(
        z.object({
            id: z.string().optional(),
            schoolName: z.string().nonempty("School Name is required"),
            degreeType: z.string().nonempty("Degree Type is required"),
            course: z.string().nonempty("Course is required"),
            startYear: z.date({ required_error: "Start Year is required" }),
            endYear: z.date({ required_error: "Start Year is required" }),
            isPresent: z.boolean().default(false),
        })
    ),
})

export type EducationField = z.infer<typeof educationSchema>;


/* <----- Types for experience -----> */

export const experienceSchema = z.object({
    experiences: z.array(
        z.object({
            id: z.string().optional(),
            jobTitle: z.string().nonempty("Job Title is required"),
            jobDescription: z.string().nonempty("Job Description is required").max(500, "Job Description must be less than 500 characters"),
            companyName: z.string().nonempty("Company Name is required").max(100, "Company Name must be less than 100 characters"),
            jobType: z.nativeEnum(JobType, { required_error: "Job Type is required" }),
            startYear: z.date({ required_error: "Start Year is required" }),
            endYear: z.date({ required_error: "Start Year is required" }),
            isCurrentlyWorking: z.boolean().default(false),
        })
    ),
})

export type ExperienceField = z.infer<typeof experienceSchema>;


/* <----- Types for Upload Resume Certificate -----> */

export const uploadResumeCertificateSchema = z.object({
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
    // .refine((file) => file && file instanceof File && file.type === "application/pdf", "Only PDF files are allowed"),
});

export type UploadResumeCertificateField = z.infer<typeof uploadResumeCertificateSchema>;


/* <----- Interface for account setup -----> */
export interface UserOnboardingPIRequest {
    profile_picture?: File | ImageMetaData;
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    city?: string;
    postalCode?: string;
    gender: Gender;
    website?: string;
    linkedIn?: string;
    roles?: {
        roleId: string;
        experience: number;
    }[];
    experience?: number;
    resume?: File | ImageMetaData;
}


/* <----- Interface for education -----> */
export interface PutEducationRequest {
    educations: {
        educationId?: string | null;
        schoolName: string;
        degreeType: string;
        course: string;
        startYear: string;
        endYear?: string | null;
    }[];
}

export interface EducationTable {
    id: string;
    instituteName: string;
    degreeType: string;
    course: string;
    startYear: string;
    endYear?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}


/* <----- Interface for work experience -----> */

export interface PutWorkExperienceRequest {
    workExperiences: {
        workExperienceId?: string | null;
        jobTitle: string;
        jobDescription: string;
        companyName: string;
        jobType: string;
        startYear: string;
        endYear?: string | null;
    }[];
}

export interface WorkExperienceTable {
    id: string;
    jobTitle: string;
    jobDescription: string;
    companyName: string;
    jobType: string;
    startYear: string;
    endYear?: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
