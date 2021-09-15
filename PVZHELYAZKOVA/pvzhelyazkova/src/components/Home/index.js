import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Header from "../Header";
import HomeMain from "../HomeMain";
const Home = () => {
  return (
    <>
      <Navbar section='home'/>
      <Header/>
      <HomeMain/>
      <Footer/>
    </>
  );
};

export default Home;
