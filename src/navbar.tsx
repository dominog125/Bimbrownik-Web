import { useState } from 'react';
import LogoutLink from './Components/Logout';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('jwtToken');

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <nav className="bg-black text-white flex items-center justify-between p-4 relative">
      {/* Logo */}
      <a className="bimbrownik-logo text-xl font-bold flex items-center !text-white" href="/">
        <img alt="" className="inline-block mr-2" />Bimbrownik
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4">
        <li>
          <a className="bimbrownik-buttons !text-white" href="/About">Przepisy</a>
        </li>
        <li>
          <a className="bimbrownik-buttons !text-white" href="/KacikKonesera">Kącik Konesera</a>
        </li>
        {token && (
          <li>
            <a className="bimbrownik-buttons !text-white" href="/favorites">Ulubione</a>
          </li>
        )}
        <li>
          {token ? (
            <LogoutLink >Wyloguj</LogoutLink>
          ) : (
            <a className="bimbrownik-buttons !text-white" href="/Login">Logowanie</a>
          )}
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden focus:outline-none text-white"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 z-50 w-full bg-black flex flex-col space-y-2 p-4 md:hidden">
          <li>
            <a className="bimbrownik-buttons block !text-white" href="/About">Przepisy</a>
          </li>
          <li>
            <a className="bimbrownik-buttons block !text-white" href="/KacikKonesera">Kącik Konesera</a>
          </li>
          {token && (
            <li>
              <a className="bimbrownik-buttons block !text-white" href="/favorites">Ulubione</a>
            </li>
          )}
          <li>
            {token ? (
              <LogoutLink >Wyloguj</LogoutLink>
            ) : (
              <a className="bimbrownik-buttons block !text-white" href="/Login">Logowanie</a>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
