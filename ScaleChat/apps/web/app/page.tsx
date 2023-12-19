'use client'
import React, { useState } from 'react';
import classes from "./page.module.css";
import { useSocket } from '../context/SocketProvider';


const App = () => {
  const {sendMessage, messages} = useSocket();
  const [message, setMessages] = useState('');

  

  return (
    <div>
      <div className={classes["history"]}>
        {messages.map((e)=>(
          <li>{e}</li>
        ))}
      </div>
      <div className={classes["chat-container"]}>
        <input
          className={classes["chat-input"]}
          placeholder="Type message"        
          onChange={e => setMessages(e.target.value)}
        />
        <button className={classes["button"]} onClick={e => sendMessage(message)}>
          Send
        </button>
      </div> 
  </div> 
    
  );
};

export default App;
