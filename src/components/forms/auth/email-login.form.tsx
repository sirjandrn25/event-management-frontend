"use client";
import AutoForm, { AutoFormSubmit } from "@/components/autoForm/auto-form";
import { Icons } from "@/components/ui/icons";
import useAuthHandle from "@/hooks/core/use-auth-handle.hook";
import {
  EmailLoginFormSchema,
  EmailLoginFormSchemaType,
} from "@/types/auth.type";

import Link from "next/link";

const EmailLoginForm = () => {
  const { onLoginHandle, loading, error } = useAuthHandle();
  return (
    <AutoForm
      fieldConfig={{
        email: {
          inputProps: {
            prefix: (<Icons.mail className=" h-4 w-4 " />) as any,
          },
        },
        password: {
          inputProps: {
            type: "password",
            prefix: (<Icons.keyLock className=" h-4 w-4 " />) as any,
          },
        },
      }}
      values={{
        email: "demo@gmail.com",
        password: "password123",
      }}
      formSchema={EmailLoginFormSchema}
      onSubmit={async (values: EmailLoginFormSchemaType) =>
        await onLoginHandle("credential", values)
      }
    >
      <div className="flex items-center justify-between">
        <Link
          className="text-sm font-medium leading-none text-blue-500 hover:underline"
          href="/forgot-password"
        >
          Forgot Password
        </Link>
      </div>
      {error && (
        <div className="break-all text-sm text-destructive">{error}</div>
      )}
      <AutoFormSubmit
        disabled={!!loading}
        className="w-full"
        isLoading={loading === "credential"}
      >
        Login
      </AutoFormSubmit>
    </AutoForm>
  );
};

export default EmailLoginForm;
