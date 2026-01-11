import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import { AuthProvider } from "../../context/AuthContext";
import * as api from "../../api/api";

vi.mock("../../api/api");

const renderWithProviders = (component, { user = "testuser" } = {}) => {
  global.localStorage = {
    getItem: vi.fn(() =>
      user ? JSON.stringify({ username: user }) : null
    ),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loader while fetching data", () => {
    api.fetchData.mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays welcome message with username", async () => {
    api.fetchData.mockResolvedValue({
      data: [{ id: 1, title: "Test Post", body: "Test body" }],
    });

    renderWithProviders(<Dashboard />, { user: "testuser" });

    await waitFor(() => {
      expect(
        screen.getByText("Welcome, testuser!")
      ).toBeInTheDocument();
    });
  });

  it("renders charts using fetched data", async () => {
    api.fetchData.mockResolvedValue({
      data: [
        { id: 1, title: "First Post", body: "First body content" },
        { id: 2, title: "Second Post", body: "Second body content" },
      ],
    });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Title Length Trend")).toBeInTheDocument();
      expect(screen.getByText("Body Length Comparison")).toBeInTheDocument();
    });
  });

  it("shows error message on API failure", async () => {
    api.fetchData.mockRejectedValue(new Error("Network error"));

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load dashboard data/i)
      ).toBeInTheDocument();
    });
  });

  it("shows empty state when no data is returned", async () => {
    api.fetchData.mockResolvedValue({ data: [] });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("No data available")).toBeInTheDocument();
    });
  });

  it("calls fetchData once on mount", async () => {
    api.fetchData.mockResolvedValue({ data: [] });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(api.fetchData).toHaveBeenCalledTimes(1);
    });
  });
});
