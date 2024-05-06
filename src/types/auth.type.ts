import { z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&._-]{8,}$/;

export const SignUpFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8),
  // .regex(passwordRegex, {
  //   message: "Your password is not valid",
  // }),
});
export const EmailLoginFormSchema = SignUpFormSchema.omit({
  name: true,
});
export type SignInWayTypes = "company" | "credential" | "google" | null;
export interface SignInProps {
  loading?: SignInWayTypes;
  callbackUrl: string;
  setLoading: (value: SignInWayTypes) => void;
}

export type EmailLoginFormSchemaType = z.infer<typeof EmailLoginFormSchema>;

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
