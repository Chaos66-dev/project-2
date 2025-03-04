import { Link } from "react-router-dom";
import { separateHyphens } from '../utils.js'
import "./ItemCard.css"

function ItemCard ({prop}) {
    if(prop.cost > 0){
        return (
            <Link to={`/details/${prop.id}`}>
                <div className='card-container'>
                    <div className='item-title'>
                    {separateHyphens(prop.name)}
                    </div>
                    <div className='item-image'>
                        <img src={prop.sprites.default} className='gallery-img'/>
                    </div>
                    <div className='item-price-container'>
                        <img src="../assets/pokeDollar.png" alt='poke dollars' className='poke-dollar-img'/>
                        <h3 className='item-cost-text'>{prop.cost}</h3>
                    </div>
                </div>
            </Link>
        )
    }
}

export default ItemCard

