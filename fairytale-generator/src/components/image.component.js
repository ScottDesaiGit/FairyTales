import React, { useEffect, useState } from 'react';

const ImageComponent = ({ image1, image2, pageNumber }) => {
  const imageToShow = pageNumber <= 2 ? image1 : (!image2 ? image1: image2);

  return (
    <div className = "image-container">
      {imageToShow && <img src={imageToShow} alt="FairyTale Image" />}
    </div>
  );
};
export default ImageComponent;
