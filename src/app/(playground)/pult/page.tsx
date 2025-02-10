import Authorize from "@/components/Authorize";
import Desk from "./Desk";

function page() {
  return (
    <Authorize roles={["admin", "salesman"]}>
      <Desk />
    </Authorize>
  );
}
export default page;
