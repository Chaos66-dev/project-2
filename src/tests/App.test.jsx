// src/App.test.jsx
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


describe("App", () => {
  describe("Test rendering of individual components", () => {
      beforeEach(() => {
        // Arrange
        render(
          <CartProvider>
            <Router initialEntries={['/']}>
              <App />
            </Router>
          </CartProvider>
        );
      });

      // unit test
      test("Renders ItemCards (assuming first one is ultra-ball)", async () => {
        const ultraBall = await screen.findByText("Ultra Ball", {}, { timeout: 6000 });
        const potion = await screen.findByText("Potion", {}, { timeout: 6000 });
        const rare_candy = await screen.findByText("Rare Candy", {}, { timeout: 6000 });
        expect(ultraBall).toBeInTheDocument();
        expect(potion).toBeInTheDocument();
        expect(rare_candy).toBeInTheDocument();
      })

      // unit test
      test("Renders the name", () => {
        // Act
        //   No Act steps needed
        // Assert
        expect(screen.getByText("PokéMart™ Online!")).toBeInTheDocument();
      });

      // unit test
      test("Renders the search bar", () => {
        // Arrange
        const search_bar = document.getElementById('search')
        // Act
        //   No Act steps needed
        // Assert
        expect(search_bar).toBeInTheDocument();
      });

      // unit test
      test("Renders the Home button", () => {
        // Arrange
        const home_button = document.getElementById('home-button')
        // Act
        //   No Act steps needed
        // Assert
        expect(home_button).toBeInTheDocument();
      });

      // unit test
      test("Renders our shopping cart button", () => {
        const cart = document.getElementById('cart-button')
        expect(cart).toBeInTheDocument();
      })

    })

    describe("Clicking buttons reroutes/does something", () => {
      // integration test
      test("Clicking on the home button takes us to the route '/' and displays the item cards", async () => {
        render(
          <CartProvider>
            <Router initialEntries={['/cart']}>
              <App />
            </Router>
          </CartProvider>
        );

        const cartText = await screen.findByText("Your Cart", {}, {timeout: 5000});
        expect(cartText).toBeInTheDocument();
        expect(screen.getByText("Your Cart")).toBeInTheDocument();

        const homeButton = document.getElementById("home-button")
        fireEvent.click(homeButton)

        const ultraBall = await screen.findByText("Ultra Ball", {}, { timeout: 6000 });
        expect(ultraBall).toBeInTheDocument();
      })

      // integration test
      test("Clicking on the cart button does something", async () => {
        render(
          <CartProvider>
            <Router>
              <App />
            </Router>
          </CartProvider>
        );

        const cartButton = document.getElementById("cart-button");
        fireEvent.click(cartButton);

        const cartText = await screen.findByText("Your Cart", {}, {timeout: 5000});
        expect(cartText).toBeInTheDocument();
        expect(screen.getByText("Your Cart")).toBeInTheDocument();
      })

      // integration test
      test("Clicking on an item takes us to the item details page", async () => {
        render(
          <CartProvider>
            <Router initialEntries={['/']}>
              <App />
            </Router>
          </CartProvider>
        );

        const ultraBall = await screen.findByText("Ultra Ball", {}, { timeout: 6000 });
        expect(ultraBall).toBeInTheDocument();

        const ultraLink = ultraBall.closest('a')
        expect(ultraLink).toHaveAttribute('href', '/details/2');
        fireEvent.click(ultraLink)


        const ultraBallDetails = await screen.findByText("A better BALL with a higher catch rate than a GREAT BALL.", {}, { timeout: 6000})
        expect(ultraBallDetails).toBeInTheDocument();
        expect(screen.getByText("A better BALL with a higher catch rate than a GREAT BALL.")).toBeInTheDocument();

        const add_to_cart = await screen.findByText('Add To Cart')
        expect(add_to_cart).toBeInTheDocument();
        expect(screen.getByText("Add To Cart")).toBeInTheDocument();
      })

    })

    describe("Test search bar functionality", () => {
      test("Test that user input is searched by lowercase", async () => {
        render(
          <CartProvider>
            <Router initialEntries={['/']}>
              <App />
            </Router>
          </CartProvider>
        );
        const ultraBall = await screen.findByText("Ultra Ball");
        expect(ultraBall).toBeInTheDocument();

        const text_counter = await screen.findByRole('textbox');
        fireEvent.change(text_counter, {target: {value: 'ULTRA'}})

        const ultraBall2 = await screen.findByText("Ultra Ball");
        expect(ultraBall2).toBeInTheDocument();
      })

      test("Test that user input filters the displayed items", async () => {
        render(
          <CartProvider>
            <Router initialEntries={['/']}>
              <App />
            </Router>
          </CartProvider>
        );
        const ultraBall = await screen.findByText("Ultra Ball");
        const potion = await screen.findByText("Potion");
        expect(ultraBall).toBeInTheDocument();
        expect(potion).toBeInTheDocument();

        const text_counter = await screen.findByRole('textbox');
        fireEvent.change(text_counter, {target: {value: 'ultra'}})

        const ultraBall2 = await screen.findByText("Ultra Ball");
        expect(ultraBall2).toBeInTheDocument();
        await waitFor(() => {
          expect(screen.queryByText('Potion')).toBeNull();
        })
      })
    })


  });