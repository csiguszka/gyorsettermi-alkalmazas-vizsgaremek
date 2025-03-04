import { useFetchPatch } from "@/app/hooks/useFetchPatch";
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

function OrderCardKitchen({ order }: { order: Order }) {
  const fetchFunction = useFetchPatch();
  const handleClick = () => {
    console.log("clicked");
    fetchFunction("/order/finish", order._id);
  };
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
        <p className="mt-2">Leadás ennyi ideje: 20 perc</p>
      </CardContent>
      <CardFooter className="float-right">
        <Button className="btn" onClick={() => handleClick()}>
          Elkészültnek jelölés
        </Button>
      </CardFooter>
    </Card>
  );
}
export default OrderCardKitchen;
