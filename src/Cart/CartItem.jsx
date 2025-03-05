<<<<<<< HEAD
import { Button } from "@mui/material";

function CartItem({ item, removeFromCart }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <img src={item.image} alt={item.name} width="50" />
            <span>{item.name} - ${item.price}</span>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeFromCart(item.id)}
            >
                Remove
            </Button>
        </div>
    );
}

export default CartItem;
=======
import { Button } from "@mui/material";

function CartItem({ item, removeFromCart, updateQuantity }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            {/* Item Image */}
            <img src={item.image} alt={item.name} width="50" />

            {/* Item Name & Price */}
            <span>{item.name} - ${item.price * item.quantity}</span>

            {/* Quantity Controls */}
            <Button
                variant="outlined"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
            >
                -
            </Button>
            <span>{item.quantity}</span>
            <Button
                variant="outlined"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
                +
            </Button>

            {/* Remove Button */}
            <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.id)}>
                Remove
            </Button>
        </div>
    );
}

export default CartItem;
>>>>>>> d1c0ab9 (added quantity functionality to components in cart)
