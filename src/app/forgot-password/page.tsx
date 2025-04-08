"use client";

import FormCard from "@/components/FormCard";
import ForgotPassword from "./_components/ForgotPassword";

function page() {
  return (
    <FormCard
      formId="forgotPassword"
      submitButtonText="Küldés"
      title="Elfelejtett jelszó"
    >
      <ForgotPassword />
    </FormCard>
  );
}
export default page;
