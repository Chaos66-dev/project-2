import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import ItemsContext from '../Context/ItemsContext'
import './ItemDetails.css'


function ItemDetails() {
    const { items } = useContext(ItemsContext)
    const { id } = useParams()
    const item = items[id-1]

    return (
        <div className='itemDetails-container'>
            {/* image on left */}
            <div className='img-container'>
                <img src={item.sprites.default} alt='item' className='img'></img>
            </div>
            <div className='text-wrapper'>
                {/* Name/description text on right */}
                <div className='description-text'>Description Text</div>
                {/* add to cart button */}
                <div className='cart-button'>Cart Button</div>

            </div>
        </div>
    )
}

export default ItemDetails