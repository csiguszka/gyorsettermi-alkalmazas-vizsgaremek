import Authorize from "@/components/Authorize";
import SalesManOrders from "./_components/SalesManOrders";

function page() {
  return (
    <Authorize roles={["admin", "kitchen"]}>
      <SalesManOrders />
    </Authorize>
  );
}
export default page;
