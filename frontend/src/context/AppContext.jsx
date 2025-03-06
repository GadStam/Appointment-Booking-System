import { createContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import axios from 'axios'

export const AppContext = createContext()

 const AppContextProvider = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])


    const value = {
        doctors, currencySymbol
    }

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/list`)
            if(data.success){
                setDoctors(data.doctors)
            }else{
                enqueueSnackbar(data.message, {variant: 'error'})
            }
            
        } catch (error) {
            console.log(error)
            enqueueSnackbar(error.message, {variant: 'error'})
        }
    }

    useEffect(() => {
        getDoctorsData()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider