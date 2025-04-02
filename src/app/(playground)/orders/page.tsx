import Authorize from "@/components/Authorize";
import Orders from "./Orders";

function page() {
  return (
    <Authorize roles={["admin"]}>
      <Orders />
    </Authorize>
  );
}
export default page;
