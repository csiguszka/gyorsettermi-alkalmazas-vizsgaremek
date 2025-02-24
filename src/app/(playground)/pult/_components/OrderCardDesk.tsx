import { Order } from "@/app/model/order-model";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function OrderCardDesk({ order }: { order: Order }) {
  const list = order.orderedProducts.map((product) => {
    return { name: product.name, value: product.quantity.toString() };
  });
  return (
    <Card className="card">
      <CardHeader className="text-center text-3xl">
        <CardTitle>{order.orderNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table list={list} />
        <p className="mt-2">Megrendelés összege: 3000 Ft</p>
      </CardContent>
      <CardFooter className="float-right">
        <Button className="btn">Kiadottnak jelölés</Button>
      </CardFooter>
    </Card>
  );
}
export default OrderCardDesk;
