import { useContext } from "react";
import CartContext from "../Cart/CartContext";
import { Typography } from "@mui/material";
import CartItem from "./CartItem.jsx";

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                    ))}

                    {/* Total Price */}
                    <Typography variant="h6" sx={{ marginTop: 2, fontWeight: "bold" }}>
                        Total: ${totalPrice}
                    </Typography>
                </>
            )}
        </div>
    );
}

export default Cart;
