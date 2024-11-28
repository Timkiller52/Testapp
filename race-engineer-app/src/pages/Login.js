import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Array of images for random background
const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image9.jpg",
  "/images/image10.jpg",
  "/images/image11.jpg",
  "/images/image12.jpg",
];

// Styled components
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${(props) => props.background}) center/cover no-repeat;
  transition: background 0.5s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); // Semi-transparent overlay
  z-index: 1;
`;

const LoginForm = styled.form`
  background: rgba(0, 0, 0, 0.7);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: white;
  width: 350px;
  position: relative; // Ensure it is above the overlay
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [background, setBackground] = useState("");

  useEffect(() => {
    // Select a random background image on load
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBackground(randomImage);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        alert(`Welcome, ${response.data.username}`);
        localStorage.setItem("token", response.data.token); // Save token
        window.location.href = "/dashboard"; // Redirect to the dashboard
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.error("Login error:", err);
    }
  };

  return (
    <LoginWrapper background={background}>
      <Overlay />
      <LoginForm onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginWrapper>
  );
}

export default Login;
