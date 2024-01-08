import React, { useEffect, useState } from 'react';
import socket from "../services/socket.service"; // Import the socket instance
import "../App.css"

const MyComponent = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Function to handle the message event
    const handleImage = (newImageUrl) => {
		setImageUrl(newImageUrl); 
	  };
  
	  // Listen for messages from the server
	  socket.on('newImage', handleImage);
  }, []);

  return (
    <div>
		<img src={imageUrl} alt = "Dynamic" />
    </div>
  );
};

export default MyComponent;