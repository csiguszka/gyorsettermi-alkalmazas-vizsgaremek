import FormCard from "@/components/FormCard";
import ForgotPasswordToken from "./_components/ForgotPasswordToken";

function Page() {
  return (
    <FormCard
      formId="forgotPasswordToken"
      submitButtonText="Küldés"
      title={`Elfelejtett jelszó`}
    >
      <ForgotPasswordToken />
    </FormCard>
  );
}

export default Page;
