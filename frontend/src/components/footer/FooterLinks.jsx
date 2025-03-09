import { Link } from 'react-router-dom'
import React from 'react'

const FooterLinks = () => {
  return (
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
  )
}

export default FooterLinks