import React, { useState, useRef, useEffect } from "react";
import flogo from "../assets/flogo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { IoPersonCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";
import { useUserStore } from "../store/user-store";

function Nav() {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const { logout } = useUserStore();

  // refs to detect outside clicks
  const dropdownRef = useRef(null);      // dropdown menu element
  const avatarBtnRef = useRef(null);     // avatar button/icon element

  // close dropdown helper
  const closeDropdown = () => setShow(false);

  // click / touch outside & Escape handler
  useEffect(() => {
    const handleOutside = (e) => {
      // if dropdown closed, nothing to do
      if (!show) return;

      // If click is inside dropdown or the avatar button, do nothing
      if (
        dropdownRef.current?.contains(e.target) ||
        avatarBtnRef.current?.contains(e.target)
      ) {
        return;
      }

      // otherwise close
      setShow(false);
    };

    const handleEsc = (e) => {
      if (e.key === "Escape" && show) setShow(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [show]);

  const handleLogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      logout();
      toast.success("Logout Successfully");
      console.log(result.data);
      // also close dropdown on logout
      closeDropdown();
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || error.message || "Logout failed";
      toast.error(msg);
    }
  };

  const avatarInitial = (userData?.name || "").slice(0, 1).toUpperCase();

  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img src={flogo} alt="" className="w-[60px] rounded-[5px] border-2 border-white" />
        </div>

        {/* center buttons (desktop) */}
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {userData?.role === "Owner" && (
             <>
             <div onClick={() => navigate("/hotels")} className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">Hotels</div>
             <div onClick={() => navigate("/allexpenses")} className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">All Expenses</div>
             </>
            
          )}
          {userData?.role === "Recep" && (
            <div onClick={() => navigate("/expenses")} className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">Expenses</div>
          )}
        </div>

        {/* avatar + login/logout (desktop) */}
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {/* Avatar or login icon - avatarBtnRef is used to detect clicks on the button */}
          {!userData ? (
            <button ref={avatarBtnRef} onClick={() => setShow((p) => !p)} className="w-[50px] h-[50px] rounded-full flex items-center justify-center border-2 bg-white border-white cursor-pointer" aria-label="open-login">
              <IoPersonCircle className="w-[34px] h-[34px] fill-black" />
            </button>
          ) : userData.photoUrl ? (
            <img ref={avatarBtnRef} src={userData.photoUrl} alt="avatar" onClick={() => setShow((p) => !p)} className="w-[50px] h-[50px] rounded-full object-cover border-2 bg-black border-white cursor-pointer" />
          ) : (
            <div ref={avatarBtnRef} onClick={() => setShow((p) => !p)} className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">
              {avatarInitial}
            </div>
          )}

          {!userData ? (
            <span onClick={() => navigate("/login")} className="px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light bg-[#000000d5] cursor-pointer">Login</span>
          ) : (
            <span onClick={handleLogOut} className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer">LogOut</span>
          )}

          {/* dropdown menu - attach ref to it */}
          {show && (
            <div ref={dropdownRef} className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white ps-[15px] py-[10px] border-[2px] border-black cursor-pointer">
              <button onClick={() => { setShow(false); navigate("/profile"); }} className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">My Profile</button>
              <button onClick={() => setShow(false)} className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">My Courses</button>
            </div>
          )}
        </div>

        <RxHamburgerMenu className="w-[35px] h-[35px] lg:hidden text-white cursor-pointer" onClick={() => setShowHam((p) => !p)} />

        {/* mobile menu */}
        <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-[0] transition duration-600" : "translate-x-[-100%] transition duration-600"}`}>
          <GiSplitCross className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%]" onClick={() => setShowHam((p) => !p)} />

          {!userData ? <IoPersonCircle className="w-[50px] h-[50px] fill-black cursor-pointer" /> : userData.photoUrl ? <img src={userData.photoUrl} className="w-[50px] h-[50px] rounded-full object-cover border-2 bg-black border-white cursor-pointer" /> : <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">{avatarInitial}</div>}

          <div onClick={()=>navigate("/profile")} className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer"> My Profile</div>
          <div className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer"> My Courses</div>
          {userData?.role === "Owner" && <div className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer" onClick={()=>navigate("/dashboard")}> Owner</div>}
          {!userData ? <span onClick={()=>navigate("/login")} className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">Login</span> : <span onClick={handleLogOut} className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">LogOut</span>}
        </div>
      </div>
    </div>
  );
}

export default Nav;
