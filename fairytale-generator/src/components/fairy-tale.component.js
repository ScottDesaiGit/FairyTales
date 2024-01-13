import React, { useState } from 'react';
import axios from 'axios';
import StoryTextComponent from "../components/story-text.component"
import StoryFormComponent from "../components/story-form.component"
import BookVideo from '../videos/Pond5Book.mp4'



const FairytaleGenerator = () => {
  // Add state for controlling visibility
  const [showVideo, setShowVideo] = useState(false);
  const [isInvisible, setIsInvisible] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const visibilityClass = isInvisible ? 'invisible-class' : '';


  const generateFairytale = async (formData) => {
    axios.post('http://localhost:5000/fairytale/generate', formData);
    
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
                <source src={BookVideo} type="video/mp4" />
            </video>
        )}
    </div>
);
};

export default FairytaleGenerator;
