import React, { useState } from 'react';
import axios from 'axios';
import StoryTextComponent from "../components/story-text.component"
import StoryFormComponent from "../components/story-form.component"
// import BookVideo from '../videos/Pond5Book.mp4'
import { getSocketId } from '../services/socket.service';



const FairytaleGenerator = () => {
  // Add state for controlling visibility
  const [showVideo, setShowVideo] = useState(false);
  const [isInvisible, setIsInvisible] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const visibilityClass = isInvisible ? 'invisible-class' : '';


  const generateFairytale = async (formData) => {


    // Retrieve the socketId using the imported function
    const socketId = getSocketId();

    // Append the socketId to your formData
    const dataWithSocketId = {
        ...formData,
        socketId: socketId
    };

    // Make the POST request with the updated data
    axios.post('https://15.157.109.72:5000/fairytale/generate', dataWithSocketId);
    
    setShowButton(false);
    // Hide story and image, show video
    setShowVideo(true);


    // Set a timeout to change state after 8 seconds
    setTimeout(() => {
        setShowVideo(false);
        setIsInvisible(false);
    }, 8500);
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div>
        {showButton && (
          <StoryFormComponent onSubmit={generateFairytale}></StoryFormComponent>
        )}
        <div className={visibilityClass}>
                <StoryTextComponent /* props */ />
            </div>
        {showVideo && (
            <video  className={`fancy-border-video ${isVideoLoaded ? '' : 'unloaded'}`} 
            autoPlay 
            loop
            onLoadedData={handleVideoLoad}>
                <source src= 'https://domainofdreams.s3.ca-central-1.amazonaws.com/Pond5Book.mp4' type="video/mp4" />
            </video>
        )}
    </div>
);
};

export default FairytaleGenerator;
