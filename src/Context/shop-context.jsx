import React from "react";
import ItemsContext from '../Context/ItemsContext'


export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {}
  //for (let i=1; i < P)
}

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState
  return <ShopContext.Provider>{props.children}</ShopContext.Provider>
}