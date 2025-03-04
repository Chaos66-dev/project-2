import { useContext } from 'react'
import ItemsContext from '../Context/ItemsContext'

function Search() {
    const {itemDetails} = useContext(ItemsContext)

    return (
        <div>
            hello i am the search component
        </div>
    )
}

export default Search