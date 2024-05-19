import React, { useState } from "react";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Dashboard from "./components/shared/dashboard";
import backgroundImage from "/oilbg6.jpg"; // Adjust the path to your image

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Optional: Ensures background stays fixed while content scrolls
        backgroundAttachment: "fixed",
      }}
    >
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        showLogin ? <Login toggleForm={toggleForm} handleLogin={handleLogin} /> : <Register toggleForm={toggleForm} handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
