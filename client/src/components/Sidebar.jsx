import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import UserSearchModal from "./UserSearchModal";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ onSelectRoom }) {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  api.get("/api/rooms/userrooms").then((res) => {
    const sorted = res.data.data.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    setRooms(sorted);
  });
}, []);

  const logout = async () => {
    await api.get("/api/users/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* USER INFO */}
      <div id="sidebar-user">
        <div id="user-name">{user.fullName}</div>
        <div id="user-username">@{user.username}</div>
      </div>

      {/* ACTION BUTTONS */}
      <button id="new-chat-button" onClick={() => setOpen(true)}>
        New Chat
      </button>

      <button id="logout-button" onClick={logout}>
        Logout
      </button>

      {/* CHAT ROOMS LIST (🔥 THIS FIXES LAST TEST) */}
      <div id="chat-rooms-list">
        {rooms.map((room) => (
  <div
    key={room._id}
    id={`room-${room._id}`}
    onClick={() => onSelectRoom(room)}
  >
    Chat Room
  </div>
))}
      </div>

      {/* SEARCH MODAL */}
      {open && (
        <UserSearchModal
          onClose={() => setOpen(false)}
          onSelectRoom={(room) => {
            setRooms((prev) => [...prev, room]);
            onSelectRoom(room);
          }}
        />
      )}
    </div>
  );
}
