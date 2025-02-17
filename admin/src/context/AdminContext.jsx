import { createContext, useState } from "react";
import Cookies from "js-cookie";
export const AdminContext = createContext()

export const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(Cookies.get("aToken") || "")
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