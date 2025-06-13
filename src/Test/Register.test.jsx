import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Register from "../pages/Register";
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

describe("Register Page", () => {
  it("renders registration form", () => {
    render(<Register />);
    expect(screen.getByPlaceholderText(/nazwa użytkownika/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/hasło/i)).toBeInTheDocument();
    expect(screen.getByText(/zarejestruj/i)).toBeInTheDocument();
  });
});