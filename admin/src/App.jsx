import React from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div>
      <Login/>
      <ToastContainer />
    </div>
  )
}

export default App