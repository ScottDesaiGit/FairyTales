import React, { useState } from 'react';
import axios from 'axios';
import StoryTextComponent from "../components/story-text.component"
import ImageComponent from "../components/image.component"
import BookVideo from '../videos/Pond5Book.mp4'



const FairytaleGenerator = ({onToggleView}) => {
  const [fairytale, setFairytale] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // Add state for controlling visibility
  const [showStoryAndImage, setShowStoryAndImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isInvisible, setIsInvisible] = useState(true);
  const [showButton, setShowButton] = useState(true)
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
    }, 8000);
    //Toggle view function
   
   

    // Call to DALL-E API to generate image
    // const imageResponse = await axios.post('YOUR_BACKEND_ENDPOINT/generate-image', { text: fairytale });
    // setImageUrl(imageResponse.data.imageUrl);
  };

  return (
    <div>
        {showButton && (
        <button  className="button-fairytale" onClick={() => generateFairytale(onToggleView)}>Generate Fairytale</button>
        )}
        <div className={visibilityClass}>
                <StoryTextComponent /* props */ />
                <ImageComponent /* props */ />
            </div>
        {showVideo && (
            <video className="fancy-border-video" autoPlay loop>
                <source src={BookVideo} type="video/mp4" />
            </video>
        )}
    </div>
);
};

export default FairytaleGenerator;
