import {z} from "zod";

export const editLocationSchema = z.object({
    location: z.string(),
})

export const editDescriptionSchema = z.object({
    description: z.string(),
})