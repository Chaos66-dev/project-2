import { Link } from "react-router-dom";
import { separateHyphens } from '../utils.js'

function ItemCard ({prop}) {
    if(prop.cost > 0){
        return (
            <Link to={`/details/${prop.id}`}>
                <div className='card-container'>
                    <div>
                    {separateHyphens(prop.name)}
                    </div>
                    <div>
                        <img src={prop.sprites.default} className='gallery-img'/>
                    </div>
                    <div>
                        ${prop.cost}
                    </div>
                </div>
            </Link>
        )
    }
}

export default ItemCard

