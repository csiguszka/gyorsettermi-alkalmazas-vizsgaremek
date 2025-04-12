import React, { useEffect } from "react";
import ENDPOINTURL from "@/app/url";
import useWebSocket from "react-use-websocket";

interface MyWebSocketComponentProps<T> {
  setAuth: React.Dispatch<React.SetStateAction<T[]>>;
  token: string;
}

const MyWebSocketComponent = <T,>({
  setAuth,
  token,
}: MyWebSocketComponentProps<T>) => {
  const socketUrl = `${ENDPOINTURL}/ws`;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<T>(socketUrl, {
    shouldReconnect: () => true,
    onOpen: () => {
      sendJsonMessage({ token: token });
    },
  });

  useEffect(() => {
    if (lastJsonMessage) {
      setAuth((prevOrders) => [...prevOrders, lastJsonMessage]);
    }
  }, [lastJsonMessage, setAuth]);
  return null;
};

export default MyWebSocketComponent;
