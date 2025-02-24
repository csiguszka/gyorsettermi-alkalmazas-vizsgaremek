import Authorize from "@/components/Authorize";
import Inventory from "./Inventory";

function page() {
  return (
    <Authorize roles={["admin"]}>
      <Inventory />
    </Authorize>
  );
}
export default page;
