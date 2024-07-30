import React from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const ImageCarousel = ({ images }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "auto" }}>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
        {images.map((base64, index) => (
          <div key={index}>
            <img
              // src={image}
              src={`data:image/jpeg;base64,${base64}`}
              alt={`carousel-${index}`}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
