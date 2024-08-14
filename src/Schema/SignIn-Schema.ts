import { z } from "zod";

export const signUpSchemalogin = z.object({
    userNameOrEmail: z
        .string()
        .nonempty("Username / Useremail is required")
        .trim(),
    userPassword: z.string()
        .nonempty("Password is required")
});
