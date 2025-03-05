import { useContext } from "react";
import CartContext from "../Cart/CartContext";
import { Button } from "@mui/material";

function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <div>
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <img src={item.image} alt={item.name} width="50" />
                            <span>{item.name} - ${item.price}</span>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
