
import { useState, useEffect } from 'react'
import './App.css'
import ItemsContext from '../Context/ItemsContext'
import Home from '../Home/Home'
import ItemDetails from '../ItemDetails/ItemDetails'
import {Routes, Route, useNavigate} from 'react-router-dom'
// import { useNavigate } from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import { Button, IconButton, TextField} from "@mui/material";

function App() {
  const [itemDetails, setItemDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const value = {itemDetails, setItemDetails}
  let navigate = useNavigate();
  const [inputText, setInputText] = useState("")

  let inputHandler = (input) => {
    //convert input text to lower case
    var lowerCase = input.target.value.toLowerCase();
    var query = lowerCase.replace(" ", "-")
    setInputText(query);
  };


  useEffect(() => {
    const fetchData = async () => {
      const res1 = await fetch("https://pokeapi.co/api/v2/item?limit=100&offset=0");
      const data1 = await res1.json();

      // Second API Call: Use data from the first call
      const extraDataPromises = data1.results.map(async (item) => {
        const res = await fetch(item.url);
        const data2 = await res.json();
        return data2; // Return the detailed data for this Pokémon
      });

      const allItemDetails = await Promise.all(extraDataPromises);

      // Set the results from both API calls
      setItemDetails(allItemDetails);
      setLoading(false); // Data has finished loading
    }

    fetchData()
  }, [])



  return (
    <>
    <div className='header'>
      <div className='home-search'>
        <IconButton id='home-button'  aria-label="home" onClick={()=>navigate('/')}>
          <HomeIcon color="primary"/>
        </IconButton>

        <TextField
          id="search"
          onChange={inputHandler}
          variant="outlined"
          placeholder="Search..."
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
            }
          }}

        />
      </div>

      <h1 className='name'>PokeCommerce</h1>
    </div>

    <ItemsContext.Provider value={value}>
      {loading ? (
        <div>loading</div>

      ) : (
          <Routes>

            <Route path='/' element= {<Home inputText={inputText}/>}/>
            <Route path='/cart' element= {<Home/>}/>
            <Route path='/details/:id' element= {<ItemDetails />}/>


          </Routes>
        )
      }
    </ItemsContext.Provider>

    </>
  )
}

export default App
