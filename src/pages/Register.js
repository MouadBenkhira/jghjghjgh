import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/register.css";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/register", { // Change port to 8080
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: firstname, 
          prenom: lastname,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Registration successful");
        // You can redirect to another page or perform other actions here
      } else {
        const data = await response.json();
        console.error(`Registration failed: ${data}`);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm">
        <label>First name</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label>last name</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setLastname(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="registerButton"
          type="button"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
      <Link to="/">Already have an account? Login here</Link>
    </div>
  );
}
