import "./Chat.css";

import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";

import { authContext } from "../../contexts/authContext";
import { db } from "../../firebase";

export default function Chat() {
  const { user } = useContext(authContext);
  const [messages, setMessages] = useState(null);
  const [chatMsg, setChatMsg] = useState("");

  const handleMsg = (e) => {
    setChatMsg(e.target.value);
  };

  const msgDate = (time) => {
    return new Date(time * 1000).toLocaleString();
  };

  const handleSendMsg = async () => {
    const newChatMsg = {
      text: chatMsg,
      author: user.email,
      date: new Date(),
    };
    try {
      const docRef = await addDoc(collection(db, "chat"), newChatMsg);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getMessages = async () => {
    try {
      const q = query(collection(db, "chat"));
      onSnapshot(q, (querySnapshot) => {
        const msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data());
          console.log("msgs", msgs);
          setMessages(msgs);
        });
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="chat-container">
      <h2>Welcome to our Chat</h2>
      {messages &&
        messages.map((message, i) => {
          return (
            <div key={i} className="msg-container">
              <div className="msg-container-header">
                <p>{message.author}</p>
                <p>{msgDate(message.date.seconds)}</p>
              </div>
              <div className="msg-container-body ">
                <p>{message.text}</p>
              </div>
            </div>
          );
        })}

      <div>
        <div className="msg-input">
          <TextField
            size="small"
            placeholder="Message"
            type="text"
            name="chat"
            id="chat"
            value={chatMsg}
            onChange={handleMsg}
            fullWidth
            sx={{ backgroundColor: "white" }}
          />

          <Button variant="contained" onClick={handleSendMsg}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
