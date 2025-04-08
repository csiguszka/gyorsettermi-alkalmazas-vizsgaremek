import Authorize from "@/components/Authorize";
import KitchenOrders from "./_components/KitchenOrders";

function page() {
  return (
    <Authorize roles={["admin", "kitchen"]}>
      <KitchenOrders />
    </Authorize>
  );
}
export default page;
