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
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const MotionCard = motion.create(Card);

function OrderCardDesk({
  order,
  isFirstReload,
  onRemoveOrder,
}: {
  order: Order;
  isFirstReload: boolean;
  onRemoveOrder: (orderId: string) => void;
}) {
  const fetchFunction = useFetchPatch();
  const [isRemoving, setIsRemoving] = useState(false); // Állapot az animációhoz

  const handleClick = async () => {
    setIsRemoving(true); // Indítsd el az exit animációt
    setTimeout(async () => {
      try {
        await fetchFunction("/order/handover", order._id);
        onRemoveOrder(order._id);
      } catch (error) {
        console.error("Hiba történt:", error);
      }
    }, 300); // Az animáció hosszával megegyező delay
  };

  const list = order.orderedProducts.map((product) => ({
    name: product.details?.name || "",
    value: product.quantity + " db",
  }));

  return (
    <AnimatePresence>
      {!isRemoving && (
        <MotionCard
          initial={!isFirstReload ? { scale: 0 } : { scale: 1 }}
          animate={!isFirstReload && { scale: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <CardHeader className="text-center text-3xl">
            <CardTitle>{order.orderNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table list={list} />
            <p className="mt-2">Megrendelés összege: {order.totalPrice} Ft</p>
          </CardContent>
          <CardFooter className="float-right">
            <Button className="btn" onClick={handleClick}>
              Kiadottnak jelölés
            </Button>
          </CardFooter>
        </MotionCard>
      )}
    </AnimatePresence>
  );
}

export default OrderCardDesk;
