import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row } from "react-bootstrap";
// import Grid from "./components/Grid";
import Main from "./components/Main";
// const App = () => {
//  
//   const [input, setInput] = useState("");
//   const [value, setValue] = useState("");
//   const [info, setInfo] = useState([]);
//   useEffect(() => {
//     if (value) {
//       console.log(value);
//       getData(value);
//       // console.log(info);
//     }
//   }, [value]);
//   const changeInput = (e) => {
//     setInput(e.target.value);
//   };
//   const getInputVal = (e) => {
//     e.preventDefault();
//     setInput("");
//     setValue(input);
//   };
//   return (
//    
//       </Row>
//       <Row className="justify-content-center mx-auto">
//         {info.length !== 0 && <Grid results={info} />}
//       </Row>
//     </div>
//   );
// };
const App = () => {
  return <Main />;
};

export default App;
