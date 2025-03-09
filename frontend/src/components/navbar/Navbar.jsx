import React from 'react'
import { useAuthStore } from "../../store/useAuthStore.js";
import NavbarLogo from './NavbarLogo.jsx'
import NavbarLinks from './NavbarLinks.jsx'
import AuthButton from './AuthButton.jsx'

const Navbar = () => {
  const { logout, user, isAuthenticated } = useAuthStore();
  return (
    <header className="border-b border-base-300 fixed w-full max-w-6xl left-1/2 -translate-x-1/2 top-5 z-40 p backdrop-blur-lg rounded-xl shadow-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <NavbarLogo />
          <div className="flex items-center gap-4">
            <NavbarLinks />
            <AuthButton user={user} isAuthenticated={isAuthenticated} logout={logout} />
            <div className="flex items-center gap-1 hover:opacity-80 transition-all">
              <h1 className="text-sm">v1.0.0 (Beta)</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;