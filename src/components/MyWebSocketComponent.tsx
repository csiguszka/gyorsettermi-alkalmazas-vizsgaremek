import React, { useEffect } from "react";
import { Order } from "@/app/model/order-model";
import ENDPOINTURL from "@/app/url";
import useWebSocket from "react-use-websocket";

interface MyWebSocketComponentProps {
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  name: "kitchen" | "salesman"
}

function playSound() {
  try {
    var audio = new Audio('/notification.wav');
    audio.play().catch(error => {
      console.log("A hang nem játszható le: ", error.message);
    });
  } catch (error) {
    console.log(error);
    console.log("Nem sikerült lejátszani a hangot: ");
  }
}

const MyWebSocketComponent: React.FC<MyWebSocketComponentProps> = ({ setOrders, name }) => {
  const socketUrl = `${ENDPOINTURL}/ws`;

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<Order>(socketUrl, {
    shouldReconnect: () => true,
    onOpen: () => {
      sendJsonMessage({ role: name });
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      setOrders((prevOrders) => [...prevOrders, lastJsonMessage]);
      playSound()
    }
  }, [lastJsonMessage, setOrders]);

  const colors = ['bg-yellow-300', 'bg-green-500', 'bg-orange-500', 'bg-red-500'];

  return (
    <div className="flex items-center space-x-4 mb-5">
      <div className={`w-6 h-6 rounded-full ${colors[readyState]}`}></div>
    </div>
  );
};

export default MyWebSocketComponent;

// {
//   "costumerId": "67d2f00ffeab1afefcde2b70",
//   "orderedProducts": [
//     {
//       "_id": "67d2f0e8feab1afefcde2ba5",
//       "quantity": 1
//     }
//   ]
// }