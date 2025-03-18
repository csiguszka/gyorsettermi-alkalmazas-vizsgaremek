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
    return { name: product.details.name, value: product.quantity + " db" };
  });

  const past = new Date(order.orderedTime);
  const now = new Date();
  const diffMs = now.getTime() - past.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return (
    <Card className="card">
      <CardHeader className="text-center text-3xl">
        <CardTitle>{order.orderNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table list={list} />
        <p className="mt-2">
          Leadás ennyi ideje: {hours !== 0 && `${hours} óra és`} {minutes} perc
        </p>
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
