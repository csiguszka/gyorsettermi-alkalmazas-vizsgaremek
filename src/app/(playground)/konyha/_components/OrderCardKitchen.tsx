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

function OrderCardKitchen({
  order,
  onRemoveOrder,
}: {
  order: Order;
  onRemoveOrder: (orderId: string) => void;
}) {
  const fetchFunction = useFetchPatch();

  const handleClick = async () => {
    console.log("clicked");
    try {
      await fetchFunction("/order/finish", order._id); // Küldés a backendnek
      onRemoveOrder(order._id); // Rendelés eltávolítása a frontendről
    } catch (error) {
      console.error("Hiba történt:", error);
    }
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
        <Button className="btn" onClick={handleClick}>
          Elkészültnek jelölés
        </Button>
      </CardFooter>
    </Card>
  );
}

export default OrderCardKitchen;
