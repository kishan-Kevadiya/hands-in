/* <----- Types for resume create page ----- /> */

import { z } from "zod";

// resume create

export const contactUsSchema = z.object({
    firstName: z.string().nonempty("First Name is required").min(2, "First Name must be at least 2 characters").max(50, "First Name must be less than 50 characters"),
    lastName: z.string().nonempty("Last Name is required").min(2, "Last Name must be at least 2 characters").max(50, "Last Name must be less than 50 characters"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phone: z.string().nonempty("Phone Number is required"),
    subject: z.string().nonempty("Subject is required"),
    message: z.string().nonempty("Message is required"),

})

export type contactUsField = z.infer<typeof contactUsSchema>;

