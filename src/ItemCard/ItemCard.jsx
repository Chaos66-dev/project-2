import { Link } from "react-router-dom";
import { separateHyphens } from '../utils.js'
import "./ItemCard.css"
import clickAudio from '../Sounds/click.mp3'

function ItemCard ({prop}) {
    const audio = new Audio(clickAudio)

    if(prop.cost > 0 && prop.sprites.default !== null){
        return (
            <Link to={`/details/${prop.id}`}>
                <div className='card-container' onClick={()=>audio.play()}>
                    <div className='item-title'>
                    {separateHyphens(prop.name)}
                    </div>
                    <div className='item-image'>
                        <img src={prop.sprites.default} className='gallery-img'/>
                    </div>
                    <div className='item-price-container'>
                        <h3 className='item-cost-text'><span className="black">$</span>{prop.cost.toLocaleString()}</h3>
                    </div>
                </div>
            </Link>
        )
    }
}

export default ItemCard

