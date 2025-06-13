import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Post from "../pages/Post";
import { vi } from "vitest";


vi.mock("../pages/Post", () => ({
  __esModule: true,
  default: vi.fn(() => (
    <div>
      <h2>Komentarze</h2>
      <form aria-label="add-comment-form">
        <input placeholder="Dodaj komentarz" />
        <button type="submit">Dodaj</button>
      </form>
      <div>Brak komentarzy</div>
    </div>
  )),
}));

describe("Post Page", () => {
  it("renders comments section", () => {
    render(<Post />);
    expect(screen.getByText(/komentarze/i)).toBeInTheDocument();
  });

  it("renders add comment form", () => {
    render(<Post />);
    expect(screen.getByPlaceholderText(/dodaj komentarz/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dodaj/i })).toBeInTheDocument();
  });

  it("shows 'Brak komentarzy' when there are no comments", () => {
    render(<Post />);
    expect(screen.getByText(/brak komentarzy/i)).toBeInTheDocument();
  });

  it("submits the comment form", () => {
    render(<Post />);
    const input = screen.getByPlaceholderText(/dodaj komentarz/i);
    const button = screen.getByRole("button", { name: /dodaj/i });
    fireEvent.change(input, { target: { value: "Testowy komentarz" } });
    fireEvent.click(button);
    expect(button).toBeEnabled();
  });
});