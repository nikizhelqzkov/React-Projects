import React, { useState } from "react";
import Button from "../ButtonSection";
import { Wrapper } from "./Header.Styles";
const Header = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const [state, setState] = useState();
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const addInfo = (elem) => {
    setCount(count + elem);
    if (text === "") {
      setText(`${elem.toString()}`);
    } else {
      setText(`${text} + ${elem.toString()}`);
    }
  };
  return (
    <Wrapper className="grid">
      <h2>
        Calculate: {text} {text === "" ? null : "="} {count}
      </h2>
      <div className="grid">
        {numbers.map((elem) => (
          <Button key={elem} callback={() => addInfo(elem)} header={elem} />
        ))}
      </div>
    </Wrapper>
  );
};
export default Header;
