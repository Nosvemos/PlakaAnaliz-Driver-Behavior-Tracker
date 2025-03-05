import React from 'react'
import { Car, Search, Palette, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag"

const authUser = 'samet';

const Navbar = () => {
  return (
    <header className="bg-base-100/80 border-b border-base-300 fixed w-full max-w-6xl left-1/2 -translate-x-1/2 top-5 z-40 p
  backdrop-blur-lg rounded-xl shadow-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="rounded-lg flex items-center justify-center">
                <Car className="size-7 text-primary stroke-1" />
              </div>
              <h1 className="text-lg font-semibold">PlakaTR</h1>
              <div className="flex items-center justify-center">
                <ReactCountryFlag countryCode="TR" svg className='text-2xl rounded-lg'/>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-all">
              <div className="rounded-lg flex items-center justify-center">
                <Search className="size-4 text-primary" />
              </div>
              <h1 className="text-sm">Find Plate</h1>
            </Link>

            <Link to={"/theme"} className={`flex items-center gap-1 hover:opacity-80 transition-all`}>
              <Palette className="w-4 h-4 text-primary" />
              <span className="hidden text-sm sm:inline">Theme</span>
            </Link>

            <div className="flex items-center gap-1 hover:opacity-80 transition-all">
              <div className="rounded-lg flex items-center justify-center">
                <GitBranch className="size-4 text-primary" />
              </div>
              <h1 className="text-sm">v1.0.0 (Beta)</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar