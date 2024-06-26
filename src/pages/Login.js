import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log("Login successful. Token received:", token);
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" className="loginButton">
          Login
        </button>
        <Link to="/">Forgot password? Recover it here</Link>
        <button type="button" className="registerButton" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}
