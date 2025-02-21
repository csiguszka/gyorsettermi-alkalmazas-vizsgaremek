import FormCard from "@/components/FormCard";
import Authorize from "../../components/Authorize";
import { Registration } from "./_components/Registration";

function page() {
  return (
    <Authorize roles={["admin"]}>
      <FormCard title="Új dolgozó felvétele" submitButtonText="Regisztració" formId="newEmploy">
        <Registration />
      </FormCard>
    </Authorize>
  );
}
export default page;
