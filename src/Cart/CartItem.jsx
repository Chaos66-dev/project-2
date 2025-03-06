import { Button, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartItem.css";
import remSound from '../Sounds/subtract.mp3'
import clickSound from '../Sounds/click.mp3'

function CartItem({ item, removeFromCart, updateQuantity }) {
    // Create theme for Pokemon Font
    const pokemonFont = createTheme({
        typography: {
            "fontFamily": `PokemonClassic`
          },
    })

    const [inputValue, setInputValue] = useState(item.quantity);
    const navigate = useNavigate();
    const handleQuantityChange = (e) => {
        let newQuantity = e.target.value;
        if (!/^\d*$/.test(newQuantity)) return;

        setInputValue(newQuantity);

        if (newQuantity !== "" && parseInt(newQuantity, 10) >= 1) {
            updateQuantity(item.id, parseInt(newQuantity, 10));
        }
    };

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

    const goToItemDetails = () => {
      navigate(`/details/${item.id}`);
    };

    const remAudio = new Audio(remSound)
    const clickAudio = new Audio(clickSound)

    return (
        <ThemeProvider theme={pokemonFont}>
        <div className="cart-item">
            <img className="cart-item-image" src={item.image} alt={item.name} onClick={()=>{goToItemDetails(); clickAudio.play()}}/>

            <div className="cart-item-info">
                <Typography onClick={goToItemDetails} variant="h6" className="cart-item-name">{item.name} </Typography>

                <Typography className="cart-item-original-price">
                    <strong>Original Price:</strong> ${item.price}
                </Typography>
                <Typography className="cart-item-total-price">
                    <strong>Total Price:</strong> ${item.price * item.quantity}
                </Typography>
            </div>
            <div className="cart-item-quantity-display">
                <Typography variant="subtitle1" className="cart-item-quantity-text">
                    Quantity: {item.quantity}
                </Typography>
            </div>
            <div className="cart-item-controls">
                <Button variant="outlined" onClick={()=>{handleDecrement(); clickAudio.play()}} disabled={item.quantity <= 1}>-</Button>

                <TextField
                    type="number"
                    value={inputValue}
                    onChange={handleQuantityChange}
                    // inputProps={{ min: 1, style: { textAlign: "center" } }}
                    className="cart-item-input"
                />

                <Button variant="outlined" onClick={()=>{handleIncrement(); clickAudio.play()}}>+</Button>
            </div>

            <Button variant="outlined" color="secondary" onClick={() => {removeFromCart(item.id); remAudio.play()}} className="cart-item-remove">
                Remove
            </Button>
        </div>
        </ThemeProvider>
    );

}

export default CartItem;
