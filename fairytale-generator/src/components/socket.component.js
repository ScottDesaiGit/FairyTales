import React, { useEffect, useState } from 'react';
import socket from "../services/socket.service"; // Import the socket instance

const MyComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Function to handle the message event
    const handleMessage = (newMessage) => {
		console.log(newMessage)
		setMessage(newMessage);
	  };
  
	  // Listen for messages from the server
	  socket.on('message', handleMessage);
  
	  // Cleanup function to unsubscribe from the event when the component unmounts
	  return () => {
		socket.off('message', handleMessage);
	  };
  }, []);

  return (
    <div>
      <p>Received Message: {message}</p>
    </div>
  );
};

export default MyComponent;