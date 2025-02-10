import { Order } from "@/app/model/order-model";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function OrderCardCustomer({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{order.costumerID}</CardTitle>
      </CardHeader>
      <CardContent>
        {order.orderedProducts.map((product) => (
          <div key={product._id} className="flex justify-between">
            <p>{product.name}</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button>Kész</Button>
      </CardFooter>
    </Card>
  );
}
export default OrderCardCustomer;
