import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser.js'
import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
export const serverUrl="http://localhost:8000"
function App(){
  getCurrentUser()
  const {userData}=useSelector(state=>state.user)
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={!userData ? <SignUp/> : <Navigate to={"/"}/>}/>
        <Route path="/profile" element={userData ? <Profile/> : <Navigate to={"/login"}/>}/>
        <Route path="/forget" element={<ForgetPassword/> }/>
      </Routes>
    </>
  )
}
export default App