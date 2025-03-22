import FormCard from "@/components/FormCard";
import { Registration } from "./_components/Registration";
import Authorize from "@/components/Authorize";

function page() {
  return (
    <Authorize roles={["admin"]}>
      <FormCard
        title="Új dolgozó felvétele"
        submitButtonText="Regisztració"
        formId="newEmploy"
      >
        <Registration />
      </FormCard>
    </Authorize>
  );
}
export default page;
