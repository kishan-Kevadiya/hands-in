/* <----- Types for resume create page ----- /> */

import { z } from "zod";
import { ImageMetaData } from "./general.types";
import { Language } from "./jobs.types";

// resume create

export enum ResumeTemplateType {
    resume1 = "RESUME_1",
    resume2 = "RESUME_2",
    resume3 = "RESUME_3",
    resume4 = "RESUME_4",
    resume5 = "RESUME_5",
}

export const resumeEducationSchema = z.object({
    educations: z.object({
        id: z.string().optional(),
        schoolName: z.string().nonempty("School Name is required"),
        degreeType: z.string().nonempty("Degree Type is required"),
        course: z.string().nonempty("Course is required"),
        start_date: z.date({ required_error: "Start date is required" }),
        end_date: z.date({ required_error: "End date is required" }),
        isPresent: z.boolean().default(false),
    }).refine((data) => data.end_date >= data.start_date, {
        message: "End date must be greater than start date",
    })
})

export type resumeEducationField = z.infer<typeof resumeEducationSchema>;


export const resumeExperienceSchema = z.object({
    experiences: z.object({
        id: z.string().optional(),
        jobTitle: z.string().nonempty("Job Name is required"),
        jobDescription: z.string().nonempty("Job Description is required").max(500, "Job Description must be less than 500 characters"),
        companyName: z.string().nonempty("Company Name is required").max(100, "Company Name must be less than 100 characters"),
        jobType: z.string().nullable(),
        start_experience_date: z.date({ required_error: "Start date is required" }),
        end_experience_date: z.date({ required_error: "End date is required" }),
        isCurrentlyWorking: z.boolean().default(false),
    }).refine((data) => data.end_experience_date >= data.start_experience_date, { message: "End date must be greater than start date" }),

})

export type resumeExperienceField = z.infer<typeof resumeExperienceSchema>;


export const resumeSetupSchema = z.object({
    id: z.string().optional(),
    image: z.union([z.instanceof(File), ImageMetaData], { required_error: "Image is required" }).nullable(),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    portfolioUrl: z.string().url().optional().or(z.literal("")),
    otherUrl: z.string().url().optional().or(z.literal("")),
    soft_skills: z.array(z.string()).min(1, "At least one soft skill is required"),
    hard_skills: z.array(z.string()).min(1, "At least one hard skill is required"),
    languages: z.array(z.object({ language: z.string(), level: z.string() })).min(1, "At least one language is required"),
})

export type resumeSetupField = z.infer<typeof resumeSetupSchema>;

/* <----- Get resume response types -----> */

export type ResumeEducation = {
    school: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
}

export type ResumeExperience = {
    jobTitle: string;
    company: string;
    jobType: string;
    jobDescription: string | null;
    startDate: string;
    endDate: string;
}
export interface ResumeTable {
    id: string;
    templateType: ResumeTemplateType;
    image?: File | ImageMetaData;
    name: string;
    title: string;
    email: string;
    location: string;
    phone: string;
    linkedIn: string;
    portfolioLink: string;
    otherLink: string;
    educations: ResumeEducation[];
    experiences: ResumeExperience[];
    softSkills: string[];
    hardSkills: string[];
    languages: Language[];
    userId: string;
    createdAt: string;
    updatedAt: string;
}


export type GetResumeResponse = {
    resumeData: ResumeTable,
}