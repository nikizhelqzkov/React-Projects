import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Wrapper } from "./GalleryHome.Styles";
const GalleryHome = ({ data }) => {
  const slides = data.map((item) => {
    return (
      item && (
        <Wrapper key="item.key" className="home-gallery">
          <img src={item.src} alt={item.alt} />
        </Wrapper>
      )
    );
  });

  // const images = data.map(
  //   (image) =>
  //     image && <img src={image.src} key={image.key} alt={image.title} />
  // );
  return (
    <Carousel autoPlay infiniteLoop>
      {slides}
    </Carousel>
  );
};
export default GalleryHome;
