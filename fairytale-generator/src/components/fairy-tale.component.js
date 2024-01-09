import React, { useState } from 'react';
import axios from 'axios';

const FairytaleGenerator = ({onToggleView}) => {
  const [fairytale, setFairytale] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateFairytale = async (toggleView) => {
    // Call to GPT-4 API to generate fairytale
    // Replace 'YOUR_BACKEND_ENDPOINT' with your actual backend endpoint
    toggleView();
    const response = await axios.post('http://localhost:5000/fairytale/generate');
    setFairytale(response.data.fairytale);

    //Toggle view function
   

    // Call to DALL-E API to generate image
    // const imageResponse = await axios.post('YOUR_BACKEND_ENDPOINT/generate-image', { text: fairytale });
    // setImageUrl(imageResponse.data.imageUrl);
  };

  return (
    <div>
      <button className="button-fairytale" onClick={() => generateFairytale(onToggleView)}>Generate Fairytale</button>
      <p>{fairytale}</p>
      {imageUrl && <img src={imageUrl} alt="Fairytale" />}
    </div>
  );
};

export default FairytaleGenerator;
