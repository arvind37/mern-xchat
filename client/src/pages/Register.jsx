import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.username || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email format");
      return;
    }

    try {
      await api.post("/api/users/register", form);
      navigate("/login");
    } catch (err) {
  setError("Email is already registered");
}
  };

  return (
    <div id="register-page">
      <form onSubmit={submit}>
        <input
          id="fullname-input"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          id="username-input"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

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

        <button id="register-button">Create Account</button>

        {error && <p id="register-error">{error}</p>}
      </form>
    </div>
  );
}
