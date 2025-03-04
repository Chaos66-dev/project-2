import { useContext } from "react";
import ItemsContext from '../Context/ItemsContext'
import ItemCard from '../ItemCard/ItemCard'

export default function Home(){
    const {itemDetails, setItemDetails} = useContext(ItemsContext)
    console.log("home" + itemDetails)
    console.log(ItemsContext);

    return(
        <div className='itemCard-wrapper'>
            {itemDetails?.map((item) => <ItemCard key={item.id} prop={item}></ItemCard>)}
        </div>
        )
    }