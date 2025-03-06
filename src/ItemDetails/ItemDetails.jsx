import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ItemsContext from '../Context/ItemsContext';
import CartContext from '../Cart/CartContext.jsx'; // Import Cart Context
import './ItemDetails.css';
import { separateHyphens, getEnglishFlavorText } from '../utils.js';
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import clickAudio from '../Sounds/click.mp3'


function ItemDetails() {
    const { itemDetails } = useContext(ItemsContext);
    const { addToCart } = useContext(CartContext); // Get addToCart function
    let { id } = useParams();
    const item = itemDetails[id - 1]; // Adjust for 0-based index
    const audio = new Audio(clickAudio)

     // Create theme for Pokemon Font
    const pokemonFont = createTheme({
        typography: {
                 "fontFamily": `PokemonClassic`
            },
        })

    // Function to handle adding an item to the cart
    const handleAddToCart = () => {
        const cartItem = {
            id: item.id,
            name: separateHyphens(item.name),
            price: item.cost,
            image: item.sprites.default,
        };
        addToCart(cartItem);
    };

    return (
        <ThemeProvider theme={pokemonFont}>
        <div className='itemDetails-container'>
            {/* Image on left */}
            <div className='img-container'>
                <img src={item.sprites.default} alt={item.name} className='img' />
            </div>

            <div className='text-wrapper'>
                {/* Name/description text on right */}
                <h1 className='description-text'>{separateHyphens(item.name)}</h1>
                <h3>{getEnglishFlavorText(item.flavor_text_entries)}</h3>

                <div className='item-price-wrapper'>
                    <h3 className='item-cost-text'>${item.cost}</h3>
                </div>

                {/* Add to Cart Button */}
                <Button
                    variant="outlined"
                    color="primary"
                    role='button'
                    id='add-to-cart-button'
                    startIcon={<ShoppingCartIcon />}
                    onClick={()=>{handleAddToCart(); audio.play()}} // Add click handler
                >
                    Add To Cart
                </Button>
            </div>
        </div>
        </ThemeProvider>
    );
}

export default ItemDetails;
