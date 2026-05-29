import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 px-8 text-center border-t border-fantasy-border/10">
      <div className="max-w-[800px] mx-auto">
        {/* Logo */}
        <span className="font-fantasy text-gold-premium text-lg tracking-[3px]">
          ✦ OPIK
        </span>

        {/* Copyright */}
        <p className="font-fantasy text-text-muted/60 text-xs tracking-[1px] mt-4">
          &copy; 2026 OPIK PORTFOLIO. DKV Creative Collection.
        </p>

        {/* Decorative line */}
        <div className="w-10 h-[1px] bg-gold-premium/20 mx-auto mt-6" />

        {/* Credit */}
        <p className="text-text-muted/40 text-[10px] tracking-wider mt-4">
          Designed with passion &amp; imagination
        </p>
      </div>
    </footer>
  );
};

export default Footer;