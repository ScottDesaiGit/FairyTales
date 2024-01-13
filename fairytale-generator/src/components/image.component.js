import React, { useEffect, useState } from 'react';

const ImageComponent = ({ image1, image2, pageNumber }) => {
  const imageToShow = pageNumber <= 1 ? image1 : image2;

  return (
    <div>
      {imageToShow && <img src={imageToShow} alt="FairyTale Image" />}
    </div>
  );
};
export default ImageComponent;
