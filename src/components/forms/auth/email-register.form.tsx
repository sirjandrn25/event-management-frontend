"use client";
import useAuthHandle from "@/hooks/core/use-auth-handle.hook";
import { SignUpFormSchema } from "@/types/auth.type";
import AutoForm, { AutoFormSubmit } from "../../autoForm/auto-form";
import { Icons } from "../../ui/icons";

const SignUpAuthForm = () => {
  const { onRegister, loading, error } = useAuthHandle();

  return (
    <AutoForm
      fieldConfig={{
        name: {
          inputProps: {
            prefix: (<Icons.circleUser className=" h-4 w-4 " />) as any,
          },
        },
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
      formSchema={SignUpFormSchema}
      onSubmit={async (values) => await onRegister(values)}
    >
      {error && (
        <div className="break-all text-sm text-destructive">{error}</div>
      )}
      <AutoFormSubmit
        disabled={!!loading}
        className="w-full"
        isLoading={loading === "credential"}
      >
        Create New Account
      </AutoFormSubmit>
    </AutoForm>
  );
};

export default SignUpAuthForm;
