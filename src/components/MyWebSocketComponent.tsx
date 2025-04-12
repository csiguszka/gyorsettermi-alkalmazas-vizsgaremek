import React, { useEffect } from "react";
import ENDPOINTURL from "@/app/url";
import useWebSocket from "react-use-websocket";
import { Order } from "@/app/model/order-model";

interface MyWebSocketComponentProps {
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setIsFirstReload: React.Dispatch<React.SetStateAction<boolean>>;
  name: "kitchen" | "salesman" | "display";
}

function playSound() {
  try {
    const audio = new Audio("/notification.wav");
    audio.play().catch((error) => {
      console.log("A hang nem játszható le: ", error.message);
    });
  } catch (error) {
    console.log(error);
    console.log("Nem sikerült lejátszani a hangot: ");
  }
}

const MyWebSocketComponent = ({
  setOrders,
  setIsFirstReload,
  name,
}: MyWebSocketComponentProps) => {
  const socketUrl = `${ENDPOINTURL}/ws`;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<Order>(socketUrl, {
    shouldReconnect: () => true,
    onOpen: () => {
      sendJsonMessage({ role: name });
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      setIsFirstReload(false);
      console.log("lastJsonMessage", lastJsonMessage);

      setOrders((prevOrders) => {
        const exists = prevOrders.some(
          (order) => order._id === lastJsonMessage._id
        );
        if (exists) {
          return prevOrders.filter(
            (order) => order._id !== lastJsonMessage._id
          );
        } else {
          playSound();
          return [...prevOrders, lastJsonMessage];
        }
      });
    }
  }, [lastJsonMessage, setOrders]);

  // const colors = [
  //   "bg-yellow-300",
  //   "bg-green-500",
  //   "bg-orange-500",
  //   "bg-red-500",
  // ];

  // return (
  //   <div className="flex items-center space-x-4 mb-5">
  //     <div className={`w-6 h-6 rounded-full ${colors[readyState]}`}></div>
  //   </div>
  // );
  return null;
};

export default MyWebSocketComponent;
