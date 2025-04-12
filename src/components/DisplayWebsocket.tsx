import React, { useEffect } from "react";
import ENDPOINTURL from "@/app/url";
import useWebSocket from "react-use-websocket";
import { display } from "@/app/model/display-model";

interface MyWebSocketComponentProps {
  setOrders: React.Dispatch<React.SetStateAction<display[]>>;
  setIsFirstReload: React.Dispatch<React.SetStateAction<boolean>>;
  name: "kitchen" | "salesman" | "display";
}

const DisplayWebsocket = ({
  setOrders,
  setIsFirstReload,
  name,
}: MyWebSocketComponentProps) => {
  const socketUrl = `${ENDPOINTURL}/ws`;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<display>(
    socketUrl,
    {
      shouldReconnect: () => true,
      onOpen: () => {
        sendJsonMessage({ role: name });
      },
    }
  );

  useEffect(() => {
    if (lastJsonMessage) {
      setIsFirstReload(false);
      setOrders((prevOrders) =>
        prevOrders.some(
          (order) => order.orderNumber === lastJsonMessage.orderNumber
        )
          ? prevOrders.map((order) =>
              order.orderNumber === lastJsonMessage.orderNumber
                ? lastJsonMessage
                : order
            )
          : [...prevOrders, lastJsonMessage]
      );
    }
  }, [lastJsonMessage, setOrders]);

  return null;
};

export default DisplayWebsocket;
