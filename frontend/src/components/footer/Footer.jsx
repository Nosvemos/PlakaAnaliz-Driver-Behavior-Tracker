import React from 'react';
import FooterLogo from './FooterLogo.jsx'
import FooterLinks from './FooterLinks.jsx'

const Footer = () => {
  return (
    <footer className="mt-auto px-6">
      <div className="max-w-6xl left-1/2 -translate-x-1/2 relative py-5">
        <div className="rounded-xl bg-base-100">
          <div className="flex items-center justify-between">
            <FooterLogo/>
            <FooterLinks/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;