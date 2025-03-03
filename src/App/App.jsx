import { useState, useEffect } from 'react'
import './App.css'
import ItemsContext from '../Context/ItemsContext'
import Home from '../Home/Home'

function App() {
  const [items, setItems] = useState([])
  const [itemDetails, setItemDetails] = useState([])
  const value = {itemDetails, setItemDetails}



  useEffect( () =>{
    fetch('https://pokeapi.co/api/v2/item?limit=9&offset=0')
    .then(res => res.json())
    .then(data => setItems(data.results))
  }, [])

  useEffect( () =>{
    let tempItemArray = []
    items.map((details) =>{
      // console.log(details)
      fetch(details.url)
      .then(res => res.json())
      .then(data => tempItemArray.push(data))
    })
    
    setItemDetails(tempItemArray)

  }, [items])

  

  return (
    <>

    <ItemsContext.Provider value={value}>
      {console.log(value)}
      <Home/>
    </ItemsContext.Provider>
    
    </>
  )
}

export default App
