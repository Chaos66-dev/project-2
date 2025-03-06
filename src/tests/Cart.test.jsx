import { describe, beforeEach, test, expect,vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App/App.jsx";
import { MemoryRouter as Router } from 'react-router-dom';
import { CartProvider } from '../Cart/CartContext';

beforeEach(() => {
    // mocking as jsdom does not implement this and it throws errors during testing
    window.scrollTo = vi.fn();
    vi.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
  });


describe("Testing the cart page", () => {
    // Integration Test
    test("Items in the cart are displayed on the cart page", async () => {
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

      const cartButton = document.getElementById("cart-button");
      fireEvent.click(cartButton)

      expect(screen.getByText('Original Price:')).toBeInTheDocument();
    })

    test("Test cart total calculation", async () => {
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
      fireEvent.click(addToCart)
      fireEvent.click(addToCart)
      fireEvent.click(addToCart)

      const cartButton = document.getElementById("cart-button");
      fireEvent.click(cartButton)

      expect(screen.queryAllByText(/4000/).length).toBeGreaterThan(0)
    })

    test("clicking the incrememnt button in the cart, increments the amount of that item", async () => {
      render(
        <CartProvider>
          <Router initialEntries={['/cart']}>
            <App />
          </Router>
        </CartProvider>
      );
      const total_text = await screen.findAllByText(/4000/);
      expect(total_text.length).toBeGreaterThan(0);

      const plus = await screen.findByRole("button", {name: "+"});
      fireEvent.click(plus)

      expect(screen.queryAllByText(/4800/).length).toBeGreaterThan(0)
    })

    test("clicking the decrement button in the cart, decrements the amount of that item", async () => {
      render(
        <CartProvider>
          <Router initialEntries={['/cart']}>
            <App />
          </Router>
        </CartProvider>
      );
      const total_text = await screen.findAllByText(/4800/);
      expect(total_text.length).toBeGreaterThan(0);

      const minus = await screen.findByRole("button", {name: "-"});
      fireEvent.click(minus)

      expect(screen.queryAllByText(/4000/).length).toBeGreaterThan(0)
    })

    test("text modification of cart item count works", async () => {
      render(
        <CartProvider>
          <Router initialEntries={['/cart']}>
            <App />
          </Router>
        </CartProvider>
      );
      const total_text = await screen.findAllByText(/4000/);
      expect(total_text.length).toBeGreaterThan(0);

      const text_counter = await screen.findByRole('spinbutton');
      fireEvent.change(text_counter, {target: {value: '10'}})

      expect(screen.queryAllByText(/8000/).length).toBeGreaterThan(0)
    })

    test("clicking icon takes us to correct details page", async () => {
      render(
        <CartProvider>
          <Router initialEntries={['/cart']}>
            <App />
          </Router>
        </CartProvider>
      );
      const total_text = await screen.findAllByText(/8000/);
      expect(total_text.length).toBeGreaterThan(0);

      const icon = await screen.getByAltText("Ultra Ball")
      fireEvent.click(icon)

      const ultraBallFlavor = await screen.findByText("A better BALL with a higher catch rate than a GREAT BALL.")
      expect(ultraBallFlavor).toBeInTheDocument();
    })

    test("Clicking remove, empties the cart", async () => {
      render(
        <CartProvider>
          <Router initialEntries={['/cart']}>
            <App />
          </Router>
        </CartProvider>
      );

      const total_text = await screen.findAllByText(/8000/);
      expect(total_text.length).toBeGreaterThan(0);

      const remove = await screen.findByRole("button", {name: "Remove"});
      fireEvent.click(remove)

      await waitFor(() => {
        expect(screen.queryByText(/8000/)).toBeNull();
        expect(screen.queryByText('Ultra Ball')).toBeNull();
        expect(screen.queryByText('Price')).toBeNull();
        expect(screen.queryByText('Quantity')).toBeNull();
        expect(screen.queryByText('Remove')).toBeNull();
      });
    })
  })