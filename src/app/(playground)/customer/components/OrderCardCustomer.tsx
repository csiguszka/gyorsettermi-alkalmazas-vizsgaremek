import { Order } from "@/app/model/order-model";
import {
  Card,
} from "@/components/ui/card";

function OrderCardCustomer({ order }: { order: Order }) {
  return (
    <Card className="p-10 card">
        {order.orderedProducts.map((product) => (
          <div key={product._id} className="flex w-full h-full justify-center items-center">
            <h1 className="text-5xl text-primary sm:text-8xl">{product._id.slice(19, 23)}</h1>
          </div>
        ))}
    </Card>
  );
}
export default OrderCardCustomer;
