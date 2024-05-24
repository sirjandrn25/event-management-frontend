"use client";
import AutoForm, { AutoFormSubmit } from "@/components/autoForm/auto-form";
import AuthHeader from "@/components/forms/auth/auth-header";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  code: z.string().min(4).max(4),
});
const VerifyRegister = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { onSubmit, isPending } = useCustomMutation({
    endPoint: "auth/verify-email",
    schema: formSchema,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Email verified successfully",
      });
      router.push("/dashboard");
    },
    onError: (message) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });
  const { onSubmit: onResendToken, isPending: isResendTokenLoading } =
    useCustomMutation({
      endPoint: "auth/resend-token",
      schema: formSchema,
      onSuccess: () => {
        toast({
          title: "Token sent successfully",
          description: "Check your in your email address",
        });
      },
      onError: (message) => {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      },
    });
  const email = searchParams?.get("email");
  return (
    <>
      <AuthHeader
        title="Verify Email"
        description="Please Check your email and enter 4 digit code."
      />
      <AutoForm
        values={{
          email: email ?? "",
        }}
        onSubmit={onSubmit}
        formSchema={formSchema}
      >
        <div
          onClick={() => {
            onResendToken({
              email: email ?? "",
            });
          }}
          className={cn(
            "text-blue-500 flex items-center cursor-pointer gap-2 hover:underline text-sm",
            {
              "cursor-wait": isResendTokenLoading ?? isPending,
            }
          )}
        >
          {isResendTokenLoading && <Icons.spinner className="h-4 w-4" />}{" "}
          <span>Resend Token</span>
        </div>
        <AutoFormSubmit
          isLoading={isPending}
          disabled={isResendTokenLoading}
          className="w-full"
        >
          Verify Email
        </AutoFormSubmit>
      </AutoForm>
    </>
  );
};

export default VerifyRegister;
