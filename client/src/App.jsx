import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import Login from "./pages/Login.jsx";
import { assets } from "./assets/assets";
import "./assets/prism.css";
import { useAppContext } from "./context/AppContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  // const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const { user } = useAppContext();

  return (
    <>
      {/* {isMenuOpen && <img} */}
      {user ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to [#000000] dark:text-white">
          <div className="flex h-screen w-screen">
            <SideBar />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ChatBox />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      ) : (
        <div
          className="bg-gradient-to-b from-[#242124] to-[#000000] flex 
        items-center justify-center h-screen w-screen"
        >
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
