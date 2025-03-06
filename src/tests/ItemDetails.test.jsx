import { describe, beforeEach, test, expect,vi } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App/App.jsx";
import { MemoryRouter as Router } from 'react-router-dom';
import { CartProvider } from '../Cart/CartContext';

beforeEach(() => {
    // mocking as jsdom does not implement this and it throws errors during testing
    window.scrollTo = vi.fn();
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
  });

describe("Testing of itemDetails page", () => {
    // Unit Test
    test("Clicking on the 'add to cart' page adds an item to the cart", async () => {
      render(
        <CartProvider>
          <Router initialEntries={['/details/2']}>
            <App />
          </Router>
        </CartProvider>
      );

      const addToCart = await screen.findByRole("button", {name: "Add To Cart"});
      expect(addToCart).toBeInTheDocument();

      fireEvent.click(addToCart)

      expect(screen.getByText("1")).toBeInTheDocument();
    })

    test("English Flavor Text is rendered to screen", async () => {
      render(
        <CartProvider>
          <Router initialEntries={['/details/8']}>
            <App />
          </Router>
        </CartProvider>
      );
      const nestBallFlavor = await screen.findByText("A BALL that works better on weaker POKéMON.")
      expect(nestBallFlavor).toBeInTheDocument();

    })
  })