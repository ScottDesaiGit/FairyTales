import React, { useEffect, useState } from 'react';
import socket from "../services/socket.service"; // Import the socket instance

const MyComponent = () => {
  const [message, setMessage] = useState('');
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [burnout, setBurnout] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [tempPage, setTempPage] = useState(null);



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

  // Function to change page with burn-off animation
  const changePageWithAnimation = (newPage, direction) => {
    setBurnout(direction);
    setTimeout(() => {
      setCurrentPage(newPage);
      setBurnout(false);
      setFadeIn(direction);
      setTimeout(() => {
        setFadeIn(false);
      }, 1000); // Duration of the fade-in animation
    }, 1000); // Duration of the burn-off animation
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
    if(currentPage < pages.length - 1){
      changePageWithAnimation(currentPage + 1, 'left-to-right');
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      changePageWithAnimation(currentPage - 1, 'right-to-left');
    }
  };

  return (
    <div>
    <div className={`container ${burnout === 'left-to-right' ? 'burnout-left-to-right' : burnout === 'right-to-left' ? 'burnout-right-to-left' : 
    fadeIn === 'left-to-right' ? 'fadeIn-left-to-right' : fadeIn === 'right-to-left' ? 'fadeIn-right-to-left' : ''}`}>
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
