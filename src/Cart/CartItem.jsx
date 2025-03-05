import { Button, TextField } from "@mui/material";
import { useState } from "react";

function CartItem({ item, removeFromCart, updateQuantity }) {
    const [inputValue, setInputValue] = useState(item.quantity);

    // Handle manual input change
    const handleQuantityChange = (e) => {
        let newQuantity = e.target.value;

        // Allow only numbers
        if (!/^\d*$/.test(newQuantity)) return;

        // Update the input field immediately
        setInputValue(newQuantity);

        // Convert to integer and update state (ensuring a minimum of 1)
        if (newQuantity !== "" && parseInt(newQuantity, 10) >= 1) {
            updateQuantity(item.id, parseInt(newQuantity, 10));
        }
    };

    // Handle increment and decrement buttons
    const handleIncrement = () => {
        const newQuantity = item.quantity + 1;
        setInputValue(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            setInputValue(newQuantity);
            updateQuantity(item.id, newQuantity);
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            {/* Item Image */}
            <img src={item.image} alt={item.name} width="50" />

            {/* Item Name & Price */}
            <span>{item.name} - ${item.price * item.quantity}</span>

            {/* Decrease Button */}
            <Button
                variant="outlined"
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
            >
                -
            </Button>

            {/* Manual Quantity Input */}
            <TextField
                type="number"
                value={inputValue}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                sx={{ width: "60px", textAlign: "center" }}
            />

            {/* Increase Button */}
            <Button variant="outlined" onClick={handleIncrement}>
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
