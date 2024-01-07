import React, { useState } from 'react';
import axios from 'axios';

const FairytaleGenerator = () => {
  const [fairytale, setFairytale] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateFairytale = async () => {
    // Call to GPT-4 API to generate fairytale
    // Replace 'YOUR_BACKEND_ENDPOINT' with your actual backend endpoint
    const response = await axios.post('http://localhost:5000/fairytale/generate');
    setFairytale(response.data.fairytale);

    // Call to DALL-E API to generate image
    // const imageResponse = await axios.post('YOUR_BACKEND_ENDPOINT/generate-image', { text: fairytale });
    // setImageUrl(imageResponse.data.imageUrl);
  };

  return (
    <div>
      <button onClick={generateFairytale}>Generate Fairytale</button>
      <p>{fairytale}</p>
      {imageUrl && <img src={imageUrl} alt="Fairytale" />}
    </div>
  );
};

export default FairytaleGenerator;
