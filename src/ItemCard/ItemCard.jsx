import { Link } from "react-router-dom";

function ItemCard ({prop}) {
    console.log("card" + prop)

    return (
        <div className='card-container'>
            <div>
                {prop.name}
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

