import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser.js'
export const serverUrl="http://localhost:8000"
function App(){
  getCurrentUser()
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </>
  )
}
export default App