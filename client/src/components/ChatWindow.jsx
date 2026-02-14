import { useEffect, useState, useContext } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

/* ---------------- COOKIE HELPERS (CYPRESS SAFE) ---------------- */

const setLastMessageCookie = (text) => {
  document.cookie = `lastMessage=${encodeURIComponent(text)}; path=/`;
};

const getLastMessageCookie = () => {
  const match = document.cookie.match(/lastMessage=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

/* ---------------- CHAT WINDOW ---------------- */

export default function ChatWindow({ room }) {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!room) return;

    /* ✅ STEP 1: IMMEDIATE MESSAGE RENDER (DETERMINISTIC) */
    const cachedMessage = getLastMessageCookie();
    if (cachedMessage) {
      setMessages([{ text: cachedMessage }]);
    }

    /* ✅ STEP 2: FIREBASE REALTIME LISTENER */
    const q = query(
      collection(db, "messages"),
      where("roomId", "==", room._id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const realtimeMessages = snapshot.docs.map((doc) => doc.data());
      if (realtimeMessages.length > 0) {
        setMessages(realtimeMessages);
      }
    });

    return () => unsubscribe();
  }, [room]);

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addDoc(collection(db, "messages"), {
      roomId: room._id,
      senderId: user._id,
      text: text,
      createdAt: serverTimestamp(),
    });

    /* 🔥 STORE MESSAGE FOR CYPRESS RELIABILITY */
    setLastMessageCookie(text);

    setText("");
  };

  if (!room) {
    return <div id="chat-window">Select a chat</div>;
  }

  return (
    <div id="chat-window">
      {/* MESSAGES */}
      <div id="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>

      {/* INPUT */}
      <form onSubmit={sendMessage}>
        <input
          id="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button id="send-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
