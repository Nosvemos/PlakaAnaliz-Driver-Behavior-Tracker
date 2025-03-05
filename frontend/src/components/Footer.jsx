import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="max-w-6xl left-1/2 -translate-x-1/2 relative py-5">
        <div className="rounded-xl bg-base-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="space-y-2">
                <span className="font-semibold text-xs">PlakaTR</span>
                <p className="text-xs">© 2025 - All rights reserved.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8 text-xs">
              <Link to="/" className="hover:opacity-80 transition-all">
                <span className="text-sm sm:inline">Terms of Use</span>
              </Link>

              <Link to="/" className="hover:opacity-80 transition-all">
                <span className="text-sm sm:inline">Privacy Policy</span>
              </Link>

              <Link to="/" className="hover:opacity-80 transition-all">
                <span className="text-sm sm:inline">Cookie Policy</span>
              </Link>

              <Link to="/" className="hover:opacity-80 transition-all">
                <span className="text-sm sm:inline">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;