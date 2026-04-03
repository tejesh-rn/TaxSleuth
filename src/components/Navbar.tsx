import React from 'react';
import { Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-magic-dark/80 backdrop-blur-md border-b border-magic-gold/20 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-magic-gold/10 p-2.5 rounded-full border border-magic-gold/30">
            <Sparkles className="w-6 h-6 text-magic-gold" />
          </div>
          <span className="font-magic font-bold text-2xl tracking-widest text-magic-gold" style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.5)' }}>
            Gringotts Guard
          </span>
        </div>
        
        <div className="hidden sm:block text-magic-parchment/60 font-text italic">
          "The safest place in the world for anything you want to keep safe."
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

