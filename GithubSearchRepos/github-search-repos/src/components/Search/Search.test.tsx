import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search, { SearchBar, Options } from "./Search";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, expect, beforeEach, afterEach } from "vitest";
import { DropdownProps } from "../shared/Dropdown/Dropdown";
import { OptionsProps } from "../../Models/Search";

// Mock the Dropdown component since we're testing it separately
vi.mock("../shared/Dropdown/Dropdown", () => ({
  Dropdown: ({ id, label, value, onChange, options }: DropdownProps) => (
    <div data-testid={`mock-dropdown-${id}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={`select-${id}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe("SearchBar Component", () => {
  const mockSetSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with the correct placeholder", () => {
    render(<SearchBar search="" setSearch={mockSetSearch} />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Search for a repository..."
    );
  });

  test("displays the search value correctly", () => {
    render(<SearchBar search="react" setSearch={mockSetSearch} />);
    expect(screen.getByRole("textbox")).toHaveValue("react");
  });

  test("calls setSearch when input changes", async () => {
    const user = userEvent.setup();
    render(<SearchBar search="" setSearch={mockSetSearch} />);

    // Type each character
    await user.type(screen.getByRole("textbox"), "test");

    // Verify the mock was called for each character
    expect(mockSetSearch).toHaveBeenCalledTimes(4);
  });

  test("has correct styling classes", () => {
    render(<SearchBar search="" setSearch={mockSetSearch} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("border");
    expect(input).toHaveClass("border-gray-300");
    expect(input).toHaveClass("rounded-md");
    expect(input).toHaveClass("w-full");
  });
});

describe("Options Component", () => {
  const defaultProps: OptionsProps = {
    perPage: 10,
    setPerPage: vi.fn(),
    sortBy: "best_match",
    setSortBy: vi.fn(),
    order: "desc",
    setOrder: vi.fn(),
    onFilterChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all three dropdowns", () => {
    render(<Options {...defaultProps} />);

    expect(screen.getByTestId("mock-dropdown-perPage")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dropdown-sort-by")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dropdown-order")).toBeInTheDocument();
  });

  test("renders with correct labels", () => {
    render(<Options {...defaultProps} />);

    expect(screen.getByText("Items per page")).toBeInTheDocument();
    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(screen.getByText("Order")).toBeInTheDocument();
  });

  test("calls setPerPage and onFilterChange when perPage changes", async () => {
    const user = userEvent.setup();
    render(<Options {...defaultProps} />);

    const select = screen.getByTestId("select-perPage");
    await user.selectOptions(select, "25");

    expect(defaultProps.setPerPage).toHaveBeenCalledWith(25);
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      perPage: 25,
      sortBy: "best_match",
      order: "desc",
    });
  });

  test("calls setSortBy and onFilterChange when sortBy changes", async () => {
    const user = userEvent.setup();
    render(<Options {...defaultProps} />);

    const select = screen.getByTestId("select-sort-by");
    await user.selectOptions(select, "stars");

    expect(defaultProps.setSortBy).toHaveBeenCalledWith("stars");
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      perPage: 10,
      sortBy: "stars",
      order: "desc",
    });
  });

  test("calls setOrder and onFilterChange when order changes", async () => {
    const user = userEvent.setup();
    render(<Options {...defaultProps} />);

    const select = screen.getByTestId("select-order");
    await user.selectOptions(select, "asc");

    expect(defaultProps.setOrder).toHaveBeenCalledWith("asc");
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith({
      perPage: 10,
      sortBy: "best_match",
      order: "asc",
    });
  });
});

describe("Search Component", () => {
  const mockOnSearch = vi.fn();
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("renders SearchBar and Options components", () => {
    render(
      <Search onSearch={mockOnSearch} onFilterChange={mockOnFilterChange} />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dropdown-perPage")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dropdown-sort-by")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dropdown-order")).toBeInTheDocument();
  });

  test("debounces search input and calls onSearch", async () => {
    render(
      <Search onSearch={mockOnSearch} onFilterChange={mockOnFilterChange} />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "react" },
    });

    await vi.advanceTimersByTimeAsync(500); // Fast-forward time

    // Now it should have been called
    expect(mockOnSearch).toHaveBeenCalledWith({
      search: "react",
      perPage: 10,
      sortBy: "best_match",
      order: "desc",
    });
  });

  test("clears previous timeout on new input", async () => {
    render(
      <Search onSearch={mockOnSearch} onFilterChange={mockOnFilterChange} />
    );

    // Start typing
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "r" },
    });

    // Only advance part way
    await vi.advanceTimersByTimeAsync(300);

    // Continue typing
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "re" },
    });

    // Advance the rest of the way for the second timer
    await vi.advanceTimersByTimeAsync(600);

    // Now it should be called with the final value
    expect(mockOnSearch).toHaveBeenCalledWith({
      search: "re",
      perPage: 10,
      sortBy: "best_match",
      order: "desc",
    });
    expect(mockOnSearch).toHaveBeenCalledTimes(2);
  });

  test("applies filter changes immediately without debounce", async () => {
    render(
      <Search onSearch={mockOnSearch} onFilterChange={mockOnFilterChange} />
    );

    // First add a search term
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "react" },
    });

    // Fast-forward time for search to complete
    await vi.advanceTimersByTimeAsync(500);

    // Now change a filter
    const perPageSelect = screen.getByTestId("select-perPage");
    fireEvent.change(perPageSelect, { target: { value: "25" } });

    // Should immediately call onFilterChange without waiting
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: "react",
      perPage: 25,
      sortBy: "best_match",
      order: "desc",
    });
  });

    test("maintains filter values between renders", async () => {
      const { rerender } = render(
        <Search onSearch={mockOnSearch} onFilterChange={mockOnFilterChange} />
      );

      // Change perPage filter
      const perPageSelect = screen.getByTestId("select-perPage");
      fireEvent.change(perPageSelect, { target: { value: "25" } });

      // Add search term
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "react" },
      });

      // Rerender component
      rerender(
        <Search onSearch={mockOnSearch} onFilterChange={mockOnFilterChange} />
      );

      // Fast-forward time
      await vi.advanceTimersByTimeAsync(500);

      // Should maintain the changed perPage value
      expect(mockOnSearch).toHaveBeenCalledWith({
        search: "react",
        perPage: 25, // The new value should persist
        sortBy: "best_match",
        order: "desc",
      });
    });
});
