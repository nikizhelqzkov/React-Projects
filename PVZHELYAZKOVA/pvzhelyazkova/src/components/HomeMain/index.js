import React, { useEffect, useState } from "react";
import { Wrapper } from "./HomeMain.Styles";
import mainImg from "../../assets/images/home_main.jpg";
import GalleryHome from "../GalleryHome";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeMain = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    if (galleryImages.length === 0) {
      getData();

    }
    console.log(galleryImages);

  }, [galleryImages]);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://pvzhelyazkova-default-rtdb.europe-west1.firebasedatabase.app/galleryHome.json"
      );
      const data = await response.json();
      const images = data.data;
      setGalleryImages(images);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Wrapper className="home__main">
      <h2>{"Добре дошли в сайта на мария желязкова".toUpperCase()}</h2>

      <img
        src={mainImg}
        alt="Maria is class leader"
        className="home__main__header-img"
      />
      <h2>{"Старши учител по ит, математика и информатика".toUpperCase()}</h2>
      <GalleryHome data={galleryImages} />
    </Wrapper>
  );
};
export default HomeMain;
