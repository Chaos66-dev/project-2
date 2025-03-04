import { useContext } from 'react'
import ItemsContext from '../Context/ItemsContext'
import './Search.css'

function Search() {
    const {itemDetails} = useContext(ItemsContext)

    return (
        <div className='search-wrapper'>
            <img src='' alt='logo icon' className='logo-icon' />
            <p>
                hello i am the search component
            </p>
        </div>
    )
}

export default Search