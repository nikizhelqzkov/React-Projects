import Avatar from "./Avatar";
import ProfileImage from "./ProfileImage";
import ProductPrice from "./ProductPrice";
import { useState } from "react";

const HelloWorld = () => {
  const [reactLaunchDate] = useState(new Date("2013-05-29"));
  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(reactLaunchDate);
  return (
    <>
      <h1>Hello, John Doe</h1>
      <ProfileImage />
      <Avatar />
      <ProductPrice />
      <p>React was launched on a {dayOfWeek}</p>
    </>
  );
};

export default HelloWorld;
