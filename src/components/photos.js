import React from 'react';
import ImageGallery from 'react-image-gallery';

const PhotosDisplay = (props) => {
    console.log(props.photos);
    return <ImageGallery items={props.photos} showBullets={false} showPlayButton={false} showIndex={true} useBrowserFullscreen={false} />;
}

export default PhotosDisplay;