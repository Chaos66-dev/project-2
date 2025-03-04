
import { useState, useEffect } from 'react'
import './App.css'
import ItemsContext from '../Context/ItemsContext'
import Home from '../Home/Home'
import ItemDetails from '../ItemDetails/ItemDetails'
import {Routes, Route} from 'react-router-dom'

function App() {
  const [items, setItems] = useState([])
  const [itemDetails, setItemDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const value = {itemDetails, setItemDetails}



  useEffect(() => {
    const fetchData = async () => {
      const res1 = await fetch("https://pokeapi.co/api/v2/item?limit=20&offset=0");
      const data1 = await res1.json();

      // Second API Call: Use data from the first call
      const extraDataPromises = data1.results.map(async (item) => {
        const res = await fetch(item.url);
        const data2 = await res.json();
        return data2; // Return the detailed data for this Pokémon
      });

      const allItemDetails = await Promise.all(extraDataPromises);

      // Set the results from both API calls
      setItems(data1.results);
      setItemDetails(allItemDetails);
      setLoading(false); // Data has finished loading
    }

    fetchData()
  }, [])



  return (
    <>

    <ItemsContext.Provider value={value}>
      {loading ? (
        <div>loading</div>

      ) : (
        <Routes>

          <Route path='/' element= {<Home/>}/>
          <Route path='/cart' element= {<Home/>}/>
          <Route path='/details/:id' element= {<ItemDetails />}/>


        </Routes>
      )}
    </ItemsContext.Provider>

    </>
  )
}

export default App
