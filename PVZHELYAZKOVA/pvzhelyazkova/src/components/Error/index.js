import React,{useEffect} from "react";

const Error = () => {

  useEffect(()=>{
    document.title = 'Грешна страница'
  })
  return <>Not found your page</>;
};
export default Error;
