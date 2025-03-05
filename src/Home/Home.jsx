import { useContext } from "react";
import ItemsContext from '../Context/ItemsContext'
import ItemCard from '../ItemCard/ItemCard'

export default function Home({ inputText }){
    const {itemDetails, } = useContext(ItemsContext)

    return(
        <div className='itemCard-wrapper'>
            {itemDetails?.filter((item) => item.name.toLowerCase().includes(inputText))
                .map((item) => <ItemCard key={item.id} prop={item}></ItemCard>)}
        </div>
        )
    }