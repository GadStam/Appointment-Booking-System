import React from "react";
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSnackbar } from "notistack";

export const AdminContext = createContext();

export const AdminContextProvider = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [aToken, setAToken] = useState(Cookies.get("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: { aToken },
      });
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin//change-availability`,
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        console.log(data.message);
        enqueueSnackbar(data.message, { variant: "success" });
        getAllDoctors();
      } else {
        enqueueSnackbar(data.message, { variant: "error" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
