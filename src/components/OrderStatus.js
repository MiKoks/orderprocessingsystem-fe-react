import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client as StompClient } from '@stomp/stompjs';

const OrderStatus = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    // Create the WebSocket client with SockJS
    const socket = new SockJS('http://localhost:8080/ws-order-updates');
    const stompClient = new StompClient({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // Enable auto reconnect every 5 seconds
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        
        // Subscribe to the dynamic topic for the specific order ID
        stompClient.subscribe(`/topic/orders/${orderId}`, (message) => {
          console.log('Received message:', message);
          const update = JSON.parse(message.body);
          setOrderStatus((prevStatus) => [...prevStatus, update]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
      },
      onWebSocketClose: (event) => {
        console.error('WebSocket connection closed:', event);
      }
    });

    stompClient.activate(); // Start the WebSocket connection

    // Clean up when component unmounts
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [orderId]);

  return (
    <div>
      <h3>Order Status Updates</h3>
      <ul>
        {orderStatus.map((status, index) => (
          <li key={index}>
            Order ID: {status.orderId}, Status: {status.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderStatus;
