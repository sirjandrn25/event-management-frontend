"use client";

import AutoForm, { AutoFormSubmit } from "@/components/autoForm/auto-form";
import AuthHeader from "@/components/forms/auth/auth-header";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

const forgotPasswordSchema = z
  .object({
    email: z.string().email(),
    code: z.string().min(4).max(4),
    password: z.string().min(8).max(20),
    confirm_password: z.string().min(8).max(20),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match.",
    path: ["confirm"],
  });

const ForgotPasswordEmailSend = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get("email");
  const { onSubmit: onVerifyEmail, isPending: isVerifyEmailPending } =
    useCustomMutation({
      endPoint: "auth/forgot-password",
      schema: formSchema,
      onSuccess: (data: any) => {
        toast({
          title: "Success",
          description: "Email sent successfully",
        });
        router.push(`/forgot-password?email=${data?.email}`);
      },
      onError: (message) => {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      },
    });
  const { onSubmit, isPending } = useCustomMutation({
    endPoint: "auth/forgot-password-verify",
    schema: forgotPasswordSchema,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Email sent successfully",
      });
      router.push("/login");
    },
    onError: (message) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });
  if (!email)
    return (
      <>
        <AuthHeader
          title="Forgot Password Email"
          description="First Verify email"
        />
        <AutoForm
          {...{
            formSchema,
            onSubmit: onVerifyEmail,
          }}
        >
          <AutoFormSubmit className="w-full" isLoading={isVerifyEmailPending}>
            Verify Email
          </AutoFormSubmit>
        </AutoForm>
      </>
    );
  return (
    <>
      <AuthHeader
        title="Forgot Password"
        description="Check your email and put verify code"
      />
      <AutoForm
        {...{
          formSchema: forgotPasswordSchema,
          onSubmit,
          fieldConfig: {
            password: {
              inputProps: {
                type: "password",
                placeholder: "New Password",
              },
            },
            confirm_password: {
              inputProps: {
                type: "password",
                placeholder: "Confirm Password",
              },
            },
          },
        }}
        values={{
          email: email ?? "",
        }}
      >
        <AutoFormSubmit isLoading={isPending} className="w-full">
          Reset Password
        </AutoFormSubmit>
      </AutoForm>
    </>
  );
};

export default ForgotPasswordEmailSend;
