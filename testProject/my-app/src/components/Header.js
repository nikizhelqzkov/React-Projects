import React, { useState } from "react";
import Button from "./ButtonSection";
const Header = () => {
  const [state, setState] = useState(0);
  return (
    <>
      <h2>Number: {state}</h2>
      <Button callback={() => setState(state + 1)} header="Click" />
    </>
  );
};
export default Header;
