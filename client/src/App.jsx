import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import Login from "./pages/Login.jsx";
import { assets } from "./assets/assets";
import "./assets/prism.css";

const App = () => {

  // const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  return (
    <>
    {/* {isMenuOpen && <img} */}
      <div className="dark:bg-gradient-to-b from-[#242124] to [#000000] dark:text-white">
        <div className="flex h-screen w-screen">
          <SideBar />
          <Routes>
            <Route path='/' element={<ChatBox />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
