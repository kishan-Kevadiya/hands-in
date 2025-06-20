/* <----- Types for browse jobs page -----> */

import { z } from "zod";

export const browseJobsSchema = z.object({
    roles: z.array(z.object({
        roleId: z.string(),
        roleName: z.string(),
        experience: z.number(),
        canGiveTest: z.boolean().optional(),
        canGiveTestDaysAfter: z.number().optional(),
    })).optional(),
});

export type BrowseJobsSchema = z.infer<typeof browseJobsSchema>;
