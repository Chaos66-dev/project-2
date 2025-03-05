import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./CartItem.css"; // Import the external CSS file

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
        <div className="cart-item">
            {/* Item Image */}
            <img className="cart-item-image" src={item.image} alt={item.name} />

            {/* Item Info */}
            <div className="cart-item-info">
                <Typography variant="h6" className="cart-item-name">{item.name}</Typography>

                {/* Price Details */}
                <Typography className="cart-item-original-price">
                    <strong>Original Price:</strong> ${item.price}
                </Typography>
                <Typography className="cart-item-total-price">
                    <strong>Total Price:</strong> ${item.price * item.quantity}
                </Typography>
            </div>

            {/* Styled Quantity Display */}
            <div className="cart-item-quantity-display">
                <Typography variant="subtitle1" className="cart-item-quantity-text">
                    Quantity: {item.quantity}
                </Typography>
            </div>

            {/* Quantity Controls */}
            <div className="cart-item-controls">
                <Button variant="outlined" onClick={handleDecrement} disabled={item.quantity <= 1}>-</Button>

                {/* Manual Quantity Input */}
                <TextField
                    type="number"
                    value={inputValue}
                    onChange={handleQuantityChange}
                    inputProps={{ min: 1, style: { textAlign: "center" } }}
                    className="cart-item-input"
                />

                <Button variant="outlined" onClick={handleIncrement}>+</Button>
            </div>

            {/* Remove Button */}
            <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.id)} className="cart-item-remove">
                Remove
            </Button>
        </div>
    );
}

export default CartItem;
