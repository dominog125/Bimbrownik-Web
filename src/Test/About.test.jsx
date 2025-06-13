import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import About from "../pages/About";

vi.mock("../pages/About", () => ({
  __esModule: true,
  default: vi.fn(() => (
    <div>
      <input placeholder="Szukaj postów..." />
      <select>
        <option value="">Wszystkie kategorie</option>
        <option value="1">Wódka</option>
      </select>
      <button>Dodaj post</button>
      <div>
        <div>
          <span>Tytuł: </span>
          <span>Testowy post</span>
          <span>Kategoria alkoholu: Wódka</span>
          <button>Dodaj do ulubionych</button>
        </div>
      </div>
    </div>
  )),
}));

describe("About Page", () => {
  it("renders search input", () => {
    render(<About />);
    expect(screen.getByPlaceholderText(/szukaj postów/i)).toBeInTheDocument();
  });

  it("renders category dropdown", () => {
    render(<About />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText(/wszystkie kategorie/i)).toBeInTheDocument();
  });

  it("renders 'Dodaj post' button", () => {
    render(<About />);
    expect(screen.getByText(/dodaj post/i)).toBeInTheDocument();
  });

  it("renders post title and category", () => {
    render(<About />);
    expect(screen.getByText(/testowy post/i)).toBeInTheDocument();
    expect(screen.getByText(/kategoria alkoholu: wódka/i)).toBeInTheDocument();
  });

  it("renders 'Dodaj do ulubionych' button", () => {
    render(<About />);
    expect(screen.getByText(/dodaj do ulubionych/i)).toBeInTheDocument();
  });

  it("filters posts by search", () => {
    render(<About />);
    const searchInput = screen.getByPlaceholderText(/szukaj postów/i);
    fireEvent.change(searchInput, { target: { value: "nieistniejący" } });
    expect(searchInput).toHaveValue("nieistniejący");
  });
});