import React, { useState } from "react";
import "./App.css";
import Hero from "./Components/Hero";
import Chatbot from "./Components/Chatbot";
import Navbar from "./Components/Navbar";
import { Link, Outlet } from "react-router-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar />
      <Outlet />
      <Chatbot />
    </>
  );
}

export default App;
