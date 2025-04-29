import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { vi, describe, test, expect, beforeEach } from "vitest";
// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("GitHub Repository Search - Integration Tests", () => {
  const mockRepositories = [
    {
      id: 1,
      name: "react",
      description: "A JavaScript library for building user interfaces",
      html_url: "https://github.com/facebook/react",
      stargazers_count: 200000,
    },
    {
      id: 2,
      name: "react-router",
      description: "Declarative routing for React",
      html_url: "https://github.com/remix-run/react-router",
      stargazers_count: 50000,
    },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
    mockFetch.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ items: [] }),
    });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test("initial app state - should render header and search, but no results", () => {
    render(<App />);

    // Header should be visible
    expect(screen.getByText("Github Repository Search")).toBeInTheDocument();

    // Search components should be present
    expect(
      screen.getByPlaceholderText("Search for a repository...")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Items per page")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
    expect(screen.getByLabelText("Order")).toBeInTheDocument();

    // Results should NOT be visible initially
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("No results found")).not.toBeInTheDocument();
  });

  test("search flow - entering text shows results after debounce", async () => {
    // Mock successful response - make sure it works with fake timers
    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: mockRepositories }),
      });
    });

    render(<App />);

    // Type in search box
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    fireEvent.change(searchInput, { target: { value: "react" } });

    // Results should not appear immediately (debounce)
    expect(mockFetch).not.toHaveBeenCalled();

    // Run timers to trigger the debounced search
    act(() => {
      vi.runAllTimers();
    });

    // Now fetch should be called
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("q=react&per_page=10&sort=best_match&order=desc")
    );

    // Switch back to real timers to allow waitFor to work properly
    vi.useRealTimers();

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText("react")).toBeInTheDocument();
      expect(screen.getByText("react-router")).toBeInTheDocument();
    }); // Adding explicit timeout
  });

  test("empty search - clearing search text", async () => {
    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: mockRepositories }),
      });
    });

    render(<App />);

    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );

    // First enter search text
    act(() => {
      fireEvent.change(searchInput, { target: { value: "react" } });
    });

    // Advance timer to trigger the debounced search
    act(() => {
      vi.runAllTimers();
    });

    // Then clear the search - use act to properly handle the state update
    act(() => {
      fireEvent.change(searchInput, { target: { value: "" } });
    });

    // Run timers to process any debounce on the clear operation
    act(() => {
      vi.runAllTimers();
    });

    // Switch back to real timers for waitFor
    vi.useRealTimers();

    // Now check that results are removed
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.queryByText("No results found")).not.toBeInTheDocument();

      // API should not be called again for empty search
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  test("all filter combinations - filters affect API calls", async () => {
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: mockRepositories }),
      })
    );

    render(<App />);

    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );

    // First search
    fireEvent.change(searchInput, { target: { value: "react" } });

    // Advance timers to process debounce
    await act(async () => {
      vi.runAllTimers();
    });

    // Change perPage filter
    const perPageDropdown = screen.getByLabelText("Items per page");
    fireEvent.change(perPageDropdown, { target: { value: "25" } });

    // No debounce for filters? (assume instant call) — you may need act() here if your component delays updating filters

    // Change sortBy filter
    const sortByDropdown = screen.getByLabelText("Sort by");
    fireEvent.change(sortByDropdown, { target: { value: "stars" } });

    // Change order filter
    const orderDropdown = screen.getByLabelText("Order");
    fireEvent.change(orderDropdown, { target: { value: "asc" } });

    // Advance timers again to catch any late debounce from typing/filters
    await act(async () => {
      vi.runAllTimers();
    });

    // Now check API call parameters
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("q=react"));
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("per_page=25")
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("sort=stars")
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("order=asc")
    );
  });

  test("API error handling - shows error message", async () => {
    // Mock error response
    mockFetch.mockResolvedValue({
      ok: false,
      status: 403,
    });

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    fireEvent.change(searchInput, { target: { value: "react" } });

    await act(async () => {
      vi.runAllTimers();
    });

    expect(screen.getByText("GitHub API returned 403")).toBeInTheDocument();
  });

  test("empty results - shows no results found message", async () => {
    // Mock empty response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ items: [] }),
    });

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    fireEvent.change(searchInput, {
      target: { value: "nonexistentrepository" },
    });

    await act(async () => {
      vi.runAllTimers();
    });

    //     // No results message should be visible
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  test("loading state - shows loading indicator during API calls", async () => {
    // Mock delayed response to simulate loading state
    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({ items: mockRepositories }),
            });
          }, 500); // Simulate a 500ms delay in the API response
        })
    );

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    fireEvent.change(searchInput, { target: { value: "react" } });

    // Trigger debounce
    act(() => {
      vi.runAllTimers(); // Advance timers to trigger the debounce effect
    });

    // Assert that the loading state is visible immediately after the debounce
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // Advance time to complete the API call
    await act(async () => {
      vi.advanceTimersByTime(500); // Simulate the API response delay
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("react-router")).toBeInTheDocument();
  });

  test("search cancellation - changing filters cancels previous search", async () => {
    // Single mock implementation
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: mockRepositories }),
      })
    );

    render(<App />);

    // Type search text but don't advance timer yet
    act(() => {
      const searchInput = screen.getByPlaceholderText(
        "Search for a repository..."
      );
      fireEvent.change(searchInput, { target: { value: "react" } });
    });

    // Change filter immediately (before debounce timer fires)
    act(() => {
      const sortByDropdown = screen.getByLabelText("Sort by");
      fireEvent.change(sortByDropdown, { target: { value: "stars" } });
    });

    // Now advance timers to trigger the debounced search
    act(() => {
      vi.runAllTimers();
    });

    // Switch to real timers for the fetch promise
    vi.useRealTimers();

    // Wait for fetch to complete and verify it was called only once
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("q=react&per_page=10&sort=stars&order=desc")
      );
    });
  });

  test("repository cards - display all required information", async () => {
    // Mock successful response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ items: mockRepositories }),
    });

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    fireEvent.change(searchInput, { target: { value: "react" } });

    await act(async () => {
      vi.runAllTimers();
    });

    // Wait for results
    //   await waitFor(() => {
    // Verify repository names
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("react-router")).toBeInTheDocument();

    // Verify descriptions
    expect(
      screen.getByText("A JavaScript library for building user interfaces")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Declarative routing for React")
    ).toBeInTheDocument();

    // Verify star counts
    expect(screen.getByText("Stars: 200000")).toBeInTheDocument();
    expect(screen.getByText("Stars: 50000")).toBeInTheDocument();

    // Verify links
    const links = screen.getAllByText("View Repository");
    expect(links[0]).toHaveAttribute(
      "href",
      "https://github.com/facebook/react"
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://github.com/remix-run/react-router"
    );
  });

  test("network error - shows appropriate error message", async () => {
    // Mock network error
    mockFetch.mockRejectedValue(new Error("Network error"));

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    fireEvent.change(searchInput, { target: { value: "react" } });

    await act(async () => {
      vi.runAllTimers();
    });

    // Error message should be visible
    //   await waitFor(() => {
    expect(screen.getByText("Network error")).toBeInTheDocument();
    //   });
  });
});
