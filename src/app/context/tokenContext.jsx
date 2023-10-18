"use client"
import { useEffect } from "react";
import { createContext, useState } from "react";


export let tokenContext = createContext()

function TokenContextProvider({ children }) {
    const [token, setToken] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("token"))
            setToken(localStorage.getItem("token"));
        else setToken(null);
    }, []);

    return <tokenContext.Provider value={{ token, setToken }}>{children}</tokenContext.Provider>
}

export default TokenContextProvider;

// export const  useTokenContextProvider =()=>useContext(tokenContext)

