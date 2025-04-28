import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { vi, describe, test, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("App Component", () => {
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
    mockFetch.mockClear();
    // Default mock implementation returns empty results
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ items: [] }),
    });
  });

  test("renders header and search components on initial load", () => {
    render(<App />);

    // Header should be visible
    expect(screen.getByText("Github Repository Search")).toBeInTheDocument();

    // Search input should be visible
    expect(
      screen.getByPlaceholderText("Search for a repository...")
    ).toBeInTheDocument();

    // Results should not be visible initially (isEmpty is true)
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  test("does not show Results when search is empty", async () => {
    render(<App />);

    // Type in search box and clear it
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    await userEvent.type(searchInput, "react");
    await userEvent.clear(searchInput);

    // Results component should not be rendered
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("No results found")).not.toBeInTheDocument();
  });

  test("shows loading state when search is in progress", async () => {
    // Setup delayed response
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ items: mockRepositories }),
              }),
            100
          )
        )
    );

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    await userEvent.type(searchInput, "react");

    // Loading state should be visible
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  test("displays repositories when search returns results", async () => {
    // Mock successful response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: mockRepositories }),
    });

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    await userEvent.type(searchInput, "react");

    // Wait for repositories to be displayed
    await waitFor(() => {
      expect(screen.getByText("react")).toBeInTheDocument();
      expect(screen.getByText("react-router")).toBeInTheDocument();
    });

    // Description should be visible
    expect(
      screen.getByText("A JavaScript library for building user interfaces")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Declarative routing for React")
    ).toBeInTheDocument();
  });

  test("displays error message when API request fails", async () => {
    // Mock error response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    await userEvent.type(searchInput, "react");

    // Error message should be visible
    await waitFor(() => {
      expect(screen.getByText("GitHub API returned 403")).toBeInTheDocument();
    });
  });

  test("displays no results message when search returns empty results", async () => {
    // Mock empty response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [] }),
    });

    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    await userEvent.type(searchInput, "nonexistentrepository123456789");

    // No results message should be visible
    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });

  test("constructs correct API URL with search parameters", async () => {
    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );
    await userEvent.type(searchInput, "react");

    // Select different per_page value
    const perPageDropdown = screen.getByLabelText("Items per page");
    await userEvent.selectOptions(perPageDropdown, "25");

    // Check that fetch was called with correct URL parameters
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("q=react&per_page=25")
      );
    });

    // Select different sort option
    const sortByDropdown = screen.getByLabelText("Sort by");
    await userEvent.selectOptions(sortByDropdown, "stars");

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("sort=stars")
      );
    });
  });

  test("cancels previous search when new filter is applied", async () => {
    vi.useFakeTimers();
    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );

    // Wrap in act to capture state updates
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "react" } });
    });

    act(() => {
      vi.advanceTimersByTime(500); // Advance timers to trigger debounce
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringContaining("q=react")
    );

    // Change sort option - wrap in act again
    const sortByDropdown = screen.getByLabelText("Sort by");
    await act(async () => {
      fireEvent.change(sortByDropdown, { target: { value: "stars" } });
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringContaining("sort=stars")
    );

    // Restore timers
    vi.useRealTimers();
  });

  test("search and imiidiately filter", async () => {
    vi.useFakeTimers();
    render(<App />);

    // Search for repositories
    const searchInput = screen.getByPlaceholderText(
      "Search for a repository..."
    );

    // Wrap in act to capture state updates
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "react" } });
    });

    expect(mockFetch).toHaveBeenCalledTimes(0);

    // Change sort option - wrap in act again
    const sortByDropdown = screen.getByLabelText("Sort by");
    await act(async () => {
      fireEvent.change(sortByDropdown, { target: { value: "stars" } });
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringContaining("q=react")
    );
    expect(mockFetch).toHaveBeenLastCalledWith(
      expect.stringContaining("&sort=stars")
    );

    // Restore timers
    vi.useRealTimers();
  });
});
