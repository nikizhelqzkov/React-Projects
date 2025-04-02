import React, { FormEvent, useState } from "react";
import { Button, Row } from "react-bootstrap";

type SearchProps = {
  readonly handleSearch: (value: string) => void;
};

export default function Search({ handleSearch }: SearchProps) {
  const [input, setInput] = useState("");

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    handleSearch(input);
  };
  return (

      <Row className="mt-3">
        <form className="d-flex justify-content-center" onSubmit={submitSearch}>
          <input
            type="text"
            placeholder="Search drink"
            value={input}
            onChange={changeInput}
          />
          <Button className="mx-1" type="submit" disabled={!input.trim()}>
            Search
          </Button>
        </form>
      </Row>
   
  );
}
