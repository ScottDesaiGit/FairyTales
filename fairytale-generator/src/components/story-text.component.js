import React, { useEffect, useState } from 'react';
import socket from "../services/socket.service"; // Import the socket instance
import ImageComponent from './image.component.js'; // Adjust the path as needed

const MyComponent = () => {
  const [message, setMessage] = useState('');
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [burnout, setBurnout] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [tempPage, setTempPage] = useState(null);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');



  // Function to split the message into pages
  const splitIntoPages = (updatedMessage) => {
    const words = updatedMessage.split(/\s+/);
    const wordsPerPage = 150;
    const newPages = [];

    for (let i = 0; i < words.length; i += wordsPerPage) {
      const pageText = words.slice(i, i + wordsPerPage).join(' ');
      const firstLetter = pageText.charAt(0).toUpperCase();
      const restOfText = pageText.slice(1);

      newPages.push({ firstLetter, restOfText });
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

  useEffect(() => {
    socket.on('newImage1', newImage => setImage1(newImage));
    socket.on('newImage2', newImage => setImage2(newImage));

    return () => {
      socket.off('newImage1');
      socket.off('newImage2');
    };
  }, []);

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
      <div className="text-area-story">
        <div className = "nav-and-text">
        <button className="nav-button" onClick={prevPage} disabled={currentPage === 0}> <i className="fas fa-arrow-left"></i> {/* Font Awesome Left Arrow */} </button>      
            <div className={`story-text-div`} key={currentPage}>
              {pages.map((page, index) => (
                  <div key={index} className={currentPage === index ? 'story-text-div-visible' : 'hidden'}>
                      <span className="initial-letter">{page.firstLetter}</span>
                      {page.restOfText}
                  </div>
              ))}
          </div>
          <button className="nav-button" onClick={nextPage} disabled={currentPage === pages.length - 1}>  <i className="fas fa-arrow-right"></i> {/* Font Awesome Right Arrow */}</button>
        </div>
        <ImageComponent image1={image1} image2={image2} pageNumber={currentPage} />
      </div>
    
      <br></br>
     

      </div>
        </div>
  );
};

export default MyComponent;
