import AuthFooter from "@/components/forms/auth/auth-footer";
import AuthHeader from "@/components/forms/auth/auth-header";
import EmailLoginForm from "@/components/forms/auth/email-login.form";

const LoginPage = () => {
  return (
    <>
      <AuthHeader
        title="Welcome to Login"
        description="Please login by email and password"
      />
      <EmailLoginForm />
      <AuthFooter
        link="/register"
        linkLabel="Register Here"
        description="Don't have account?"
      />
    </>
  );
};

export default LoginPage;
