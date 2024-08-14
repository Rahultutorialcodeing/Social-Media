import { z } from "zod";

export const otpSchema = z.object({
    code: z
        .string()
        .nonempty("Verification is required")
        .trim()
        .min(6,'Verification code must be 6 digits')
        .regex(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm, "Verification code must Number")

}
)
