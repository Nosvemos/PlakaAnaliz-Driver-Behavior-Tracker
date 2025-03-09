import React from "react";
import { Link } from "react-router-dom";
import { Search, Palette } from 'lucide-react'

const NavbarLinks = () => {
  return (
    <nav className="flex items-center gap-4">
      <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-all">
        <div className="rounded-lg flex items-center justify-center">
          <Search className="size-4 text-primary" />
        </div>
        <h1 className="hidden text-sm sm:inline">Find Plate</h1>
      </Link>

      <Link to={"/theme"} className={`flex items-center gap-1 hover:opacity-80 transition-all`}>
        <Palette className="w-4 h-4 text-primary" />
        <span className="hidden text-sm sm:inline">Theme</span>
      </Link>

    </nav>
  );
};

export default NavbarLinks;
