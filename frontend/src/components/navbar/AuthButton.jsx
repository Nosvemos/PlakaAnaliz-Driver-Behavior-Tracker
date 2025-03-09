import React from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";

const AuthButton = ({ user, isAuthenticated, logout }) => {
  return user && isAuthenticated ? (
    <button className="flex items-center gap-1 hover:opacity-80 transition-all" onClick={logout}>
      <LogOut className="w-4 h-4 text-primary" />
      <span className="hidden text-sm sm:inline">Logout</span>
    </button>
  ) : (
    <Link to={"/login"} className={`flex items-center gap-1 hover:opacity-80 transition-all`}>
      <LogIn className="w-4 h-4 text-primary" />
      <span className="hidden text-sm sm:inline">Log in</span>
    </Link>
  );
};

export default AuthButton;
