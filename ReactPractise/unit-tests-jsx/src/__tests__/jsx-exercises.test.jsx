import React from "react";
import Avatar from "../Avatar";
import ProfileImage from "../ProfileImage";
import ProductPrice from "../ProductPrice";
import HelloWorld from "../Hello";
import { render, screen } from "@testing-library/react";

describe("JSX Practice exercises", () => {
  describe("JSX basics", () => {
    /**
     * Implement the `HelloWorld` component
     * such that it says "Hello, John Doe!"
     *
     * Read the value from the `name` variable
     */
    test("hello john doe", () => {
      render(<HelloWorld />);
      expect(screen.getByText(/Hello, John Doe/)).toBeInTheDocument();
    });

    /**
     * Implement the `ProfileImage` component such that
     * it renders an image
     *
     * Read the image path from the `imagePath` variable
     */
    test("profile image 1", () => {
      const imagePath = "https://placekitten.com/200/300";

      render(<ProfileImage />);
      expect(screen.getByRole("img")).toHaveAttribute("src", imagePath);
    });

    // /**
    //  * Implement the `ProfileImage` component
    //  * such that it renders the given HTML
    //  */
    test("profile image 2", () => {
      render(<ProfileImage />);
      expect(screen.getByRole("img")).toHaveAttribute(
        "style",
        "border: 1px solid blue;"
      );
    });

    // /**
    //  * Implement the `Avatar` component such that
    //  * it displays the name and image of a character.
    //  *
    //  * Read the details from the `character` variable.
    //  * Display the name inside a heading HTML tag.
    //  */
    test("avatar", () => {
      const character = {
        name: "John Doe",
        image: "https://placekitten.com/200/300",
      };

      render(<Avatar />);
      expect(screen.getByRole("heading")).toHaveTextContent(character.name);
      expect(screen.getByRole("img")).toHaveAccessibleName(character.name);
      expect(screen.getByRole("img")).toHaveAttribute("src", character.image);
    });
  });

  describe("JSX expressions", () => {
    /**
     * Update the `ProductPrice` component
     * such that the value of the price is displayed
     * with two decimals
     */
    test("format number", () => {

      render(<ProductPrice />);
      expect(screen.getByText(/Price: 12.00/)).toBeInTheDocument();
    });

    /**
     * Update the `HelloReact` component
     * so that it outputs "React was launched on a Wednesday"
     *
     * Tip: You can use the `Intl.DateTimeFormat` helper,
     * passing in just the `weekday` option
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options
     */
    test("format date - day of week", () => {

      render(<HelloWorld />);
      expect(
        screen.getByText(/React was launched on a Wednesday/)
      ).toBeInTheDocument();
    });
  });
});
