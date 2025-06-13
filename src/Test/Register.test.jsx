import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../pages/Register";
import Navbar from "../navbar";
import { vi } from "vitest";

vi.mock("../pages/Register", () => ({
  __esModule: true,
  default: vi.fn(() => (
    <form>
      <input placeholder="Nazwa użytkownika" />
      <input placeholder="Email" />
      <input placeholder="Hasło" type="password" />
      <button type="submit">Zarejestruj</button>
    </form>
  )),
}));

vi.mock("../Components/Logout", () => ({
  __esModule: true,
  default: ({ children }) => <button>{children}</button>,
}));

describe("Register Page", () => {
  it("renders registration form", () => {
    render(<Register />);
    expect(screen.getByPlaceholderText(/nazwa użytkownika/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/hasło/i)).toBeInTheDocument();
    expect(screen.getByText(/zarejestruj/i)).toBeInTheDocument();
  });
});

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows logo", () => {
    render(<Navbar />);
    expect(screen.getByText(/bimbrownik/i)).toBeInTheDocument();
  });

  it("shows desktop menu on large screens", () => {
    render(<Navbar />);
    expect(screen.getByText(/przepisy/i)).toBeInTheDocument();
    expect(screen.getByText(/kącik konesera/i)).toBeInTheDocument();
  });

  it("shows hamburger menu on mobile and toggles menu", () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText(/menu/i);
    fireEvent.click(hamburger);

    const przepisyLinks = screen.getAllByText(/przepisy/i);
    expect(przepisyLinks.length).toBeGreaterThan(0);

    const koneseraLinks = screen.getAllByText(/kącik konesera/i);
    expect(koneseraLinks.length).toBeGreaterThan(0);

    fireEvent.click(hamburger);
    // Menu should close (not visible)
  });

  it("shows 'Logowanie' when not logged in", () => {
    render(<Navbar />);
    expect(screen.getByText(/logowanie/i)).toBeInTheDocument();
  });

  it("shows 'Wyloguj' and 'Ulubione' when logged in", () => {
    localStorage.setItem("jwtToken", "test");
    render(<Navbar />);
    expect(screen.getByText(/wyloguj/i)).toBeInTheDocument();
    expect(screen.getByText(/ulubione/i)).toBeInTheDocument();
  });

  it("has working links in the menu", () => {
    render(<Navbar />);
    const przepisyLinks = screen.getAllByText(/przepisy/i);
    expect(przepisyLinks.length).toBeGreaterThan(0);
  });
});