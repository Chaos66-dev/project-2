import { useContext } from "react";
import CartContext from "../Cart/CartContext";
import { Button, Typography } from "@mui/material";
import CartItem from './CartItem.jsx';

function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    return (
        <div>
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
              <>
                <ul>
                {cart.map((item) => (
                    <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
                  ))}
                </ul>
                <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
                  <Typography variant="h6" sx={{ marginTop: 2, fontWeight: "bold" }}>
                    Total: ${totalPrice}
                  </Typography>
                </div>
              </>
            )}
        </div>
    );
}

export default Cart;
