import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Main from "../Main";

// Mock the fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("Main Component Integration", () => {
  const mockDrinks = [
    {
      idDrink: "11007",
      strDrink: "Margarita",
      strDrinkThumb: "https://example.com/margarita.jpg",
      strInstructions: "Mix ingredients",
      strAlcoholic: "Alcoholic",
      strGlass: "Cocktail glass",
    },
    {
      idDrink: "11008",
      strDrink: "Mojito",
      strDrinkThumb: "https://example.com/mojito.jpg",
      strInstructions: "Mix mint and sugar",
      strAlcoholic: "Alcoholic",
      strGlass: "Highball glass",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock fetch to return mock data
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ drinks: mockDrinks }),
    });
  });

  test("should show initial empty state", () => {
    render(<Main />);

    // Check that header and search components are rendered
    expect(screen.getByText("Drink recipes")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search drink/i)).toBeInTheDocument();

    // Initial state should not show results or "no results" message
    expect(screen.queryByText("No results found")).not.toBeInTheDocument();
    expect(screen.queryByTestId("results")).not.toBeInTheDocument();
  });

  test("should search for drinks and display results", async () => {
    render(<Main />);

    // Perform search
    const searchInput = screen.getByPlaceholderText(/search drink/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.type(searchInput, "Margarita");
    await userEvent.click(searchButton);

    // Verify API was called with correct parameters
    expect(mockFetch).toHaveBeenCalledWith(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita"
    );

    // Wait for results to display
    await waitFor(() => {
      expect(screen.getByTestId("results")).toBeInTheDocument();
    });
    expect(
      screen.getByRole("heading", { name: /results/i })
    ).toBeInTheDocument();

    // Verify drink items are displayed
    const drinkItems = await screen.findAllByTestId("drink-item");
    expect(drinkItems).toHaveLength(2);
    expect(drinkItems[0]).toHaveTextContent("Margarita");
    expect(drinkItems[1]).toHaveTextContent("Mojito");
  });
  test("should show drink description when More Info button is clicked", async () => {
    render(<Main />);

    // Perform search to get results
    const searchInput = screen.getByPlaceholderText(/search drink/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.type(searchInput, "Margarita");
    await userEvent.click(searchButton);

    // Wait for results to display
    await waitFor(() => {
      expect(screen.getByTestId("results")).toBeInTheDocument();
    });

    expect(screen.queryByText("Mix ingredients")).not.toBeInTheDocument();

    const moreInfoButtons = screen.getAllByRole("button", {
      name: /more info/i,
    });
    const margaritaButton = moreInfoButtons[0]; // Assuming first result is Margarita

    // Click the More Info button
    await userEvent.click(margaritaButton);

    // Description should now be visible
    expect(screen.getByText("Mix ingredients")).toBeInTheDocument();

    // Click the button again (which should now say "Less Info" or similar)
    const hideInfoButton = screen.getByRole("button", { name: /less info/i });
    await userEvent.click(hideInfoButton);

    // Description should be hidden again
    expect(screen.queryByText("Mix ingredients")).not.toBeInTheDocument();
  });

  test('should show "No results found" when API returns null drinks', async () => {
    // Override mock to return null drinks
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ drinks: null }),
    });

    render(<Main />);

    // Perform search
    const searchInput = screen.getByPlaceholderText(/search drink/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.type(searchInput, "NonExistentDrink");
    await userEvent.click(searchButton);

    // Wait for "No results" message
    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    // Grid should not be displayed
    expect(screen.queryByTestId("results")).not.toBeInTheDocument();
  });

  test("should handle API errors gracefully", async () => {
    // Mock a fetch error
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(<Main />);

    // Perform search
    const searchInput = screen.getByPlaceholderText(/search drink/i);
    const searchButton = screen.getByRole("button", { name: /search/i });

    await userEvent.type(searchInput, "ErrorDrink");
    await userEvent.click(searchButton);

    // Verify error was logged
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    // State should remain as initial
    expect(screen.queryByText("No results found")).not.toBeInTheDocument();
    expect(screen.queryByTestId("results")).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
