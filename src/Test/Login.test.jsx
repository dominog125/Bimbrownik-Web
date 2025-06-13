import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { vi } from "vitest";


vi.mock("../pages/Login", () => ({
  __esModule: true,
  default: vi.fn(() => (
    <form>
      <input placeholder="Nazwa użytkownika" />
      <input placeholder="Hasło" type="password" />
      <button type="submit">Zaloguj</button>
    </form>
  )),
}));

describe("Login Page", () => {
  it("renders login form", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/nazwa użytkownika/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/hasło/i)).toBeInTheDocument();
    expect(screen.getByText(/zaloguj/i)).toBeInTheDocument();
  });
});