import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("renders the footer text", () => {
    render(<Footer />);
    
    const footerText = screen.getByText("Lorem ipsum dolor sit amet, consctetur adipiscing elit");

    expect(footerText).toBeInTheDocument();
  });
});