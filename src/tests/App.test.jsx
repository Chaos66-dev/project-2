// src/App.test.jsx
import { describe, beforeEach, test, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import App from "../App/App.jsx";
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '../Cart/CartContext';

describe("App", () => {
    beforeEach(() => {
      // Arrange
      render(
        <CartProvider>
          <Router>
            <App />
          </Router>
        </CartProvider>
      );
    });

    describe("Test rendering of individual components", () => {
      test("Renders ItemCards (assuming first one is ultra-ball)", async () => {
        const ultraBall = await screen.findByText("Ultra Ball", {}, { timeout: 3000 });
        const potion = await screen.findByText("Potion", {}, { timeout: 3000 });
        const rare_candy = await screen.findByText("Rare Candy", {}, { timeout: 3000 });
        expect(ultraBall).toBeInTheDocument();
        expect(potion).toBeInTheDocument();
        expect(rare_candy).toBeInTheDocument();
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
        const cart = document.getElementById('cart-button')
        expect(cart).toBeInTheDocument();
      })

    })

    describe("Clicking buttons reroutes/does something", () => {

    })
  });