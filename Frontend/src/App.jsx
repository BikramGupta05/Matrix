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
import CreateRecep from "./pages/Owner/CreateRecep.jsx";
import CreateExpense from "./pages/Recep/CreateExpense.jsx";
import AllExpense from "./pages/Owner/AllExpense.jsx";
import HotelExpense from "./pages/Owner/HotelExpense.jsx";
import AllRooms from "./pages/Owner/AllRooms.jsx";
import Rooms from "./pages/Recep/Rooms.jsx";
import AllBookings from "./pages/Recep/AllBookings.jsx";
import { useUserStore } from "./store/user-store.js";
import { useEffect } from "react";
import { useState } from "react";
import { HotelBill } from "./pages/Recep/HotelBill.jsx";
export const serverUrl="http://localhost:8000"
function App(){
  getCurrentUser()
  getAdminHotel()
  const {userData}=useSelector(state=>state.user)
  const {user, logout, isLoggedIn, expiry} = useUserStore()

  // return true when token not expired and user is loggedin
  // return false in case of not authenticated use
  const checkAuthFromStore = () => {
    if(!isLoggedIn || expiry < Date.now()){
      logout()
      return false
    }
    return true
  }

  useEffect(()=> {
    if(checkAuthFromStore()){
      setIsAuth(true)
      // console.log("loggen in user")
    }else {
      setIsAuth(false)
    }
  },[])

  const [isAuth, setIsAuth] = useState(false)
  
  return (
    <>
    <ToastContainer />
    <Nav/>
    <div className="pt-[71px]">
      <Routes >
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={isAuth ? <SignUp/> : <Navigate to={"/"}/>}/>
        <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to={"/login"}/>}/>
        <Route path="/forget" element={<ForgetPassword/> }/>
        <Route path="/editprofile" element={isAuth ? <EditProfile/> : <Navigate to={"/login"}/>}/>
        <Route path="/hotels" element={(isAuth && user?.role==="Owner") ? <Hotels/> : <Navigate to={"/login"}/>}/>
        <Route path="/expenses" element={isAuth ? <Expenses/> : <Navigate to={"/login"}/>}/>
        <Route path="/addnewhotel" element={(isAuth && user?.role==="Owner") ? <CreateHotel/> : <Navigate to={"/login"}/>}/>
        <Route path="/edithotel/:hotelId" element={(isAuth && user?.role==="Owner") ? <EditHotel/> : <Navigate to={"/login"}/>}/>
        <Route path="/receppage/:hotelId" element={(isAuth && user?.role==="Owner") ? <RecepPage/> : <Navigate to={"/login"}/>}/>
        {/* <Route path="/createrecep/:hotelId" element={userData?.role==="Owner" ? <CreateRecep/> : <Navigate to={"/login"}/>}/> */}
        <Route path="/createrecep/:hotelId" element={(isAuth && user?.role==="Owner") ? <CreateRecep/> : <Navigate to={"/login"}/>}/>
        <Route path="/addnewexpense" element={(isAuth && user?.role==="Recep") ? <CreateExpense/> : <Navigate to={"/login"}/>}/>
        <Route path="/expenses/:recepId" element={(isAuth && user?.role==="Owner") ? <Expenses/> : <Navigate to={"/login"}/>}/>
        <Route path="/allexpenses" element={(isAuth && user?.role==="Owner")? <AllExpense/> : <Navigate to={"/login"}/>}/>
        <Route path="/hotel-expense/:hotelId"element={(isAuth && user?.role==="Owner")? <HotelExpense/> : <Navigate to="/login" />}/>
        <Route path="/allrooms" element={isAuth ? <Rooms/> : <Navigate to={"/login"}/>}/>
        <Route path="/allbookings" element={isAuth ? <AllBookings/> : <Navigate to={"/login"}/>}/>
        <Route path="/hotelbill" element={isAuth ? <HotelBill/> : <Navigate to={"/login"}/>}/>
        
      </Routes>

    </div>
    </>
  )
}
export default App