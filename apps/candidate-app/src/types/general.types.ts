import { z } from "zod";
import { JobType } from "./accountSetup.types";
import { WorkModel } from "./jobs.types";

export const ImageMetaData = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
})

export type ImageMetaData = z.infer<typeof ImageMetaData>;

/* File */
export const FileType = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    size: z.number(),
    url: z.string(),
});

export type FileType = z.infer<typeof FileType>;


/* Filter */

export const FilterType = z.object({
    workSchedule: z.array(z.nativeEnum(JobType)).optional(),
    workModel: z.array(z.nativeEnum(WorkModel)).optional(),
    experience: z.number().min(0).optional(),
    salaryRange: z.array(
        z.number(),
    ).min(0).max(1000000),
    workLocation: z.string().optional(),
    qualification: z.string().optional(),
})

export type FilterType = z.infer<typeof FilterType>;