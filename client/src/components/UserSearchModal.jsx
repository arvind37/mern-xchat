import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserSearchModal({ onClose, onSelectRoom }) {
  const [term, setTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!term) return;

    const search = async () => {
      const res = await api.get(
        `/api/users/search?searchTerm=${term}`
      );
      setUsers(res.data.data);
    };

    search();
  }, [term]);

  const startChat = async (userId) => {
    const res = await api.post("/api/rooms/init", {
      otheruser: userId,
    });

    onSelectRoom(res.data.data);
    onClose();
  };

  return (
    <div id="user-search-modal">

       <button id="close-search" onClick={onClose}>
        Close
      </button>


      <input
  id="search-input"
  placeholder="Search users"
  value={term}
  onChange={(e) => setTerm(e.target.value)}
/>

{users.map((user) => (
  <div
    key={user._id}
    id={`user-result-${user._id}`}
    onClick={() => startChat(user._id)}
  >
    {user.username}
  </div>
))}
    </div>
  );
}
