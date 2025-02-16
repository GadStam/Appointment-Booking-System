import { createContext, useState } from "react";

export const AdminContext = createContext()

export const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState('')
    const backendUrl = import.meta.env.VITE_BACKENDURL
    const value = {
        aToken,
        setAToken, backendUrl
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )


}

export default AdminContextProvider