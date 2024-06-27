import React, { createContext, useContext, useState } from "react"

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        phone: "https://placehold.co/150x150",
        isLoggedIn: Boolean(localStorage.getItem("token")),
    })
    if (localStorage.getItem("lang") === null) {
        localStorage.setItem("lang", "en")
    }
    const [language, setLanguage] = useState(localStorage.getItem("lang") || "en")

    return <StoreContext.Provider value={{ state, setState }}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
