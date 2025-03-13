import ENDPOINTURL from '@/app/url';
import React from 'react';
import useWebSocket from 'react-use-websocket';

const MyWebSocketComponent = () => {
  const socketUrl = `${ENDPOINTURL}/ws`;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

  const sendMessage = () => {
    sendJsonMessage({ type: 'ping' });
    console.log(lastJsonMessage)
  };


  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      <p>Last received message: {lastJsonMessage?.message}</p>
      <p>Connection status: {['Connecting', 'Open', 'Closing', 'Closed'][readyState]}</p>
    </div>
  );
};

export default MyWebSocketComponent;
