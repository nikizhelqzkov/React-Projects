import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Result from "./Result";

const Grid = ({ results }) => {
  return (
    <>
      <h2 className="text-center mt-3">Results</h2>
      {results.map((drink) =>
        drink ? (
          <div className="col-12 col-md-6 col-xl-4">
            <Result
              key={drink.idDrink}
              name={drink.strDrink}
              category={drink.strCategory}
              image={drink.strDrinkThumb}
              information={drink.strInstructions}
            />
          </div>
        ) : null
      )}
    </>
  );
};

export default Grid;
