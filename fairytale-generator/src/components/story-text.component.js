import React, { useEffect, useState } from 'react';
import socket from "../services/socket.service"; // Import the socket instance

const MyComponent = () => {
  const [message, setMessage, prevMessage] = useState('');

  useEffect(() => {
    // Function to handle the message event
    const handleMessage = (newMessage) => {
      console.log(newMessage)
      console.log(message)
      setMessage(prevMessage => prevMessage + newMessage);
	  };
  
	  // Listen for messages from the server
	  socket.on('message', handleMessage);
  
	  // Cleanup function to unsubscribe from the event when the component unmounts
	  return () => {
		socket.off('message', handleMessage);
	  };
  }, []);

  return (
    <div className="story-text-container">
      <p>{message}</p>
    </div>
  );
};

export default MyComponent;