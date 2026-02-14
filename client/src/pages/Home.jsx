import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
  const [activeRoom, setActiveRoom] = useState(null);

  return (
    <div id="chat-layout" style={{ display: "flex" }}>
      <Sidebar onSelectRoom={setActiveRoom} />
      <ChatWindow room={activeRoom} />
    </div>
  );
}

