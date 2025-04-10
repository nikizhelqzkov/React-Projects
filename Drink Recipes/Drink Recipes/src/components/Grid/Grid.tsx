import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cocktail } from "../../Models/Coctail";
import Result from "../Result";


type GridProps = {
  results: Cocktail[];
};

export const Grid = ({ results }: GridProps) => {
  const resList = results.map(
    (drink) =>
      drink && (
        <div className="col-12 col-md-6 col-xl-4" key={drink.idDrink}  data-testid="drink-item">
          <Result
            key={drink.idDrink}
            name={drink.strDrink}
            category={drink.strCategory}
            image={drink.strDrinkThumb}
            information={drink.strInstructions}
          />
        </div>
      )
  );
  return (
    <>
      <h2 className="text-center mt-3">Results</h2>
      {resList}
    </>
  );
};

