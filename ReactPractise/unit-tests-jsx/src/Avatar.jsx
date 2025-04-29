import React from "react";

export default function Avatar() {
  const [character] = React.useState({
    name: "John Doe",
    image: "https://placekitten.com/200/300",
  });
  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
    </div>
  );
}
