import AuthFooter from "@/components/forms/auth/auth-footer";
import AuthHeader from "@/components/forms/auth/auth-header";
import SignUpAuthForm from "@/components/forms/auth/email-register.form";

const RegisterPage = () => {
  return (
    <>
      <AuthHeader
        title="Create a New account"
        description="Please register your new account"
      />
      <SignUpAuthForm />
      <AuthFooter
        link="/login"
        linkLabel="Login Here"
        description="If you have already account?"
      />
    </>
  );
};

export default RegisterPage;
