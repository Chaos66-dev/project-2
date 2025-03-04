import { Link } from "react-router-dom";
import { separateHyphens } from '../utils.js'

function ItemCard ({prop}) {
    console.log("card" + prop)

    return (
        <div className='card-container'>
            <div>
                {separateHyphens(prop.name)}
            </div>

            <div>
                <Link to={`/details/${prop.id}`}><img src={prop.sprites.default} className='gallery-img'/></Link>
            </div>

            <div>
                ${prop.cost}
            </div>


        </div>
    )
}

export default ItemCard

