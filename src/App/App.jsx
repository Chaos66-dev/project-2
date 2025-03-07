import { useState, useEffect, useContext, useRef} from 'react'
import './App.css'
import ItemsContext from '../Context/ItemsContext'
import CartContext from "../Cart/CartContext";
import Home from '../Home/Home'
import Cart from '../Cart/Cart'
import ItemDetails from '../ItemDetails/ItemDetails'
import {Routes, Route, useNavigate} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MusicNote from "@mui/icons-material/MusicNote";
import { IconButton, TextField, Badge} from "@mui/material";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import pokeBGM from '../Sounds/pokeBGM.mp3'
import clickAudio from '../Sounds/click.mp3'
import homeSound from '../Sounds/home.mp3'
import { togglePlay, extractFields } from '../utils.js'


function App() {
  const { cart } = useContext(CartContext);
  const [itemDetails, setItemDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const value = {itemDetails, setItemDetails}
  let navigate = useNavigate();
  const [inputText, setInputText] = useState("")
  const homeClick = new Audio(homeSound)
  const click = new Audio(clickAudio)
  const bgm = new Audio(pokeBGM)
  bgm.loop = true;
  const bgmRef = useRef(bgm)
  const keys_to_extract  = ['id', 'name', 'cost', 'flavor_text_entries', 'sprites']

  const [playing, setPlaying] = useState(false);

  let inputHandler = (input) => {
    //convert input text to lower case
    var lowerCase = input.target.value.toLowerCase();
    var query = lowerCase.replace(" ", "-")
    setInputText(query);
    navigate('/')
  };

  // Create theme for Pokemon Font
  const pokemonFont = createTheme({
    typography: {
        "fontFamily": `PokemonClassic`
      },
  })

  useEffect(() => {
    const fetchData = async () => {
      // change limit when not testing
      const res1 = await fetch("https://pokeapi.co/api/v2/item?limit=50&offset=0");
      const data1 = await res1.json();

      // Second API Call: Use data from the first call
      const extraDataPromises = data1.results.map(async (item) => {
        const res = await fetch(item.url);
        const data2 = await res.json();
        const extractedData = extractFields(data2, keys_to_extract);
        return extractedData; // Return the detailed data for this Pokémon
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
    <ThemeProvider theme={pokemonFont}>

      <div className='header'>
      <h1 className="header-text">PokéMart™ Online!</h1>
        <div className='home-search'>
          <IconButton id='home-button'  aria-label="home" onClick={()=>{
            navigate('/');
            setInputText('');
            homeClick.play()
            }}>
            <HomeIcon color="primary"/>
          </IconButton>

          <IconButton id='bgm-button'  aria-label="bgm" onClick={()=>togglePlay(bgmRef, setPlaying, playing)}>
            <MusicNote color="primary"/>
          </IconButton>

          <TextField
            id="search"
            onChange={inputHandler}
            value={inputText}
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
          <IconButton id='cart-button' aria-label="cart" onClick={() => {navigate('/cart'); click.play()}}>
            <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon color="primary" />
            </Badge>
          </IconButton>
        </div>
        {"\n"}


        {window.scrollTo(0, 0)}
      </div>


      <ItemsContext.Provider value={value}>
        {loading ? (
          <div>loading</div>

        ) : (
            <Routes>

              <Route path='/' element= {<Home inputText={inputText}/>}/>
              <Route path='/cart' element= {<Cart/>}/>
              <Route path='/details/:id' element= {<ItemDetails />}/>

            </Routes>
          )
        }
      </ItemsContext.Provider>
    </ThemeProvider>
    </>
  )
}

export default App
