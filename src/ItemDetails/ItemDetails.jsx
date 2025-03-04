import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import ItemsContext from '../Context/ItemsContext'
import './ItemDetails.css'
import { separateHyphens } from '../utils.js'


function ItemDetails() {
    const { itemDetails } = useContext(ItemsContext)
    let { id } = useParams() // change to const once useParams in implemented
    // id = 1 // hard coded value to dev before use Params is working
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
                {/* add to cart button */}
                <div className='cart-button'>Cart Button</div>

            </div>
        </div>
    )
}

export default ItemDetails