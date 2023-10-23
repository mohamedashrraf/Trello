"use client"
import { useEffect, createContext, useState } from "react";



export let tokenContext = createContext()

function TokenContextProvider({ children }) {
    const [token, setToken] = useState(null);
    useEffect(() => {
        if(typeof window !== "undefined"){

            if (localStorage?.getItem("token"))
                setToken(localStorage?.getItem("token"));
            else setToken(null);
        }
    }, []);

    return <tokenContext.Provider value={{ token, setToken }}>{children}</tokenContext.Provider>
}

export default TokenContextProvider;


