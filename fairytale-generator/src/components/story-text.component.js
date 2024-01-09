import React, { useEffect, useState } from 'react';
import socket from "../services/socket.service"; // Import the socket instance

const MyComponent = () => {
  const [message, setMessage] = useState('');
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Function to split the message into pages
  const splitIntoPages = (updatedMessage) => {
    const words = updatedMessage.split(/\s+/);
    const wordsPerPage = 150;
    const newPages = [];

    for (let i = 0; i < words.length; i += wordsPerPage) {
      newPages.push(words.slice(i, i + wordsPerPage).join(' '));
    }

    setPages(newPages);
  };

  useEffect(() => {
    // Function to handle the message event
    const handleMessage = (newMessage) => {
      const updatedMessage = message + newMessage;
      setMessage(updatedMessage);
      splitIntoPages(updatedMessage);
    };

    // Listen for messages from the server
    socket.on('message', handleMessage);

    // Cleanup function to unsubscribe from the event when the component unmounts
    return () => {
      socket.off('message', handleMessage);
    };
  }, [message]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="container">
      <button className="nav-button" onClick={prevPage} disabled={currentPage === 0}> <i className="fas fa-arrow-left"></i> {/* Font Awesome Left Arrow */} </button>      
      <div className="text-area-story">

        <div className={`story-text-div`} key={currentPage}>
          {pages[currentPage]}
        </div>
      </div>
      <button className="nav-button" onClick={nextPage} disabled={currentPage === pages.length - 1}>  <i className="fas fa-arrow-right"></i> {/* Font Awesome Right Arrow */}</button>
    </div>
    </div>
  );
};

export default MyComponent;
