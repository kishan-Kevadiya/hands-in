/* <----- Types for account setup page ----- /> */

import { z } from "zod";
import { ImageMetaData } from "./general.types";

/* <----- account setup  ----- /> */
export const accountSetupSchema = z.object({
    logo: z.union([z.instanceof(File), ImageMetaData], { required_error: "Image is required" }).nullable(),
    companyName: z.string().nonempty("Company Name is required").max(100, "Company Name should be less than 100 characters"),
    email: z.string().email("Invalid email").nonempty("Company Email is required"),
    phone: z.string().nonempty("Company Phone Number is required"),
    describeYourCompany: z
        .string()
        .nonempty("Describe Your Company is required").max(500, "Description should be less than 500 characters"),
    address: z.string().nonempty("Address is required"),
    postalCode: z.string({ required_error: "Postal Code is required" }).min(6, "Pincode min 6 digits").max(6, "Pincode max 6 digits"),
    companyWebsite: z.string().url().optional().or(z.literal("")),
    employeeSize: z.string().nonempty("Employee Size is required"),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    twitterUrl: z.string().url().optional().or(z.literal("")),
    gst: z.string().regex(/^([0-3][0-9])([A-Z]{5}[0-9]{4}[A-Z])([1-9A-Z])Z([0-9A-Z])$/, "Invalid GST number").optional().or(z.literal("")),
    images: z.array(
        z.union([z.instanceof(File), ImageMetaData])
    ),
});

export type AccountSetupField = z.infer<typeof accountSetupSchema>;

export interface CompanyProfileTable {
    id: string;
    email: string;
    password: string;
    companyName?: string;
    phone?: string;
    countryCode?: string;
    description?: string;
    address?: string;
    postalCode?: string;
    gst?: string;
    isEmailVerified: boolean;
    logo?: File | ImageMetaData;
    website?: string;
    employeeSize?: string;
    linkedin?: string;
    twitter?: string;
    companyImages?: File[] | ImageMetaData[];
    isOnboardingCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export type GetCompanyProfileResponse = CompanyProfileTable;
