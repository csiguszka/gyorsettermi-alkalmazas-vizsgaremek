import { Card } from "@/components/ui/card";
import { display } from "@/app/model/display-model";

function OrderCardCustomer({ display: display }: { display: display }) {
  console.log("orderCardCustomer", display);
  return (
    <Card className="p-10 card">
      <div className="flex w-full h-full justify-center items-center">
        <h1 className="text-5xl text-primary sm:text-8xl">
          {display.orderNumber}
        </h1>
      </div>
    </Card>
  );
}
export default OrderCardCustomer;
