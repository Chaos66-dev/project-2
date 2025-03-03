/* eslint-disable no-undef */
// src/App.test.jsx
import { render, screen } from "@testing-library/react";
import App from "../App/App.jsx";

describe("App", () => {
    beforeEach(() => {
      // Arrange
      render(<App />);
    });

    test("Renders the App", () => {
      // Act
      //   No Act steps needed
      // Assert
      expect(screen.getByText("PokeCommerce")).toBeInTheDocument();
    });

    test("Renders the search bar", () => {
      // Act
      //   No Act steps needed
      // Assert
      //   Check if the initial count is 0
      expect(screen.getByText("Search...")).toBeInTheDocument();
    });

    test("Renders our shopping card button", () => {
        expect(screen.getByText("Cart")).toBeInTheDocument();
    })
  });