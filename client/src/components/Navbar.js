import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 w-full ">
      <div className="container mx-auto  flex gap-2 justify-between">
        <Link to="/" className="text-white px-4">
          Home
        </Link>
        <Link to="/login" className="text-white px-4">
          Login
        </Link>
        <Link to="/signup" className="text-white px-4">
          Signup
        </Link>
        <Link to="/dashboard" className="text-white px-4">
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            border: "none",
            borderRadius: "5px",
            background: "red",
            color: "white",
            cursor: "pointer",
          }}
          className="text-white px-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
