import Authorize from "@/components/Authorize";
import SalesManOrders from "./_components/SalesManOrders";

function page() {
  return (
    <Authorize roles={["admin", "kitchen"]}>
      <h1 className="text-center text-4xl mb-5">Megrendelések (pult)</h1>
      <SalesManOrders />
    </Authorize>
  );
}
export default page;
