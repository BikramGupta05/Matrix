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
import EditProfile from "./pages/EditProfile.jsx";
import Hotels from "./pages/Owner/Hotels.jsx";
import Expenses from "./pages/Recep/Expenses.jsx";
import Nav from "./components/Nav.jsx";
import CreateHotel from "./pages/Owner/CreateHotel.jsx";
import getAdminHotel from "./customHooks/getAdminHotel.js";
import EditHotel from "./pages/Owner/EditHotel.jsx";
import RecepPage from "./pages/Owner/RecepPage.jsx";
export const serverUrl="http://localhost:8000"
function App(){
  getCurrentUser()
  getAdminHotel()
  const {userData}=useSelector(state=>state.user)
  return (
    <>
    <ToastContainer />
    <Nav/>
    <div className="pt-[71px]">
      <Routes >
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={!userData ? <SignUp/> : <Navigate to={"/"}/>}/>
        <Route path="/profile" element={userData ? <Profile/> : <Navigate to={"/login"}/>}/>
        <Route path="/forget" element={<ForgetPassword/> }/>
        <Route path="/editprofile" element={userData ? <EditProfile/> : <Navigate to={"/login"}/>}/>
        <Route path="/hotels" element={userData?.role==="Owner" ? <Hotels/> : <Navigate to={"/login"}/>}/>
        <Route path="/expenses" element={userData ? <Expenses/> : <Navigate to={"/login"}/>}/>
        <Route path="/addnewhotel" element={userData?.role==="Owner" ? <CreateHotel/> : <Navigate to={"/login"}/>}/>
        <Route path="/edithotel/:hotelId" element={userData?.role==="Owner" ? <EditHotel/> : <Navigate to={"/login"}/>}/>
        <Route path="/receppage/:hotelId" element={userData?.role==="Owner" ? <RecepPage/> : <Navigate to={"/login"}/>}/>
      </Routes>

    </div>
    </>
  )
}
export default App