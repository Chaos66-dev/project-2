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
