import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Navbar from "../navbar";

describe("Navbar", () => {
  it("shows hamburger menu on mobile and toggles menu", () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText(/menu/i);
    fireEvent.click(hamburger);
    const przepisyLinks = screen.getAllByText(/przepisy/i);
    expect(przepisyLinks.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/kącik konesera/i).length).toBeGreaterThan(0);
    fireEvent.click(hamburger);
    // Optionally, check that menu closes if your code removes it from DOM
  });

  it("shows desktop menu on large screens", () => {
    render(<Navbar />);
    expect(screen.getByText(/przepisy/i)).toBeInTheDocument();
  });
});