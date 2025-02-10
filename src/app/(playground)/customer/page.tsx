import Authorize from "@/components/Authorize";
import Customer from "./Customer";

function page() {
  return (
    <Authorize roles={["admin", "salesman", "kitchen"]}>
      <Customer />
    </Authorize>
  );
}
export default page;
