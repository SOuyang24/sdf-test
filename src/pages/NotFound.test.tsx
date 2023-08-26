import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound"; 

describe("NotFound Component", () => {
  it("renders the not found message and home page link", () => {
    render(<NotFound />);
    
    const notFoundMessage = screen.getByText("Sorry, we could not find that page");
    const homePageLink = screen.getByText("Our home page");

    expect(notFoundMessage).toBeInTheDocument();
    expect(homePageLink).toBeInTheDocument();
    expect(homePageLink.getAttribute("href")).toBe("/");
  });
});






