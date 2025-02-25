import React, { useState } from "react";
import Card from "./Card";
import Bot from "./Bot";
import "../Styles/Bot.css";

const Chatbot = (open) => {
  
  
  return (
    <>
     

        <Bot open={open.open} ></Bot>
     

      
    </>
  );
};

export default Chatbot;
