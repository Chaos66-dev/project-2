function ItemCard ({prop}) {
    
    return (
        <div className='card-container'>
            <div>
                {prop.name}
            </div>

            <div>
                <img src={prop.sprites.default} className='gallery-img'/>
                {/* <img src={prop.sprites.default}/> */}
            </div>

            <div>
                ${prop.cost}
            </div>

            
        </div>
    )
}

export default ItemCard

