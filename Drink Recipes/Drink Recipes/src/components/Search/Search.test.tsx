import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { render, screen } from "@testing-library/react";

describe("Search Component", () => {
  test("renders input and button", () => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} />);
    const inputElement = screen.getByPlaceholderText(/search drink/i);
    const buttonElement = screen.getByRole("button", { name: /search/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("updates input value on change", async () => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} />);
    const inputElement = screen.getByPlaceholderText(/search drink/i);

    await userEvent.type(inputElement, "Mojito"); // Use userEvent for better simulation
    expect(inputElement).toHaveValue("Mojito");
  });

  test("calls handleSearch with input value on form submit", async () => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} />);
    const inputElement = screen.getByPlaceholderText(/search drink/i);
    const submitButton = screen.getByRole("button", { name: /search/i });
    await userEvent.type(inputElement, "Margarita"); // Use userEvent for better simulation
    await userEvent.click(submitButton); // Simulate button click
    expect(mockHandleSearch).toHaveBeenCalledWith("Margarita");
    expect(inputElement).toHaveValue(""); // Input should be cleared after submit
  });

  test("does not call handleSearch when input is empty", async () => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} />);
    const submitButton = screen.getByRole("button", { name: /search/i });

    await userEvent.click(submitButton);

    expect(mockHandleSearch).not.toHaveBeenCalled();
  });
});
