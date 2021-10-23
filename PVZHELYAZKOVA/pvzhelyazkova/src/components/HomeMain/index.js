import React, { useEffect, useState } from "react";
import { Wrapper } from "./HomeMain.Styles";
import mainImg from "../../assets/images/home_main.jpg";
import GalleryHome from "../GalleryHome";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
const HomeMain = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const dataCollectionRef = collection(db, "home_main_gallery");
  useEffect(() => {
    getData();
    // console.log(galleryImages);
  }, []);
  const getData = async () => {
    const data = await getDocs(dataCollectionRef);
    setGalleryImages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(galleryImages);
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
