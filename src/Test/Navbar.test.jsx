import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Navbar from "../navbar";

describe("Navbar", () => {
  it("shows hamburger menu on mobile and toggles menu", () => {
    // Set window size to mobile
    window.innerWidth = 500;
    render(<Navbar />);
    const hamburger = screen.getByLabelText(/menu/i);
    expect(hamburger).toBeInTheDocument();

    // Open menu
    fireEvent.click(hamburger);
    const przepisyLinks = screen.getAllByText(/przepisy/i);
    expect(przepisyLinks.length).toBeGreaterThan(0);
  });

  it("shows desktop menu on large screens", () => {
    window.innerWidth = 1200;
    render(<Navbar />);
   expect(screen.getByText(/przepisy/i)).toBeInTheDocument();

  expect(screen.queryByLabelText(/menu/i)).toBeVisible();
});
});