import { useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
  const res = await api.post("/api/users/login", form);
  setUser(res.data.data.user);
  navigate("/");
} catch (err) {
  if (err.response?.status === 404) {
    setError("User does not exist with this email");
  } else if (err.response?.status === 401) {
    setError("Invalid password");
  }
}


  };

  return (
    <div id="login-page">
      <form onSubmit={submit}>
        <input
          id="email-input"
          placeholder="Email address"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          id="password-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button id="login-button">Sign in</button>

        {error && <p id="login-error">{error}</p>}
      </form>
    </div>
  );
}
