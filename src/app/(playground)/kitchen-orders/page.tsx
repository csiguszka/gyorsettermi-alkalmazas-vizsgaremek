import Authorize from "@/components/Authorize";
import KitchenOrders from "./_components/KitchenOrders";

function page() {
  return (
    <Authorize roles={["admin", "kitchen"]}>
      <h1 className="text-center text-4xl mb-5">Megrendelések (konyha)</h1>
      <KitchenOrders />
    </Authorize>
  );
}
export default page;
