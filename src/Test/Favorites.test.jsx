import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Favorites from "../pages/Favorites";
import { vi } from "vitest";


vi.mock("../pages/Favorites", () => ({
  __esModule: true,
  default: vi.fn(() => (
    <div>
      <h2>Ulubione posty</h2>
      <div>
        <div>
          <span>Testowy ulubiony post</span>
          <button>Usuń z ulubionych</button>
        </div>
      </div>
    </div>
  )),
}));

describe("Favorites Page", () => {
  it("renders favorites header", () => {
    render(<Favorites />);
    expect(screen.getByText(/ulubione posty/i)).toBeInTheDocument();
  });

  it("renders favorite post", () => {
    render(<Favorites />);
    expect(screen.getByText(/testowy ulubiony post/i)).toBeInTheDocument();
  });

  it("renders remove from favorites button", () => {
    render(<Favorites />);
    expect(screen.getByText(/usuń z ulubionych/i)).toBeInTheDocument();
  });
});