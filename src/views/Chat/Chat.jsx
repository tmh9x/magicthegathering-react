import "./Chat.css";

import { Button, IconButton, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

  const handleSendMsg = async (id) => {
    const newChatMsg = {
      author: user.email,
      date: new Date(),
      text: chatMsg,
    };
    try {
      const docRef = await addDoc(collection(db, "chat"), newChatMsg);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEditMsg = async (id) => {
    console.log("id", id);

    const text = prompt("Enter new text");

    const docRef = doc(db, "chat", id);
    const payload = { text };
    updateDoc(docRef, payload);
  };

  const handleDeleteMsg = async (id) => {
    const docRef = await deleteDoc(doc(db, "chat", id));
    console.log("docRef", docRef.id);
  };

  const getMessages = async () => {
    try {
      const q = query(collection(db, "chat"), orderBy("date", "asc"));
      onSnapshot(q, (querySnapshot) => {
        const msgs = [];
        querySnapshot.forEach((doc) => {
          const myMessage = {
            id: doc.id,
            data: doc.data(),
          };
          msgs.push(myMessage);
          console.log("msgs", msgs);
        });
        setMessages(msgs);
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  console.log("messages", messages);

  return (
    <div className="chat-container">
      <h2>Welcome to our Chat</h2>
      {messages &&
        messages.map((message, i) => (
          <div key={i} className="msg-container">
            <div className="msg-container-header">
              <p>{message.data.author}</p>
              <p>{msgDate(message.data.date.seconds)}</p>
            </div>
            <div className="msg-container-body ">
              <p>{message.data.text}</p>
              <div className="button-container">
                <IconButton
                  variant="contained"
                  color="success"
                  onClick={() => handleEditMsg(message.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteMsg(message.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))}

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
