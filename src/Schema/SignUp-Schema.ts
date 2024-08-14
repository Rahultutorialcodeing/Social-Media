import { z } from "zod";

export const signUpSchema = z.object({
    userName: z
        .string()
        .nonempty("Username is required")
        .trim()
        .min(2, "Username must be at least 2 characters")
        .max(20, "Username must be under 20 characters")
        .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, "Username must not contain special characters"),
    userEmail: z.string()
        .nonempty("Email is required")
        .email({ message: "Invalid email address" })
        .trim(),
    userFullName: z.string()
        .nonempty("Full name is required")
        .min(2, "Full name must be at least 2 characters")
        .max(30, "Full name must be under 30 characters")
        .trim(),
    userPassword: z.string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters")
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one digit")
        .trim(),
});
