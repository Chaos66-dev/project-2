import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import ItemsContext from '../Context/ItemsContext'
import './ItemDetails.css'
import { separateHyphens } from '../utils.js'
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


function ItemDetails() {
    const { itemDetails } = useContext(ItemsContext)
    let { id } = useParams()
    const item = itemDetails[id-1]

    return (
        <div className='itemDetails-container'>
            {/* image on left */}
            <div className='img-container'>
                <img src={item.sprites.default} alt='item' className='img'></img>
            </div>
            <div className='text-wrapper'>
                {/* Name/description text on right */}
                <h1 className='description-text'>{separateHyphens(item.name)}</h1>
                <h3>{item.flavor_text_entries[0].text}</h3>
                <div className='item-price-wrapper'>
                    <img src="../assets/pokeDollar.png" alt='poke dollars' className='poke-dollar-img'/>
                    <h3 className='item-cost-text'>{item.cost}</h3>
                </div>
                {/* add to cart button */}
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    >
                    Cart
                </Button>

            </div>
        </div>
    )
}

export default ItemDetails