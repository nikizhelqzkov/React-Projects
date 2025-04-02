import React, { useState } from "react";
import Search from "./Search/Search";
import { Cocktail } from "../Models/Coctail";
import { Row } from "react-bootstrap";
import Grid from "./Grid/Grid";

export default function Main() {
  const [coctails, setCoctails] = useState<Cocktail[]>([]);
  const [isInitial, setIsInitial] = useState(true);

  const getData = async (name: string) => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
      );
      const data = await response.json();
      console.log(data.drinks);
      setCoctails(data.drinks ?? []);
      if (isInitial) {
        setIsInitial(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-3">
        <Row>
          <h1 className="text-center">Drink recipes</h1>
        </Row>
        <Search handleSearch={getData} />{" "}
      </div>
      {isInitial && ""}

      {!isInitial && coctails.length === 0 && (
        <div className="text-center mt-3">No results found</div>
      )}

      {!isInitial && coctails.length > 0 && (
        <Row className="justify-content-center mx-auto">
           {coctails.length !== 0 && <Grid results={coctails} />}
        </Row>
        // <div className="text-center mt-3">
        //   <h2>Results:</h2>
        //   <div className="d-flex flex-wrap justify-content-center">
        //     {coctails.map((coctail) => (
        //       <div key={coctail.idDrink} className="m-2">
        //         <h3>{coctail.strDrink}</h3>
        //       </div>
        //     ))}
        //   </div>
        // </div>
      )}
    </>
  );
}
