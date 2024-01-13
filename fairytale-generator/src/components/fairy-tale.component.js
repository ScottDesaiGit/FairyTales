import React, { useState } from 'react';
import axios from 'axios';
import StoryTextComponent from "../components/story-text.component"
import BookVideo from '../videos/Pond5Book.mp4'



const FairytaleGenerator = ({onToggleView}) => {
  // Add state for controlling visibility
  const [showVideo, setShowVideo] = useState(false);
  const [isInvisible, setIsInvisible] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const visibilityClass = isInvisible ? 'invisible-class' : '';


  const generateFairytale = async (toggleView) => {
    // Call to GPT-4 API to generate fairytale
    // Replace 'YOUR_BACKEND_ENDPOINT' with your actual backend endpoint
    toggleView();
    const response = axios.post('http://localhost:5000/fairytale/generate');
    
    setShowButton(false);
    // Hide story and image, show video
    setShowVideo(true);


    // Set a timeout to change state after 8 seconds
    setTimeout(() => {
        setShowVideo(false);
        setIsInvisible(false);
    }, 8500);
    //Toggle view function
   
   

    // Call to DALL-E API to generate image
    // const imageResponse = await axios.post('YOUR_BACKEND_ENDPOINT/generate-image', { text: fairytale });
    // setImageUrl(imageResponse.data.imageUrl);
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div>
        {showButton && (
        <button  className="button-fairytale" onClick={() => generateFairytale(onToggleView)}>Generate Fairytale</button>
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
