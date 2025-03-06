import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage when the app starts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) setCart(storedCart);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex !== -1) {
                // If the item exists, increase the quantity
                updatedCart[existingItemIndex].quantity += 1;
            } else {
                // Otherwise, add the item with quantity = 1
                updatedCart.push({ ...item, quantity: 1 });
            }

            return updatedCart;
        });
    };


    const removeFromCart = (id) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const indexToRemove = updatedCart.findIndex(item => item.id === id);
            if (indexToRemove !== -1) {
                updatedCart.splice(indexToRemove, 1);
            }

            return updatedCart; // Update the cart state
        });
    };

    const updateQuantity = (id, newQuantity) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            return updatedCart;
        });
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
