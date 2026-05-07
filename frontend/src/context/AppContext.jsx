import { createContext, useState } from "react";


export const AppContext = createContext();

const AppContextProvider = ({children}) =>{

    const backendUrl = "http://localhost:5000/api/v1/user/register";

    const [token, setToken] = useState("");
    const [cartItems, setCartItems] = useState([]);

    const value ={
        backendUrl,

        token,
        setToken,
        cartItems,
        setCartItems
    };

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export  default AppContextProvider