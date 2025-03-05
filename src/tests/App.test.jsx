// src/App.test.jsx
import { describe, beforeEach, test, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import App from "../App/App.jsx";
import { BrowserRouter as Router } from 'react-router-dom';



describe("App", () => {
    beforeEach(() => {
      // Arrange
      render(
        <Router>
          <App />
        </Router>
      );
    });

    describe("Test rendering of individual components", () => {
      test("Renders ItemCards (assuming first one is ultra-ball", async () => {
        const ultraBall = await screen.findByText("Ultra Ball", {}, { timeout: 3000 });
        expect(ultraBall).toBeInTheDocument();
      })
      test("Renders the name", () => {
        // Act
        //   No Act steps needed
        // Assert
        expect(screen.getByText("PokeCommerce")).toBeInTheDocument();
      });

      test("Renders the search bar", () => {
        // Arrange
        const search_bar = document.getElementById('search')
        // Act
        //   No Act steps needed
        // Assert
        expect(search_bar).toBeInTheDocument();
      });

      test("Renders the Home button", () => {
        // Arrange
        const home_button = document.getElementById('home-button')
        // Act
        //   No Act steps needed
        // Assert
        expect(home_button).toBeInTheDocument();
      });

      test("Renders our shopping cart button", () => {
        const cart = document.getElementById('cart')
        expect(cart).toBeInTheDocument();
      })

    })
  });