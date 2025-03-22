import FormCard from "@/components/FormCard";
import { Login } from "./_components/Login";

const LoginPage = () => {
  return (
    <FormCard formId="login" submitButtonText="Bejelentkezés" title="Bejelentkezés">
      <Login />
    </FormCard>
  );
};

export default LoginPage;
